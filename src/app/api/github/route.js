import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const query = `
query($username: String!) {
  user(login: $username) {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
      totalCount
      nodes {
        name
        stargazerCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
      contributionYears
    }
    pullRequests(first: 1) {
      totalCount
    }
    issues(first: 1) {
      totalCount
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
  }
}
`;

function calculateGrade(stats) {
  const score =
    stats.totalStars * 2 +
    stats.totalCommits * 0.5 +
    stats.totalPRs * 3 +
    stats.totalIssues * 1 +
    stats.contributedTo * 5;

  if (score >= 1000) return "A+";
  if (score >= 500) return "A";
  if (score >= 250) return "B+";
  if (score >= 100) return "B";
  if (score >= 50) return "B-";
  if (score >= 25) return "C+";
  if (score >= 10) return "C";
  return "C-";
}

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "GitHub credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 500 }
      );
    }

    const user = data.data.user;

    const totalStars = user.repositories.nodes.reduce(
      (acc, repo) => acc + repo.stargazerCount,
      0
    );

    const languageMap = {};
    user.repositories.nodes.forEach((repo) => {
      repo.languages.edges.forEach((edge) => {
        const name = edge.node.name;
        const color = edge.node.color || "#858585";
        if (!languageMap[name]) {
          languageMap[name] = { size: 0, color };
        }
        languageMap[name].size += edge.size;
      });
    });

    const totalSize = Object.values(languageMap).reduce(
      (acc, lang) => acc + lang.size,
      0
    );

    const languages = Object.entries(languageMap)
      .map(([name, data]) => ({
        name,
        color: data.color,
        percentage: ((data.size / totalSize) * 100).toFixed(2),
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
      .slice(0, 4);

    const contributionCalendar = user.contributionsCollection.contributionCalendar;
    const totalContributions = contributionCalendar.totalContributions;
    
    const weeks = contributionCalendar.weeks.slice(-52);
    const contributionData = weeks.map(week => ({
      days: week.contributionDays.map(day => ({
        count: day.contributionCount,
        date: day.date,
        weekday: day.weekday
      }))
    }));

    const stats = {
      totalStars,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalPRs: user.pullRequests.totalCount,
      totalIssues: user.issues.totalCount,
      contributedTo: user.repositoriesContributedTo.totalCount,
      languages,
      totalContributions,
      contributionData,
    };

    const grade = calculateGrade(stats);

    return NextResponse.json({
      ...stats,
      grade,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
