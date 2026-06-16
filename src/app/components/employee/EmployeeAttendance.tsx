import { useState } from "react";
import { LogIn, LogOut, Coffee, Play, Download, Filter, Search, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const attendanceHistory = [
  { date: "2026-06-13", checkIn: "09:02", checkOut: "18:05", break: "30m", total: "8h 33m", status: "present" },
  { date: "2026-06-12", checkIn: "09:15", checkOut: "17:48", break: "45m", total: "7h 48m", status: "present" },
  { date: "2026-06-11", checkIn: "09:32", checkOut: "18:10", break: "30m", total: "8h 8m", status: "late" },
  { date: "2026-06-10", checkIn: "--", checkOut: "--", break: "--", total: "--", status: "absent" },
  { date: "2026-06-09", checkIn: "09:00", checkOut: "13:00", break: "0m", total: "4h 0m", status: "half-day" },
  { date: "2026-06-08", checkIn: "--", checkOut: "--", break: "--", total: "--", status: "holiday" },
  { date: "2026-06-07", checkIn: "--", checkOut: "--", break: "--", total: "--", status: "holiday" },
  { date: "2026-06-06", checkIn: "09:05", checkOut: "18:00", break: "30m", total: "8h 25m", status: "present" },
  { date: "2026-06-05", checkIn: "09:01", checkOut: "18:15", break: "45m", total: "8h 29m", status: "present" },
  { date: "2026-06-04", checkIn: "09:10", checkOut: "18:00", break: "30m", total: "8h 20m", status: "leave" },
];

const weeklyData = [
  { day: "Mon", hours: 8.5 }, { day: "Tue", hours: 7.8 }, { day: "Wed", hours: 8.1 },
  { day: "Thu", hours: 0 }, { day: "Fri", hours: 4.0 },
];

const statusConfig: Record<string, { color: string; bg: string; label: string; icon: any }> = {
  present: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "Present", icon: CheckCircle },
  absent: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Absent", icon: XCircle },
  late: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "Late", icon: AlertCircle },
  "half-day": { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", label: "Half Day", icon: Clock },
  holiday: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", label: "Holiday", icon: Calendar },
  leave: { color: "#6366f1", bg: "rgba(99,102,241,0.1)", label: "Leave", icon: Calendar },
};

export function EmployeeAttendance() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime] = useState("09:02 AM");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = attendanceHistory.filter(r => filter === "all" || r.status === filter);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Action Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setCheckedIn(!checkedIn)}
          className="rounded-2xl p-5 flex flex-col items-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: checkedIn ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
            border: `1px solid ${checkedIn ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
          }}>
          {checkedIn ? <LogOut className="w-8 h-8" style={{ color: "#ef4444" }} /> : <LogIn className="w-8 h-8" style={{ color: "#10b981" }} />}
          <span style={{ fontWeight: 600, color: checkedIn ? "#ef4444" : "#10b981" }}>
            {checkedIn ? "Check Out" : "Check In"}
          </span>
          {checkedIn && <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>In since {checkInTime}</span>}
        </button>

        <button
          onClick={() => setOnBreak(!onBreak)}
          disabled={!checkedIn}
          className="rounded-2xl p-5 flex flex-col items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          style={{
            background: onBreak ? "rgba(245,158,11,0.1)" : "rgba(6,182,212,0.1)",
            border: `1px solid ${onBreak ? "rgba(245,158,11,0.3)" : "rgba(6,182,212,0.3)"}`,
          }}>
          {onBreak ? <Play className="w-8 h-8" style={{ color: "#f59e0b" }} /> : <Coffee className="w-8 h-8" style={{ color: "#06b6d4" }} />}
          <span style={{ fontWeight: 600, color: onBreak ? "#f59e0b" : "#06b6d4" }}>
            {onBreak ? "End Break" : "Start Break"}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            {onBreak ? "Break started 12:00 PM" : "No active break"}
          </span>
        </button>

        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>Today's Status</div>
          <div className="flex items-center gap-2 mt-auto">
            <CheckCircle className="w-5 h-5" style={{ color: "#10b981" }} />
            <span style={{ fontWeight: 700, color: "#10b981" }}>Present</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>On time · Check-in 09:02</div>
        </div>

        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>Working Hours</div>
          <div style={{ fontWeight: 700, fontSize: "1.8rem", color: "var(--primary)", lineHeight: 1 }}>6:23</div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>Break: 30min · Active: 5h 53m</div>
        </div>
      </div>

      {/* Chart + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>This Week's Hours</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} formatter={(v: any) => [`${v}h`, "Hours"]} />
              <Bar dataKey="hours" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Monthly Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Working Days", value: "14", total: "21" },
              { label: "Present", value: "10", color: "#10b981" },
              { label: "Absent", value: "1", color: "#ef4444" },
              { label: "Late", value: "2", color: "#f59e0b" },
              { label: "Half Day", value: "1", color: "#06b6d4" },
              { label: "Leaves", value: "0", color: "#6366f1" },
            ].map(({ label, value, total, color }) => (
              <div key={label} className="flex justify-between items-center py-1" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>{label}</span>
                <span style={{ fontWeight: 600, color: color || "var(--foreground)", fontSize: "0.9rem" }}>
                  {value}{total ? ` / ${total}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Attendance History</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-xl outline-none"
                style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem", width: "160px" }}
              />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="py-2 px-3 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="half-day">Half Day</option>
              <option value="holiday">Holiday</option>
              <option value="leave">Leave</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:opacity-80"
              style={{ background: "var(--primary)", color: "white", fontSize: "0.8rem", fontWeight: 500 }}>
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Date", "Check In", "Check Out", "Break", "Total Hours", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const conf = statusConfig[row.status];
                const Icon = conf.icon;
                return (
                  <tr key={i} className="hover:opacity-80 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.date}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.checkIn}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.checkOut}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.break}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{row.total}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ background: conf.bg, color: conf.color, fontSize: "0.75rem", fontWeight: 600 }}>
                        <Icon className="w-3 h-3" /> {conf.label}
                      </span>
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
