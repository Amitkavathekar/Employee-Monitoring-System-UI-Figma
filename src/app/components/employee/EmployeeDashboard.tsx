import { useState } from "react";
import {
  Clock, CheckCircle, TrendingUp, Activity, Calendar,
  Target, Coffee, Monitor, ArrowUp, ArrowDown, Play,
  LogIn, LogOut, XCircle, AlertCircle, Bell
} from "lucide-react";

const recentActivities = [
  { id: 1, action: "Checked In", time: "9:02 AM", icon: CheckCircle, color: "#10b981" },
  { id: 2, action: "Screenshot Captured", time: "9:30 AM", icon: Monitor, color: "#6366f1" },
  { id: 3, action: "Break Started", time: "12:00 PM", icon: Coffee, color: "#f59e0b" },
  { id: 4, action: "Break Ended", time: "12:30 PM", icon: Play, color: "#10b981" },
  { id: 5, action: "Recording Started", time: "2:00 PM", icon: Activity, color: "#ef4444" },
];

const dashboardNotifs = [
  { id: 1, title: "Check-in Reminder", message: "Don't forget to check in! Your shift started 5 minutes ago.", time: "9:05 AM", read: false, color: "#6366f1" },
  { id: 2, title: "Screenshot Captured", message: "Automatic screenshot captured at 9:30 AM", time: "9:30 AM", read: false, color: "#06b6d4" },
  { id: 3, title: "Recording Started", message: "Screen recording has been initiated by admin", time: "2:00 PM", read: false, color: "#ef4444" },
  { id: 4, title: "Break Time Alert", message: "You've been working for 4 hours. Take a break!", time: "1:00 PM", read: true, color: "#f59e0b" },
];

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
  const [notifs, setNotifs] = useState(dashboardNotifs);
  const [checkedIn, setCheckedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime] = useState("09:02 AM");
  const unreadCount = notifs.filter(n => !n.read).length;

  const handleMarkRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stat Cards - 5 Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Check In/Out */}
        <button
          onClick={() => setCheckedIn(!checkedIn)}
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 text-center w-full"
          style={{
            background: checkedIn ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
            border: `1px solid ${checkedIn ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
          }}>
          {checkedIn ? <LogOut className="w-8 h-8" style={{ color: "#ef4444" }} /> : <LogIn className="w-8 h-8" style={{ color: "#10b981" }} />}
          <div>
            <span className="block font-bold text-sm" style={{ color: checkedIn ? "#ef4444" : "#10b981" }}>
              {checkedIn ? "Check Out" : "Check In"}
            </span>
            {checkedIn && <span className="block text-[0.7rem] text-muted-foreground mt-1">In since {checkInTime}</span>}
          </div>
        </button>

        {/* Card 2: Break */}
        <button
          onClick={() => setOnBreak(!onBreak)}
          disabled={!checkedIn}
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 text-center w-full"
          style={{
            background: onBreak ? "rgba(245,158,11,0.1)" : "rgba(6,182,212,0.1)",
            border: `1px solid ${onBreak ? "rgba(245,158,11,0.3)" : "rgba(6,182,212,0.3)"}`,
          }}>
          {onBreak ? <Play className="w-8 h-8" style={{ color: "#f59e0b" }} /> : <Coffee className="w-8 h-8" style={{ color: "#06b6d4" }} />}
          <div>
            <span className="block font-bold text-sm" style={{ color: onBreak ? "#f59e0b" : "#06b6d4" }}>
              {onBreak ? "End Break" : "Start Break"}
            </span>
            <span className="block text-[0.7rem] text-muted-foreground mt-1">
              {onBreak ? "Started 12:00 PM" : "No active break"}
            </span>
          </div>
        </button>

        {/* Card 3: Today's Status */}
        <div className="rounded-2xl p-5 flex flex-col justify-center gap-1" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Today's Status</div>
          <div className="flex items-center gap-2 my-1">
            <CheckCircle className="w-5 h-5" style={{ color: "#10b981" }} />
            <span style={{ fontWeight: 700, color: "#10b981", fontSize: "1.1rem" }}>Present</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>On time · Check-in 09:02</div>
        </div>

        {/* Card 4: Working Hours */}
        <div className="rounded-2xl p-5 flex flex-col justify-center gap-1" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Working Hours</div>
          <div style={{ fontWeight: 700, fontSize: "1.6rem", color: "var(--primary)", lineHeight: 1.1, margin: "4px 0" }}>6:23</div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Break: 30m · Active: 5h 53m</div>
        </div>

        {/* Card 5: Tasks Completed (Original 4th card) */}
        <StatCard label="Tasks Completed" value="12 / 15" sub="80% done" icon={Target} color="#f59e0b" trend={15} />
      </div>

      {/* Grid: Notifications + Monthly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications Section */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 style={{ fontWeight: 600 }}>Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-white text-[0.65rem] font-bold" style={{ background: "var(--primary)" }}>
                  {unreadCount} UNREAD
                </span>
              )}
            </div>
            <button onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
              style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600 }} className="hover:underline">
              Mark all read
            </button>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {notifs.map((n) => (
              <div key={n.id} onClick={() => handleMarkRead(n.id)} className="flex gap-3 p-3 rounded-xl transition-all cursor-pointer hover:opacity-95"
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

        {/* Attendance Summary (This Month) */}
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
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>95%</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "2px" }}>Attendance Rate</div>
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
