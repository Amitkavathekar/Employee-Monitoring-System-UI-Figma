import { useState, useEffect } from "react";
import {
  CheckCircle, Activity, Coffee, Monitor, ArrowUp, ArrowDown, Play,
  LogIn, LogOut, ChevronDown, Bell, Users, XCircle, Clock, Pause, Briefcase, Calendar
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const empNotifs = [
  { id: 1, title: "Checked In", message: "You checked in at 9:02 AM — 2 minutes late", time: "2m ago", type: "late", read: false },
  { id: 2, title: "Recording Started", message: "Screen recording session started by Manager (Alex Morgan)", time: "5m ago", type: "recording", read: false },
  { id: 3, title: "Screenshot Captured", message: "Auto-captured screenshot of active window (VS Code) for productivity logs", time: "10m ago", type: "screenshot", read: false },
  { id: 8, title: "Break Started", message: "You started a coffee break at 12:00 PM", time: "15m ago", type: "break", read: false },
  { id: 9, title: "Break Ended", message: "You ended break and resumed working at 12:30 PM", time: "45m ago", type: "break", read: true },
  { id: 4, title: "Absence Warning", message: "Company attendance alert — threshold warning", time: "2h ago", type: "alert", read: true },
  { id: 5, title: "System Backup", message: "Daily workspace database backup completed", time: "3h ago", type: "system", read: true },
  { id: 6, title: "Storage Alert", message: "Your screenshots storage space has reached 80%", time: "Yesterday", type: "alert", read: true },
];

const typeColors: Record<string, string> = {
  late: "#f59e0b", recording: "#ef4444", employee: "#10b981", alert: "#ef4444", system: "#6366f1",
  screenshot: "#6366f1", break: "#f59e0b",
};

const iconMap: Record<string, any> = {
  late: CheckCircle,
  recording: Activity,
  employee: Users,
  screenshot: Monitor,
  break: Coffee,
  alert: XCircle,
  system: Bell,
};

export function EmployeeDashboard({ selectedNotificationId, setSelectedNotificationId }: any) {
  const [checkedIn, setCheckedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime] = useState("09:02 AM");
  const [notifs, setNotifs] = useState(empNotifs);
  const [expandedNotifId, setExpandedNotifId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedNotificationId !== null && selectedNotificationId !== undefined) {
      setExpandedNotifId(selectedNotificationId);
      setNotifs(prev => prev.map(n => n.id === selectedNotificationId ? { ...n, read: true } : n));
      setTimeout(() => {
        const element = document.getElementById(`notif-${selectedNotificationId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      if (setSelectedNotificationId) {
        setSelectedNotificationId(null);
      }
    }
  }, [selectedNotificationId, setSelectedNotificationId]);

  const attendanceData = [
    { name: "Present", value: 10, color: "#10b981" },
    { name: "Late", value: 2, color: "#f59e0b" },
    { name: "Absent", value: 0, color: "#ef4444" },
    { name: "Leaves", value: 2, color: "#6366f1" },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-h-[calc(100vh-64px)]">
      {/* Stat Cards - 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Check In/Out */}
        <button
          onClick={() => setCheckedIn(!checkedIn)}
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 text-center w-full"
          style={{
            background: checkedIn ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
            border: `1px solid ${checkedIn ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
            height: "135px"
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
            height: "135px"
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
        <div className="rounded-2xl p-5 flex flex-col justify-center gap-1" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "135px" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Today's Status</div>
          <div className="flex items-center gap-2 my-1">
            <CheckCircle className="w-5 h-5" style={{ color: "#10b981" }} />
            <span style={{ fontWeight: 700, color: "#10b981", fontSize: "1.1rem" }}>Present</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>On time · Check-in 09:02</div>
        </div>

        {/* Card 4: Working Hours */}
        <div className="rounded-2xl p-5 flex flex-col justify-center gap-1" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "135px" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Working Hours</div>
          <div style={{ fontWeight: 700, fontSize: "1.6rem", color: "var(--primary)", lineHeight: 1.1, margin: "4px 0" }}>6:23</div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Break: 30m · Active: 5h 53m</div>
        </div>
      </div>

      {/* Grid: Recent Activities + Monthly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Section */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "380px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Recent Activities</h3>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {notifs.map((n) => {
              const isExpanded = expandedNotifId === n.id;
              const isBreakEnd = n.type === "break" && n.title.toLowerCase().includes("end");
              const IconComponent = isBreakEnd ? Play : (iconMap[n.type] || Bell);
              const color = isBreakEnd ? "#10b981" : (typeColors[n.type] || "#6366f1");

              return (
                <div key={n.id} 
                  id={`notif-${n.id}`}
                  onClick={() => setExpandedNotifId(isExpanded ? null : n.id)}
                  className="cursor-pointer transition-all hover:scale-[1.002]"
                  style={{ 
                    borderBottom: "1px solid var(--border)", 
                    padding: "12px 0",
                    background: n.read ? "transparent" : `${color}04`
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15` }}>
                      <IconComponent className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <span style={{ fontWeight: n.read ? 400 : 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{n.title}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{n.time}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} style={{ color: "var(--muted-foreground)" }} />
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ paddingLeft: "48px", paddingTop: "8px" }} className="animate-fade-in">
                      <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                        {n.message}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Summary (This Month - Pie Chart) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "380px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>This Month</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {attendanceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {attendanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span style={{ fontSize: "0.8rem" }}>{item.name}</span>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.value} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
