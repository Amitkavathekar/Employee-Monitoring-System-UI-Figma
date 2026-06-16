import { useState } from "react";
import {
  Clock, CheckCircle, TrendingUp, Activity, Calendar,
  Target, Zap, Coffee, Monitor, ArrowUp, ArrowDown, Play
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const weeklyProductivity = [
  { day: "Mon", score: 88, hours: 8.2 },
  { day: "Tue", score: 92, hours: 8.5 },
  { day: "Wed", score: 78, hours: 7.8 },
  { day: "Thu", score: 95, hours: 8.8 },
  { day: "Fri", score: 85, hours: 8.0 },
  { day: "Sat", score: 60, hours: 5.5 },
  { day: "Sun", score: 0, hours: 0 },
];

const monthlyData = [
  { week: "W1", score: 82 }, { week: "W2", score: 87 }, { week: "W3", score: 91 }, { week: "W4", score: 88 },
];

const attendanceTrend = [
  { month: "Jan", present: 22, absent: 1, late: 1 },
  { month: "Feb", present: 20, absent: 0, late: 0 },
  { month: "Mar", present: 23, absent: 1, late: 0 },
  { month: "Apr", present: 21, absent: 2, late: 1 },
  { month: "May", present: 22, absent: 0, late: 2 },
  { month: "Jun", present: 10, absent: 0, late: 0 },
];

const sessionTimeline = [
  { time: "9:00", activity: 100 }, { time: "10:00", activity: 95 }, { time: "11:00", activity: 85 },
  { time: "12:00", activity: 20 }, { time: "13:00", activity: 90 }, { time: "14:00", activity: 88 },
  { time: "15:00", activity: 92 }, { time: "16:00", activity: 78 }, { time: "17:00", activity: 65 },
];

const recentActivities = [
  { id: 1, action: "Checked In", time: "9:02 AM", icon: CheckCircle, color: "#10b981" },
  { id: 2, action: "Screenshot Captured", time: "9:30 AM", icon: Monitor, color: "#6366f1" },
  { id: 3, action: "Break Started", time: "12:00 PM", icon: Coffee, color: "#f59e0b" },
  { id: 4, action: "Break Ended", time: "12:30 PM", icon: Play, color: "#10b981" },
  { id: 5, action: "Recording Started", time: "2:00 PM", icon: Activity, color: "#ef4444" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  status: [0, 5, 6, 12, 13, 19, 20, 26, 27].includes(i) ? "off"
    : [2, 8].includes(i) ? "late"
    : i > 13 ? "future"
    : "present"
}));

function StatCard({ label, value, sub, icon: Icon, color, trend }: any) {
  return (
    <div className="rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "4px" }}>{label}</p>
        <p style={{ fontWeight: 700, fontSize: "1.4rem", lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "4px" }}>{sub}</p>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1" style={{ color: trend >= 0 ? "#10b981" : "#ef4444", fontSize: "0.8rem" }}>
          {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

export function EmployeeDashboard() {
  const [sessionActive, setSessionActive] = useState(true);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Live Session Banner */}
      {sessionActive && (
        <div className="rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse-dot" style={{ background: "#10b981" }} />
            <div>
              <span style={{ fontWeight: 600, color: "var(--primary)" }}>Active Session</span>
              <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}> · Started at 9:02 AM · Duration: 6h 23m</span>
            </div>
          </div>
          <button
            onClick={() => setSessionActive(false)}
            className="px-4 py-1.5 rounded-xl text-white transition-all hover:opacity-80"
            style={{ background: "var(--destructive)", fontSize: "0.8rem", fontWeight: 600 }}>
            End Session
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Hours" value="6h 23m" sub="Target: 8h 0m" icon={Clock} color="#6366f1" trend={5} />
        <StatCard label="Productivity Score" value="92%" sub="Above average" icon={TrendingUp} color="#10b981" trend={8} />
        <StatCard label="Active Time" value="5h 48m" sub="91% of session" icon={Activity} color="#06b6d4" trend={-2} />
        <StatCard label="Tasks Completed" value="12 / 15" sub="80% done" icon={Target} color="#f59e0b" trend={15} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontWeight: 600 }}>Weekly Productivity</h3>
            <span className="px-2 py-1 rounded-lg" style={{ background: "var(--muted)", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              This Week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyProductivity}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Area type="monotone" dataKey="score" stroke="#6366f1" fill="url(#prodGrad)" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Status */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>This Month</h3>
          <div className="space-y-3">
            {[
              { label: "Present", value: 10, total: 14, color: "#10b981" },
              { label: "Late", value: 2, total: 14, color: "#f59e0b" },
              { label: "Absent", value: 0, total: 14, color: "#ef4444" },
              { label: "Leaves", value: 2, total: 14, color: "#6366f1" },
            ].map(({ label, value, total, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: "0.8rem" }}>{label}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{value} days</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${(value / total) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.1)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#10b981" }}>95%</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Attendance Rate</div>
          </div>
        </div>
      </div>

      {/* Session Timeline + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Today's Session Timeline</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={sessionTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Bar dataKey="activity" radius={[4, 4, 0, 0]}>
                {sessionTimeline.map((entry, i) => (
                  <Cell key={i} fill={entry.activity > 80 ? "#6366f1" : entry.activity > 40 ? "#06b6d4" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mini Calendar */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontWeight: 600 }}>June 2026</h3>
            <div className="flex gap-3" style={{ fontSize: "0.7rem" }}>
              {[["#10b981", "Present"], ["#f59e0b", "Late"], ["#ef4444", "Absent"], ["var(--muted)", "Off"]].map(([color, label]) => (
                <div key={label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-center py-1" style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", fontWeight: 600 }}>{d}</div>
            ))}
            {calendarDays.map(({ day, status }) => (
              <div key={day} className="aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: status === "present" || status === "late" ? 600 : 400,
                  background: status === "present" ? "rgba(16,185,129,0.15)"
                    : status === "late" ? "rgba(245,158,11,0.15)"
                    : status === "off" ? "var(--muted)"
                    : "transparent",
                  color: status === "present" ? "#10b981"
                    : status === "late" ? "#f59e0b"
                    : status === "future" ? "var(--muted-foreground)"
                    : "var(--foreground)",
                  opacity: status === "future" ? 0.4 : 1,
                }}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map(({ id, action, time, icon: Icon, color }) => (
            <div key={id} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{action}</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
