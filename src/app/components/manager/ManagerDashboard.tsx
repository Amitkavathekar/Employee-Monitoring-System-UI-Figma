import {
  Users, CheckCircle, XCircle, Wifi, TrendingUp, Clock, Camera, Video,
  ArrowUp, ArrowDown, Activity
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const weeklyAttendance = [
  { day: "Mon", present: 45, absent: 5, late: 3 },
  { day: "Tue", present: 48, absent: 2, late: 2 },
  { day: "Wed", present: 44, absent: 6, late: 3 },
  { day: "Thu", present: 46, absent: 4, late: 2 },
  { day: "Fri", present: 40, absent: 8, late: 4 },
];

const productivityTrend = [
  { month: "Jan", avg: 82 }, { month: "Feb", avg: 79 }, { month: "Mar", avg: 85 },
  { month: "Apr", avg: 83 }, { month: "May", avg: 89 }, { month: "Jun", avg: 91 },
];

const deptProductivity = [
  { dept: "Engineering", score: 91 }, { dept: "Design", score: 88 },
  { dept: "Marketing", score: 84 }, { dept: "Sales", score: 79 }, { dept: "HR", score: 86 },
];

const sessionData = [
  { time: "9am", sessions: 42 }, { time: "10am", sessions: 48 }, { time: "11am", sessions: 50 },
  { time: "12pm", sessions: 38 }, { time: "1pm", sessions: 45 }, { time: "2pm", sessions: 49 },
  { time: "3pm", sessions: 47 }, { time: "4pm", sessions: 42 }, { time: "5pm", sessions: 30 },
];

const topEmployees = [
  { name: "Sarah Johnson", dept: "Engineering", score: 97, initials: "SJ", status: "online" },
  { name: "Mike Chen", dept: "Design", score: 95, initials: "MC", status: "online" },
  { name: "Emma Wilson", dept: "Marketing", score: 93, initials: "EW", status: "online" },
  { name: "James Lee", dept: "Engineering", score: 92, initials: "JL", status: "break" },
  { name: "Priya Patel", dept: "Sales", score: 90, initials: "PP", status: "online" },
];

const pieColors = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const attendancePie = [
  { name: "Present", value: 46 },
  { name: "Absent", value: 4 },
  { name: "Late", value: 3 },
  { name: "Leave", value: 2 },
];

function MetricCard({ label, value, sub, icon: Icon, color, trend }: any) {
  return (
    <div className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1" style={{ color: trend >= 0 ? "#10b981" : "#ef4444", fontSize: "0.8rem" }}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: "4px" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.75rem", color, marginTop: "6px", fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

export function ManagerDashboard() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Employees" value="55" sub="3 new this month" icon={Users} color="#6366f1" trend={5} />
        <MetricCard label="Present Today" value="46" sub="83.6% attendance" icon={CheckCircle} color="#10b981" trend={2} />
        <MetricCard label="Online Now" value="38" sub="Live sessions" icon={Wifi} color="#06b6d4" trend={-1} />
        <MetricCard label="Avg Productivity" value="91%" sub="Team average" icon={TrendingUp} color="#f59e0b" trend={8} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Absent Today" value="4" sub="Down from 6 yesterday" icon={XCircle} color="#ef4444" trend={-33} />
        <MetricCard label="Avg Hours Today" value="7.2h" sub="Target: 8h" icon={Clock} color="#8b5cf6" />
        <MetricCard label="Screenshots Today" value="1,240" sub="Across 46 employees" icon={Camera} color="#06b6d4" />
        <MetricCard label="Active Recordings" value="12" sub="Currently recording" icon={Video} color="#ef4444" trend={0} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Weekly Attendance Analytics</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
              <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" name="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Today's Attendance</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={attendancePie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {attendancePie.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {attendancePie.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: pieColors[i] }} />
                  <span style={{ fontSize: "0.8rem" }}>{item.name}</span>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Productivity Trends (6 months)</h3>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={productivityTrend}>
              <defs>
                <linearGradient id="prodMgrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[70, 100]} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Area type="monotone" dataKey="avg" stroke="#6366f1" fill="url(#prodMgrGrad)" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Department Productivity</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={deptProductivity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {deptProductivity.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Employees */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontWeight: 600 }}>Top Performers Today</h3>
          <button style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500 }}>View All</button>
        </div>
        <div className="space-y-3">
          {topEmployees.map((emp, i) => (
            <div key={emp.name} className="flex items-center gap-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 700, color: "var(--muted-foreground)", fontSize: "0.875rem", width: "20px" }}>#{i + 1}</div>
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 700 }}>{emp.initials}</span>
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{emp.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{emp.dept}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse-dot"
                  style={{ background: emp.status === "online" ? "#10b981" : "#f59e0b" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{emp.status}</span>
              </div>
              <div style={{ fontWeight: 700, color: "#10b981", fontSize: "1rem" }}>{emp.score}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
