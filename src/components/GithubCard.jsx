"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Get color based on contribution count
const getContributionColor = (count) => {
  if (count === 0) return "#161b22";
  if (count <= 2) return "#0e4429";
  if (count <= 5) return "#006d32";
  if (count <= 8) return "#26a641";
  return "#39d353";
};

// Get month labels for the chart
const getMonthLabels = (weeks) => {
  const months = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  weeks.forEach((week, weekIndex) => {
    if (week.days && week.days.length > 0) {
      const date = new Date(week.days[0].date);
      const monthIndex = date.getMonth();

      // Add month label at the start of each month
      if (
        months.length === 0 ||
        months[months.length - 1].month !== monthIndex
      ) {
        months.push({
          month: monthIndex,
          name: monthNames[monthIndex],
          weekIndex,
        });
      }
    }
  });

  return months;
};

// CircularProgress component (inline)
const CircularProgress = ({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  color = "#a855f7",
  bgColor = "#374151",
  label,
  sublabel,
  showGrade = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showGrade ? (
          <span className="text-2xl font-bold text-white">{label}</span>
        ) : (
          <>
            <span className="text-xl font-bold text-cyan-400">{label}</span>
            {sublabel && (
              <span className="text-xs text-gray-400">{sublabel}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const GithubCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 min-h-[350px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">
          Loading GitHub stats...
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 min-h-[350px] flex items-center justify-center">
        <div className="text-red-400">Failed to load GitHub stats</div>
      </div>
    );
  }

  const statItems = [
    { icon: "📝", label: "Total Commits:", value: stats.totalCommits },
  ];

  const contributionData = stats.contributionData || [];
  const monthLabels = getMonthLabels(contributionData);

  return (
    <motion.div
      className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-purple-500/10 transition-all duration-500 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src="/github.png" alt="GitHub" className="w-8 h-8" />
          <h3 className="text-2xl font-bold text-purple-400">Github</h3>
        </div>
        <CircularProgress
          value={75}
          max={100}
          size={60}
          strokeWidth={6}
          color="#a855f7"
          label={stats.grade}
          showGrade
        />
      </div>

      {/* Total Commits Header */}
      <div className="flex items-center justify-between text-gray-300 mb-2">
        <div className="flex items-center gap-2">
          <span>📝</span>
          <span>Total Commits:</span>
        </div>
        <span className="font-bold text-white">{stats.totalCommits}</span>
      </div>

      {/* Total Contributions */}
      <div className="text-gray-400 mb-4 text-sm">
        {stats.totalContributions || 0} contributions in the last year
      </div>

      {/* Contribution Activity Chart */}
      <div className="mb-6">
        {/* Month Labels */}
        <div className="flex text-xs text-gray-500 mb-1 ml-6 overflow-hidden">
          {monthLabels
            .filter((_, i) => i % 2 === 0)
            .map((monthInfo, index) => (
              <span key={index} className="flex-1 text-center">
                {monthInfo.name}
              </span>
            ))}
        </div>

        {/* Activity Grid */}
        <div className="flex gap-px overflow-hidden">
          {/* Day Labels - hidden on mobile */}
          <div className="hidden sm:flex flex-col text-xs text-gray-500 mr-1 justify-around shrink-0 py-1">
            <span className="text-[10px]">Sun</span>
            <span className="text-[10px]">Mon</span>
            <span className="text-[10px]">Wed</span>
            <span className="text-[10px]">Fri</span>
            <span className="text-[10px]">Sat</span>
          </div>

          {/* Contribution Grid - responsive sizing */}
          <div className="flex gap-px flex-1 overflow-hidden">
            {contributionData.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col gap-px flex-1 min-w-0"
              >
                {week.days.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="aspect-square rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-gray-400"
                    style={{
                      backgroundColor: getContributionColor(day.count),
                    }}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-2 text-xs text-gray-500">
          <span>Less</span>
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#161b22" }}
          />
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#0e4429" }}
          />
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#006d32" }}
          />
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#26a641" }}
          />
          <div
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#39d353" }}
          />
          <span>More</span>
        </div>
      </div>

      {/* Language Bar */}
      {stats.languages && stats.languages.length > 0 && (
        <>
          <div className="h-2 rounded-full overflow-hidden flex mb-3">
            {stats.languages.map((lang, index) => (
              <div
                key={index}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full first:rounded-l-full last:rounded-r-full"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {stats.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-gray-400">
                  {lang.name} {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default GithubCard;
