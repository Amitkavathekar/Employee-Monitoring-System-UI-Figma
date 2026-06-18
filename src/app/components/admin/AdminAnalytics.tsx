import { useState } from "react";
import { Clock, Camera, CheckCircle, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const companyProductivityData = [
  { company: "Acme Corp", score: 84, active: 92 },
  { company: "TechGlobal Inc", score: 79, active: 88 },
  { company: "Innovate LLC", score: 88, active: 95 },
  { company: "Core Systems", score: 72, active: 81 },
];

const productivityTrendData = [
  { month: "Jan", avg: 75, top: 90, bottom: 50 },
  { month: "Feb", avg: 77, top: 91, bottom: 52 },
  { month: "Mar", avg: 76, top: 90, bottom: 51 },
  { month: "Apr", avg: 75, top: 88, bottom: 53 },
  { month: "May", avg: 79, top: 92, bottom: 56 },
  { month: "Jun", avg: 80, top: 93, bottom: 57 },
];

const appUsageData = [
  { name: "VS Code", value: 6.2, color: "#6366f1" },
  { name: "Chrome", value: 3.8, color: "#06b6d4" },
  { name: "Slack", value: 2.1, color: "#8b5cf6" },
  { name: "Figma", value: 1.9, color: "#ec4899" },
  { name: "Zoom", value: 1.4, color: "#10b981" },
  { name: "Others", value: 8.8, color: "#6b7280" },
];

export function AdminAnalytics() {
  const [period, setPeriod] = useState<"7D" | "1M" | "3M" | "6M" | "1Y">("6M");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Analytics</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Deep-dive workforce analytics and trends</p>
      </div>

      {/* Performance Overview Panel */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 style={{ fontWeight: 600, fontSize: "1.1rem" }}>Performance Overview</h3>
          <div className="flex gap-2">
            {(["7D", "1M", "3M", "6M", "1Y"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1 rounded-xl transition-all"
                style={{
                  background: period === p ? "var(--primary)" : "var(--muted)",
                  color: period === p ? "white" : "var(--muted-foreground)",
                  fontWeight: period === p ? 600 : 400,
                  fontSize: "0.75rem",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Avg Daily Hours", value: "8.2h", sub: "+0.3h vs last period", icon: Clock, color: "#6366f1", change: "up", isGood: true },
            { label: "Screenshots/Day", value: "5,102", sub: "+8% vs last period", icon: Camera, color: "#06b6d4", change: "up", isGood: true },
            { label: "Idle Rate", value: "12.4%", sub: "-1.2% vs last period", icon: TrendingUp, color: "#10b981", change: "down", isGood: true },
            { label: "Compliance Score", value: "94.2%", sub: "+1.4% vs last period", icon: CheckCircle, color: "#f59e0b", change: "up", isGood: true },
          ].map((metric, i) => {
            const ArrowIcon = metric.change === "up" ? ArrowUp : ArrowDown;
            const trendColor = metric.isGood ? "#10b981" : "#ef4444";
            return (
              <div key={i} className="p-4 rounded-xl flex flex-col justify-between" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{metric.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${metric.color}15` }}>
                    <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--foreground)", lineHeight: 1 }}>{metric.value}</div>
                <div className="flex items-center gap-1 mt-2 text-[0.7rem] font-medium" style={{ color: trendColor }}>
                  <ArrowIcon className="w-3 h-3" />
                  <span>{metric.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Trend Card (2/3 width) */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h3 style={{ fontWeight: 600 }}>Productivity Trend</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Average, top, and bottom performer comparison</p>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={productivityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[30, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
                <Line type="monotone" dataKey="top" stroke="#10b981" name="Top Performer" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="avg" stroke="#6366f1" name="Average" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="bottom" stroke="#ef4444" name="Bottom Performer" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Applications Card (1/3 width) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h3 style={{ fontWeight: 600 }}>Top Applications</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Avg daily hours per app</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={appUsageData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {appUsageData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-4 w-full px-2 max-h-[120px] overflow-y-auto pr-1">
              {appUsageData.map((app, i) => (
                <div key={app.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: app.color }} />
                    <span style={{ color: "var(--foreground)" }}>{app.name}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: "var(--muted-foreground)" }}>{app.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Productivity Breakdown */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h3 style={{ fontWeight: 600 }}>Company Productivity Breakdown</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Comparison of average productivity and active hour scores across client companies</p>
          </div>
          <div className="min-h-[220px]">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={companyProductivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="company" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
                <Bar dataKey="score" name="Avg Productivity %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" name="Active Hours %" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
