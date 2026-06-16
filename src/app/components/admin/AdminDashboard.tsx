import { useState } from "react";
import {
  Users, CheckCircle, XCircle, Wifi, TrendingUp, Clock, Bell,
  Activity, Shield, Building, Award
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

const deptProductivity = [
  { dept: "Engineering", score: 91 }, { dept: "Design", score: 88 },
  { dept: "Marketing", score: 84 }, { dept: "Sales", score: 79 }, { dept: "HR", score: 86 },
];

const attendancePie = [
  { name: "Present", value: 46 },
  { name: "Absent", value: 4 },
  { name: "Late", value: 3 },
  { name: "Leave", value: 2 },
];

const pieColors = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const adminNotifs = [
  { id: 1, title: "System Update Complete", message: "Employee Monitoring System updated to v2.4.1. Security patches applied.", time: "10m ago", read: false, color: "#6366f1" },
  { id: 2, title: "Database Backup Success", message: "Automated daily database backup finished successfully.", time: "1h ago", read: false, color: "#10b981" },
  { id: 3, title: "New Department Created", message: "Customer Support department added by Super Admin.", time: "4h ago", read: true, color: "#06b6d4" },
  { id: 4, title: "High Latency Warning", message: "Server API gateway experienced minor latency spike.", time: "Yesterday", read: true, color: "#ef4444" },
];

function MetricCard({ label, value, sub, icon: Icon, color }: any) {
  return (
    <div className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      {typeof value === "string" && value.length > 15 ? (
        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", wordBreak: "break-all" }}>{value}</div>
      ) : (
        <div style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
      )}
      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: "4px" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "6px" }}>{sub}</div>}
    </div>
  );
}

export function AdminDashboard() {
  const [notifs, setNotifs] = useState(adminNotifs);
  const unreadCount = notifs.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* 6 Admin Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Total Employees" value="55" sub="Active contracts" icon={Users} color="#6366f1" />
        <MetricCard label="Active Now" value="38" sub="Live on devices" icon={Wifi} color="#10b981" />
        <MetricCard label="Total Departments" value="5" sub="Enterprise total" icon={Building} color="#8b5cf6" />
        <MetricCard label="Present Employees" value="46" sub="Attendance today" icon={CheckCircle} color="#10b981" />
        <MetricCard label="Absent Employees" value="4" sub="Absences today" icon={XCircle} color="#ef4444" />
        <MetricCard label="Late Employees" value="3" sub="Late arrivals" icon={Clock} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance */}
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

        {/* Today's Attendance Pie */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Today's Attendance</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={attendancePie} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                {attendancePie.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {attendancePie.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: pieColors[i] }} />
                  <span style={{ fontSize: "0.75rem" }}>{item.name}</span>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications Section */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 style={{ fontWeight: 600 }}>Admin System Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-white text-[0.65rem] font-bold" style={{ background: "var(--primary)" }}>
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <button onClick={handleMarkAllRead} style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600 }} className="hover:underline">
              Mark all read
            </button>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {notifs.map((n) => (
              <div key={n.id} className="flex gap-3 p-3 rounded-xl transition-all"
                style={{ background: n.read ? "var(--muted)" : `${n.color}10`, border: `1px solid ${n.read ? "var(--border)" : n.color + "25"}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}20` }}>
                  <Bell className="w-4 h-4" style={{ color: n.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span style={{ fontWeight: n.read ? 500 : 700, fontSize: "0.8rem", color: "var(--foreground)" }} className="truncate">{n.title}</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "2px", lineHeight: 1.4 }}>{n.message}</p>
                </div>
                {!n.read && <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: n.color }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
