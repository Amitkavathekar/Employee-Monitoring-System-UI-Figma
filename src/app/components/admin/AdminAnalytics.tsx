import { useState } from "react";
import {
  CheckCircle, TrendingUp, ArrowUp, ArrowDown, Laptop, Globe, BarChart3, PieChartIcon, Activity
} from "lucide-react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// 1. Weekly Productivity Trend Data
const weeklyProductivityData = [
  { day: "Mon", score: 82 },
  { day: "Tue", score: 85 },
  { day: "Wed", score: 88 },
  { day: "Thu", score: 84 },
  { day: "Fri", score: 80 },
];

// 2. Monthly Work Hours Data
const monthlyWorkHoursData = [
  { month: "Jan", hours: 162 },
  { month: "Feb", hours: 158 },
  { month: "Mar", hours: 176 },
  { month: "Apr", hours: 168 },
  { month: "May", hours: 182 },
  { month: "Jun", hours: 174 },
];

// 3. Attendance Distribution Data
const attendanceDistributionData = [
  { name: "On-Time", value: 85, color: "#10b981" },
  { name: "Late Login", value: 8, color: "#f59e0b" },
  { name: "Excused", value: 5, color: "#3b82f6" },
  { name: "Absent", value: 2, color: "#ef4444" },
];

// 4. App Usage Data
const appUsageData = [
  { name: "VS Code", value: 35, color: "#6366f1" },
  { name: "Chrome", value: 25, color: "#06b6d4" },
  { name: "Slack", value: 15, color: "#8b5cf6" },
  { name: "Figma", value: 12, color: "#ec4899" },
  { name: "Zoom", value: 8, color: "#10b981" },
  { name: "Others", value: 5, color: "#6b7280" },
];

// 5. Website Category Analysis Data
const websiteCategoryData = [
  { category: "Dev Tools", hours: 45, color: "#6366f1" },
  { category: "Collab", hours: 25, color: "#3b82f6" },
  { category: "Search", hours: 15, color: "#06b6d4" },
  { category: "Social Media", hours: 5, color: "#ef4444" },
  { category: "Streaming", hours: 3, color: "#f59e0b" },
];

export function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Detailed modal or info state for selected analytics category card
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // 4 Analytics Categories
  const analyticsCategories = [
    { id: "productivity", title: "Productivity Trends", value: "83.8%", sub: "+2.4% vs last week", icon: TrendingUp, color: "#6366f1", detail: "Overall productivity scores remain stable with Engineering leading at 88%. Mid-week sessions show the highest focus scores." },
    { id: "applications", title: "Most Used Applications", value: "VS Code", sub: "35% of total time", icon: Laptop, color: "#a855f7", detail: "Software development suites represent 60% of all process runtime. IDE usage peaked on Wednesday afternoons." },
    { id: "websites", title: "Most Visited Websites", value: "GitHub", sub: "45 hrs logged", icon: Globe, color: "#06b6d4", detail: "Top domains: github.com, stackoverflow.com, and internal wiki. Restricted website blocks triggered 12 times this week." },
    { id: "departments", title: "Department Performance", value: "Eng (88%)", sub: "Highest department score", icon: BarChart3, color: "#ec4899", detail: "Engineering: 88%, Sales: 82%, Marketing: 79%, Customer Success: 81%. Department targets achieved across all sectors." },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground animate-fade-in" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Workforce Analytics</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Detailed reports, performance logs, and graphical summaries</p>
      </div>

      {/* 8 Analytics Categories Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsCategories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCard === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCard(isSelected ? null : cat.id)}
              className="p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] relative select-none"
              style={{
                background: isSelected ? "var(--muted)" : "var(--card)",
                border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                boxShadow: isSelected ? "0 4px 20px -3px rgba(99, 102, 241, 0.2)" : "none",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600 }}>{cat.title}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: cat.color }} />
                </div>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--foreground)", lineHeight: 1 }}>{cat.value}</div>
              <div className="flex items-center gap-1 mt-2 text-[0.7rem] font-medium" style={{ color: cat.color }}>
                <span>{cat.sub}</span>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t text-[0.75rem] leading-relaxed text-muted-foreground animate-slide-down" style={{ borderColor: "var(--border)" }}>
                  {cat.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dashboard Charts Section Header */}
      <div className="pt-2">
        <h3 className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: "1.1rem" }}>
          <PieChartIcon className="w-5 h-5 text-indigo-500" />
          Interactive Dashboard Charts
        </h3>
        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Real-time visualizations of workplace productivity, time allocation, and compliance</p>
      </div>

      {/* Dashboard Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Productivity Trend (Line Chart) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h4 style={{ fontWeight: 600, fontSize: "0.95rem" }}>Weekly Productivity Trend</h4>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Average productivity score (%) per working day</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyProductivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }} />
                <Line type="monotone" dataKey="score" stroke="#6366f1" name="Productivity %" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Work Hours (Bar Chart) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h4 style={{ fontWeight: 600, fontSize: "0.95rem" }}>Monthly Work Hours</h4>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Total tracked active and compliance hours per month</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyWorkHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }} />
                <Bar dataKey="hours" name="Work Hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Distribution (Pie Chart) & App Usage Pie Chart (Side-by-side or stacked grid) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h4 style={{ fontWeight: 600, fontSize: "0.95rem" }}>Attendance Distribution</h4>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Employee attendance record classification</p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-4 min-h-[220px]">
            <div className="w-full sm:w-1/2 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceDistributionData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                    {attendanceDistributionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 w-full sm:w-1/2 px-2">
              {attendanceDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span style={{ color: "var(--foreground)" }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--muted-foreground)" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Usage Pie Chart */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h4 style={{ fontWeight: 600, fontSize: "0.95rem" }}>App Usage Pie Chart</h4>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Software & IDE utilization percentage</p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-4 min-h-[220px]">
            <div className="w-full sm:w-1/2 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={appUsageData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                    {appUsageData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 w-full sm:w-1/2 px-2 max-h-[160px] overflow-y-auto pr-1">
              {appUsageData.map((app) => (
                <div key={app.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: app.color }} />
                    <span style={{ color: "var(--foreground)" }}>{app.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--muted-foreground)" }}>{app.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Website Category Analysis (Horizontal Bar Chart) */}
        <div className="rounded-2xl p-5 flex flex-col lg:col-span-2" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-4">
            <h4 style={{ fontWeight: 600, fontSize: "0.95rem" }}>Website Category Analysis</h4>
            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Total tracked active hours across website category classes</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="yaml" data={websiteCategoryData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.75rem" }} />
                <Bar dataKey="hours" name="Active Hours" fill="#06b6d4" radius={[0, 4, 4, 0]}>
                  {websiteCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
