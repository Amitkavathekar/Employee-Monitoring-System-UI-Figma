import { useState } from "react";
import {
  Users, Search, Plus, Edit2, Trash2, MoreVertical, CheckCircle,
  XCircle, AlertCircle, Wifi, WifiOff, Clock, Download, Filter,
  Camera, Video, TrendingUp, FileText, Bell, Settings, Shield,
  Activity, Coffee, Eye, Play, Square, ChevronLeft, ChevronRight,
  Award, BarChart2, Building, Calendar, Mail, Phone, User
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Employee Management ──────────────────────────────────────────────────────

const employees = [
  { id: 1, name: "Sarah Johnson", email: "sarah@company.com", dept: "Engineering", role: "Senior Dev", status: "online", productivity: 97, checkIn: "09:00", initials: "SJ" },
  { id: 2, name: "Mike Chen", email: "mike@company.com", dept: "Design", role: "UI Designer", status: "online", productivity: 95, checkIn: "09:10", initials: "MC" },
  { id: 3, name: "Emma Wilson", email: "emma@company.com", dept: "Marketing", role: "Marketer", status: "break", productivity: 93, checkIn: "09:05", initials: "EW" },
  { id: 4, name: "James Lee", email: "james@company.com", dept: "Engineering", role: "Junior Dev", status: "online", productivity: 92, checkIn: "09:30", initials: "JL" },
  { id: 5, name: "Priya Patel", email: "priya@company.com", dept: "Sales", role: "Account Exec", status: "offline", productivity: 90, checkIn: "--", initials: "PP" },
  { id: 6, name: "David Kim", email: "david@company.com", dept: "HR", role: "HR Manager", status: "online", productivity: 88, checkIn: "08:55", initials: "DK" },
  { id: 7, name: "Lisa Torres", email: "lisa@company.com", dept: "Design", role: "Product Designer", status: "online", productivity: 86, checkIn: "09:15", initials: "LT" },
  { id: 8, name: "Ryan Park", email: "ryan@company.com", dept: "Engineering", role: "Backend Dev", status: "online", productivity: 85, checkIn: "09:20", initials: "RP" },
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function EmployeeManagement() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = employees.filter(e =>
    (deptFilter === "all" || e.dept === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: "55", color: "#6366f1" },
          { label: "Active Today", value: "46", color: "#10b981" },
          { label: "On Break", value: "3", color: "#f59e0b" },
          { label: "Inactive", value: "6", color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Employee Directory</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..."
                className="pl-9 pr-4 py-2 rounded-xl outline-none"
                style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem", width: "180px" }} />
            </div>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="py-2 px-3 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Employee", "Department", "Role", "Check-In", "Status", "Productivity", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => {
                const sc = statusColors[emp.status];
                return (
                  <tr key={emp.id} className="hover:opacity-80 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{emp.initials}</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{emp.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{emp.dept}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{emp.role}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{emp.checkIn}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg capitalize"
                        style={{ background: sc.bg, color: sc.color, fontSize: "0.75rem", fontWeight: 600 }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--muted)" }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${emp.productivity}%`, background: emp.productivity > 90 ? "#10b981" : emp.productivity > 75 ? "#f59e0b" : "#ef4444" }} />
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{emp.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Showing {filtered.length} of 55 employees</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg"
                style={{ background: p === page ? "var(--primary)" : "var(--muted)", color: p === page ? "white" : "var(--foreground)", fontSize: "0.875rem", fontWeight: p === page ? 600 : 400 }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(3, page + 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}>
          <div className="rounded-2xl w-full max-w-md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontWeight: 700 }}>Add New Employee</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--muted)" }}>✕</button>
            </div>
            <div className="p-5 space-y-4">
              {["Full Name", "Email Address", "Phone Number", "Department", "Designation"].map(label => (
                <div key={label}>
                  <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</label>
                  {label === "Department" ? (
                    <select className="w-full px-4 py-2.5 rounded-xl outline-none"
                      style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                      <option>Engineering</option><option>Design</option><option>Marketing</option><option>Sales</option><option>HR</option>
                    </select>
                  ) : (
                    <input className="w-full px-4 py-2.5 rounded-xl outline-none"
                      style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl"
                style={{ background: "var(--muted)", fontSize: "0.875rem", fontWeight: 500 }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-white gradient-primary"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}>Add Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Live Monitoring ──────────────────────────────────────────────────────────

const liveEmployees = [
  { id: 1, name: "Sarah Johnson", dept: "Engineering", status: "active", session: "2h 45m", activity: 94, screenshots: 12, initials: "SJ" },
  { id: 2, name: "Mike Chen", dept: "Design", status: "active", session: "3h 10m", activity: 88, screenshots: 15, initials: "MC" },
  { id: 3, name: "Emma Wilson", dept: "Marketing", status: "break", session: "2h 05m", activity: 72, screenshots: 10, initials: "EW" },
  { id: 4, name: "James Lee", dept: "Engineering", status: "idle", session: "1h 30m", activity: 45, screenshots: 7, initials: "JL" },
  { id: 5, name: "David Kim", dept: "HR", status: "active", session: "3h 55m", activity: 91, screenshots: 18, initials: "DK" },
  { id: 6, name: "Lisa Torres", dept: "Design", status: "active", session: "1h 15m", activity: 87, screenshots: 6, initials: "LT" },
];

export function LiveMonitoring() {
  const activeCount = liveEmployees.filter(e => e.status === "active").length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Live Banner */}
      <div className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="w-3 h-3 rounded-full animate-pulse-dot" style={{ background: "#ef4444" }} />
        <span style={{ fontWeight: 600, color: "#ef4444" }}>LIVE</span>
        <span style={{ color: "var(--foreground)" }}>·</span>
        <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>Real-time monitoring · Auto-updating every 30s</span>
        <span className="ml-auto" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Last updated: just now</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Online Now", value: activeCount.toString(), color: "#10b981" },
          { label: "On Break", value: "3", color: "#f59e0b" },
          { label: "Idle (>10m)", value: "2", color: "#ef4444" },
          { label: "Checked Out", value: "9", color: "#6b7280" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: color }} />
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Live Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveEmployees.map((emp) => {
          const statusConfig = {
            active: { color: "#10b981", label: "Active", icon: CheckCircle },
            break: { color: "#f59e0b", label: "On Break", icon: Coffee },
            idle: { color: "#ef4444", label: "Idle", icon: AlertCircle },
          }[emp.status] || { color: "#6b7280", label: "Offline", icon: WifiOff };
          const StatusIcon = statusConfig.icon;

          return (
            <div key={emp.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
              style={{ background: "var(--card)", border: `1px solid ${emp.status === "idle" ? "rgba(239,68,68,0.3)" : "var(--border)"}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center relative">
                    <span className="text-white" style={{ fontSize: "0.75rem", fontWeight: 700 }}>{emp.initials}</span>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                      style={{ background: statusConfig.color, borderColor: "var(--card)" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{emp.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{emp.dept}</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: `${statusConfig.color}20`, color: statusConfig.color, fontSize: "0.7rem", fontWeight: 600 }}>
                  <StatusIcon className="w-3 h-3" /> {statusConfig.label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)" }}>{emp.session}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>Session</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981" }}>{emp.activity}%</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>Activity</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#06b6d4" }}>{emp.screenshots}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>SS</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Activity Level</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{emp.activity}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${emp.activity}%`, background: statusConfig.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Feed */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Live Activity Feed</h3>
        <div className="space-y-3">
          {[
            { emp: "Sarah Johnson", action: "Screenshot captured", time: "Just now", color: "#6366f1" },
            { emp: "Mike Chen", action: "Started session", time: "2m ago", color: "#10b981" },
            { emp: "Emma Wilson", action: "Started break", time: "5m ago", color: "#f59e0b" },
            { emp: "David Kim", action: "Screenshot captured", time: "8m ago", color: "#6366f1" },
            { emp: "James Lee", action: "Idle for 12 minutes", time: "12m ago", color: "#ef4444" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.emp}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", flex: 1 }}>{item.action}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Attendance Management ────────────────────────────────────────────────────

const attendanceRecords = [
  { emp: "Sarah Johnson", dept: "Engineering", date: "Jun 13", checkIn: "09:00", checkOut: "18:10", hours: "9h 10m", status: "present" },
  { emp: "Mike Chen", dept: "Design", date: "Jun 13", checkIn: "09:10", checkOut: "--", hours: "--", status: "present" },
  { emp: "Emma Wilson", dept: "Marketing", date: "Jun 13", checkIn: "09:32", checkOut: "--", hours: "--", status: "late" },
  { emp: "James Lee", dept: "Engineering", date: "Jun 13", checkIn: "--", checkOut: "--", hours: "--", status: "absent" },
  { emp: "Priya Patel", dept: "Sales", date: "Jun 13", checkIn: "09:00", checkOut: "13:00", hours: "4h 0m", status: "half-day" },
  { emp: "David Kim", dept: "HR", date: "Jun 13", checkIn: "--", checkOut: "--", hours: "--", status: "holiday" },
];

const statusColors2: Record<string, { color: string; bg: string }> = {
  present: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  absent: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  late: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "half-day": { color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  holiday: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  leave: { color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
};

const monthlyAttendance = [
  { month: "Jan", rate: 94 }, { month: "Feb", rate: 91 }, { month: "Mar", rate: 96 },
  { month: "Apr", rate: 92 }, { month: "May", rate: 95 }, { month: "Jun", rate: 89 },
];

export function AttendanceManagement() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Present", value: "46", color: "#10b981" },
          { label: "Absent", value: "4", color: "#ef4444" },
          { label: "Late", value: "3", color: "#f59e0b" },
          { label: "Attendance Rate", value: "91%", color: "#6366f1" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Monthly Attendance Rate</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={monthlyAttendance}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[80, 100]} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} formatter={(v: any) => [`${v}%`, "Rate"]} />
            <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5 flex items-center justify-between flex-wrap gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Attendance Records — Jun 13, 2026</h3>
          <div className="flex gap-3">
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="py-2 px-3 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
              <option value="all">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-white"
              style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Employee", "Department", "Date", "Check In", "Check Out", "Hours", "Status", "Action"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.filter(r => filter === "all" || r.status === filter).map((row, i) => {
                const sc = statusColors2[row.status] || { color: "#6b7280", bg: "rgba(0,0,0,0.05)" };
                return (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-5 py-3.5" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{row.emp}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.dept}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.date}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.checkIn}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.checkOut}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{row.hours}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-1 rounded-lg capitalize"
                        style={{ background: sc.bg, color: sc.color, fontSize: "0.75rem", fontWeight: 600 }}>
                        {row.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="px-2.5 py-1 rounded-lg text-white"
                        style={{ background: "var(--primary)", fontSize: "0.7rem", fontWeight: 500 }}>Approve</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Productivity Monitoring ──────────────────────────────────────────────────

const empProdData = [
  { name: "Sarah J.", score: 97, tasks: 25, hours: 9.2 },
  { name: "Mike C.", score: 95, tasks: 22, hours: 8.8 },
  { name: "Emma W.", score: 93, tasks: 20, hours: 8.5 },
  { name: "James L.", score: 92, tasks: 19, hours: 8.2 },
  { name: "Priya P.", score: 90, tasks: 18, hours: 8.0 },
  { name: "David K.", score: 88, tasks: 17, hours: 7.8 },
  { name: "Lisa T.", score: 85, tasks: 16, hours: 7.5 },
];

export function ProductivityMonitoring() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex gap-2 mb-4">
        {(["daily", "weekly", "monthly"] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className="px-4 py-2 rounded-xl capitalize transition-all"
            style={{ background: period === p ? "var(--primary)" : "var(--muted)", color: period === p ? "white" : "var(--muted-foreground)", fontWeight: period === p ? 600 : 400, fontSize: "0.875rem" }}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Team Average", value: "91%", color: "#6366f1" },
          { label: "Top Performer", value: "97%", color: "#10b981" },
          { label: "Below Average", value: "8", color: "#ef4444" },
          { label: "Tasks Completed", value: "342", color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Employee Productivity Score</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={empProdData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={65} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {empProdData.map((e, i) => <Cell key={i} fill={e.score >= 95 ? "#10b981" : e.score >= 90 ? "#6366f1" : "#f59e0b"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Performance Summary</h3>
          <div className="space-y-3">
            {empProdData.map(({ name, score, tasks }) => (
              <div key={name} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white" style={{ fontSize: "0.6rem", fontWeight: 700 }}>{name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: score >= 95 ? "#10b981" : "var(--primary)" }}>{score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${score}%`, background: score >= 95 ? "#10b981" : "var(--primary)" }} />
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{tasks}t</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screenshot Monitoring ────────────────────────────────────────────────────

const mgrScreenshots = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  employee: employees[i % employees.length]?.name || "Unknown",
  time: `${Math.floor(9 + i * 0.5)}:${i % 2 === 0 ? "00" : "30"} AM`,
  activity: Math.floor(65 + Math.random() * 35),
}));

export function ScreenshotMonitoring() {
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Total", value: "1,248", color: "#6366f1" },
          { label: "Active Employees", value: "46", color: "#10b981" },
          { label: "Avg per Employee", value: "27", color: "#06b6d4" },
          { label: "Storage Used", value: "4.2 GB", color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h3 style={{ fontWeight: 600 }}>Recent Screenshots</h3>
        <div className="flex gap-3">
          <select className="py-2 px-3 rounded-xl outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
            <option>All Employees</option>
          </select>
          <select className="py-2 px-3 rounded-xl outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
            <option>Today</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mgrScreenshots.map((ss) => (
          <div key={ss.id} className="rounded-xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
            style={{ border: "1px solid var(--border)" }}
            onClick={() => setPreview(ss.id)}>
            <div className="h-28 relative flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, hsl(${ss.id * 25}, 40%, 25%) 0%, hsl(${ss.id * 40}, 50%, 18%) 100%)` }}>
              <Camera style={{ width: 32, height: 32, color: "rgba(255,255,255,0.25)" }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.4)" }}>
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-white"
                style={{ background: "rgba(0,0,0,0.6)", fontSize: "0.6rem" }}>
                {ss.employee.split(" ")[0]}
              </div>
            </div>
            <div className="px-3 py-2" style={{ background: "var(--card)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>{ss.time}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{ss.activity}% active</div>
            </div>
          </div>
        ))}
      </div>

      {preview !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setPreview(null)}>
          <div className="rounded-2xl overflow-hidden max-w-2xl w-full" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="h-80 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, hsl(${preview * 25}, 40%, 25%) 0%, hsl(${preview * 40}, 50%, 18%) 100%)` }}>
              <Camera style={{ width: 80, height: 80, color: "rgba(255,255,255,0.2)" }} />
            </div>
            <div className="p-5 flex justify-between items-center">
              <div>
                <div style={{ fontWeight: 600 }}>Screenshot #{preview}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{mgrScreenshots[preview - 1]?.employee} · {mgrScreenshots[preview - 1]?.time}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}><Download className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setPreview(null)} className="p-2 rounded-xl" style={{ background: "var(--muted)" }}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Recording Monitoring ─────────────────────────────────────────────────────

const mgrRecordings = [
  { id: 1, employee: "Sarah Johnson", date: "Jun 13", duration: "2h 15m", size: "368 MB", status: "completed" },
  { id: 2, employee: "Mike Chen", date: "Jun 13", duration: "1h 45m", size: "289 MB", status: "completed" },
  { id: 3, employee: "Emma Wilson", date: "Jun 13", duration: "3h 0m", size: "498 MB", status: "active" },
  { id: 4, employee: "David Kim", date: "Jun 13", duration: "0h 45m", size: "121 MB", status: "active" },
  { id: 5, employee: "Lisa Torres", date: "Jun 12", duration: "4h 30m", size: "740 MB", status: "completed" },
];

export function RecordingMonitoring() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Recordings", value: "12", color: "#ef4444" },
          { label: "Today's Total", value: "48", color: "#6366f1" },
          { label: "Total Duration", value: "156h", color: "#06b6d4" },
          { label: "Storage Used", value: "82 GB", color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              {label === "Active Recordings" && <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: color }} />}
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</span>
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Recording List</h3>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {mgrRecordings.map((rec) => (
            <div key={rec.id} className="p-5 flex items-center gap-4">
              <div className="w-16 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                style={{ background: `hsl(${rec.id * 50}, 50%, 25%)` }}>
                <Video className="w-5 h-5 text-white" />
                {rec.status === "active" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse-dot" style={{ background: "#ef4444", border: "2px solid var(--card)" }} />
                )}
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{rec.employee}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{rec.date} · {rec.size}</div>
              </div>
              <span className="px-2 py-1 rounded-lg"
                style={{ fontSize: "0.75rem", fontWeight: 600, background: rec.status === "active" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: rec.status === "active" ? "#ef4444" : "#10b981" }}>
                {rec.status === "active" ? "● LIVE" : "Completed"}
              </span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)" }}>{rec.duration}</span>
              <div className="flex gap-2">
                <button onClick={() => setPlaying(playing === rec.id ? null : rec.id)}
                  className="p-2 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                  {playing === rec.id ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export function Reports() {
  const [period, setPeriod] = useState("monthly");
  const [type, setType] = useState("attendance");

  const reportData = [
    { month: "Jan", attendance: 94, productivity: 82, screenshots: 3200, recordings: 124 },
    { month: "Feb", attendance: 91, productivity: 79, screenshots: 3050, recordings: 118 },
    { month: "Mar", attendance: 96, productivity: 85, screenshots: 3500, recordings: 132 },
    { month: "Apr", attendance: 92, productivity: 83, screenshots: 3300, recordings: 128 },
    { month: "May", attendance: 95, productivity: 89, screenshots: 3800, recordings: 145 },
    { month: "Jun", attendance: 89, productivity: 91, screenshots: 1800, recordings: 68 },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {["attendance", "productivity", "screenshots", "recordings"].map(t => (
            <button key={t} onClick={() => setType(t)}
              className="px-4 py-2 capitalize transition-all"
              style={{ background: type === t ? "var(--primary)" : "var(--card)", color: type === t ? "white" : "var(--foreground)", fontWeight: type === t ? 600 : 400, fontSize: "0.8rem" }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {["daily", "weekly", "monthly"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3 py-2 capitalize transition-all"
              style={{ background: period === p ? "var(--muted)" : "var(--card)", color: period === p ? "var(--foreground)" : "var(--muted-foreground)", fontSize: "0.8rem" }}>
              {p}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white ml-auto"
          style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: "var(--muted)", fontSize: "0.8rem", fontWeight: 500 }}>
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem", textTransform: "capitalize" }}>{type} Report — Monthly View</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={reportData}>
            <defs>
              <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            <Area type="monotone" dataKey={type} stroke="#6366f1" fill="url(#reportGrad)" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Attendance Report", desc: "Daily/Monthly attendance records", icon: CheckCircle, color: "#10b981" },
          { title: "Productivity Report", desc: "Team & individual performance", icon: TrendingUp, color: "#6366f1" },
          { title: "Screenshot Report", desc: "All captured screenshots", icon: Camera, color: "#06b6d4" },
          { title: "Recording Report", desc: "Screen recording analytics", icon: Video, color: "#f59e0b" },
        ].map(({ title, desc, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9rem" }}>{title}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{desc}</div>
            <button className="mt-3 flex items-center gap-1 text-white px-3 py-1.5 rounded-lg"
              style={{ background: color, fontSize: "0.75rem", fontWeight: 500 }}>
              <Download className="w-3 h-3" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications Center ─────────────────────────────────────────────────────

const mgrNotifs = [
  { id: 1, title: "John Doe Checked In", message: "John Doe checked in at 9:02 AM — 2 minutes late", time: "2m ago", type: "late", read: false },
  { id: 2, title: "Recording Started", message: "Emma Wilson started a screen recording session", time: "5m ago", type: "recording", read: false },
  { id: 3, title: "New Employee Added", message: "Ryan Park has been added to the Engineering team", time: "1h ago", type: "employee", read: false },
  { id: 4, title: "Mass Absence Alert", message: "5 employees are absent today — above average", time: "2h ago", type: "alert", read: true },
  { id: 5, title: "System Backup", message: "Daily backup completed successfully", time: "3h ago", type: "system", read: true },
  { id: 6, title: "Screenshot Quota", message: "Storage usage reached 80% of limit", time: "Yesterday", type: "alert", read: true },
];

export function NotificationsCenter() {
  const [notifs, setNotifs] = useState(mgrNotifs);
  const unread = notifs.filter(n => !n.read).length;

  const typeColors: Record<string, string> = {
    late: "#f59e0b", recording: "#ef4444", employee: "#10b981", alert: "#ef4444", system: "#6366f1",
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ fontWeight: 600 }}>Notifications Center</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{unread} unread</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
            style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500 }} className="hover:underline">
            Mark all read
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifs.map((n) => (
          <div key={n.id}
            onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className="rounded-2xl p-4 flex gap-4 cursor-pointer transition-all hover:scale-[1.005]"
            style={{ background: n.read ? "var(--card)" : `${typeColors[n.type] || "#6366f1"}08`, border: `1px solid ${n.read ? "var(--border)" : (typeColors[n.type] || "#6366f1") + "25"}` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${typeColors[n.type] || "#6366f1"}20` }}>
              <Bell className="w-5 h-5" style={{ color: typeColors[n.type] || "#6366f1" }} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span style={{ fontWeight: n.read ? 400 : 600, fontSize: "0.9rem" }}>{n.title}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", flexShrink: 0, marginLeft: "1rem" }}>{n.time}</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{n.message}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: typeColors[n.type] || "#6366f1" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function ManagerSettings() {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Company", icon: Building },
    { id: "permissions", label: "Permissions", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "screenshot", label: "Screenshots", icon: Camera },
    { id: "recording", label: "Recordings", icon: Video },
    { id: "hours", label: "Work Hours", icon: Clock },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex gap-2 flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{ background: activeTab === id ? "var(--primary)" : "var(--muted)", color: activeTab === id ? "white" : "var(--muted-foreground)", fontWeight: activeTab === id ? 600 : 400, fontSize: "0.875rem" }}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {activeTab === "company" && (
          <>
            <h3 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Company Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["Company Name", "Industry", "Address", "Website", "Contact Email", "Phone"].map(label => (
                <div key={label}>
                  <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</label>
                  <input defaultValue={label === "Company Name" ? "TechCorp Inc." : ""} className="w-full px-4 py-2.5 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
                </div>
              ))}
            </div>
            <button className="px-6 py-2.5 rounded-xl text-white gradient-primary" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Save Changes</button>
          </>
        )}

        {activeTab === "screenshot" && (
          <>
            <h3 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Screenshot Settings</h3>
            <div className="space-y-5">
              {[
                { label: "Capture Frequency", desc: "How often to capture screenshots", type: "select", options: ["Every 5 min", "Every 10 min", "Every 15 min", "Every 30 min"] },
                { label: "Auto-Delete After", desc: "Automatically delete screenshots", type: "select", options: ["30 days", "60 days", "90 days", "Never"] },
              ].map(({ label, desc, type, options }) => (
                <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{label}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{desc}</div>
                  </div>
                  <select className="py-2 px-3 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
                    {options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              {[
                { label: "Blur Sensitive Content", desc: "Blur credit cards, passwords in screenshots", enabled: true },
                { label: "Notify Employee on Capture", desc: "Show notification when screenshot is taken", enabled: false },
                { label: "Enable Screenshot Monitoring", desc: "Activate automatic screenshot capture", enabled: true },
              ].map(({ label, desc, enabled }) => (
                <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{label}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{desc}</div>
                  </div>
                  <div className="w-11 h-6 rounded-full cursor-pointer" style={{ background: enabled ? "var(--primary)" : "var(--muted)", padding: "2px" }}>
                    <div className="w-5 h-5 rounded-full bg-white" style={{ transform: enabled ? "translateX(20px)" : "translateX(0)", transition: "transform 0.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "hours" && (
          <>
            <h3 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>Working Hours Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Work Start Time", value: "09:00" },
                { label: "Work End Time", value: "18:00" },
                { label: "Daily Hour Target", value: "8" },
                { label: "Break Duration (min)", value: "30" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</label>
                  <input defaultValue={value} className="w-full px-4 py-2.5 rounded-xl outline-none max-w-xs"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
                </div>
              ))}
              <div>
                <label className="block mb-2" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Working Days</label>
                <div className="flex gap-2 flex-wrap">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                    <button key={d} className="w-12 h-10 rounded-xl transition-all"
                      style={{ background: i < 5 ? "var(--primary)" : "var(--muted)", color: i < 5 ? "white" : "var(--muted-foreground)", fontWeight: i < 5 ? 600 : 400, fontSize: "0.8rem" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <button className="px-6 py-2.5 rounded-xl text-white gradient-primary" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Save Settings</button>
            </div>
          </>
        )}

        {(activeTab === "permissions" || activeTab === "notifications" || activeTab === "recording") && (
          <div className="space-y-4">
            <h3 style={{ fontWeight: 700 }}>{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>Setting Option {i + 1}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Configuration for this feature</div>
                </div>
                <div className="w-11 h-6 rounded-full cursor-pointer" style={{ background: i % 2 === 0 ? "var(--primary)" : "var(--muted)", padding: "2px" }}>
                  <div className="w-5 h-5 rounded-full bg-white" style={{ transform: i % 2 === 0 ? "translateX(20px)" : "translateX(0)", transition: "transform 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
