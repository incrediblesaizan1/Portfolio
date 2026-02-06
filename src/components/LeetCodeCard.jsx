"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
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

const LeetCodeCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/leetcode");
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
          Loading LeetCode stats...
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 min-h-[350px] flex items-center justify-center">
        <div className="text-red-400">Failed to load LeetCode stats</div>
      </div>
    );
  }

  const DifficultyBar = ({ label, solved, total, beat, color }) => {
    const percentage = (solved / total) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-300 font-medium">{label}</span>
          <span className="text-gray-400">
            {solved}/{total} Beats: {beat}%
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-cyan-500/10 transition-all duration-500 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <img src="/leetcode.png" alt="leetcode" className="w-8 h-8" />
        <h3 className="text-2xl font-bold text-cyan-400">LeetCode</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <CircularProgress
          value={stats.totalSolved}
          max={3000}
          size={80}
          strokeWidth={8}
          color="#06b6d4"
          label={stats.totalSolved}
          sublabel="Solved"
        />
        <div className="w-full sm:flex-1 grid grid-cols-3 gap-1 sm:gap-2">
          <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center border border-gray-700">
            <div className="text-sm sm:text-lg font-bold text-white truncate">
              {stats.ranking.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400">Rank</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center border border-gray-700">
            <div className="text-sm sm:text-lg font-bold text-white">
              {stats.badges}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400">Badges</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center border border-gray-700">
            <div className="text-sm sm:text-lg font-bold text-white">
              {stats.reputation}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400">
              Reputation
            </div>
          </div>
        </div>
      </div>

      <DifficultyBar
        label="Easy"
        solved={stats.easy.solved}
        total={stats.easy.total}
        beat={stats.easy.beat}
        color="#22c55e"
      />
      <DifficultyBar
        label="Medium"
        solved={stats.medium.solved}
        total={stats.medium.total}
        beat={stats.medium.beat}
        color="#eab308"
      />
      <DifficultyBar
        label="Hard"
        solved={stats.hard.solved}
        total={stats.hard.total}
        beat={stats.hard.beat}
        color="#ef4444"
      />
    </motion.div>
  );
};

export default LeetCodeCard;
