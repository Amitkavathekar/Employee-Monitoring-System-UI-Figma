import { useState, useEffect } from "react";
import {
  Users, CheckCircle, XCircle, Wifi, TrendingUp, Clock, Camera, Video,
  ArrowUp, ArrowDown, Activity, Bell, ChevronDown, Monitor, Coffee, Play,
  Pause, Plus, Send, Briefcase, Calendar
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { toast } from "sonner";

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

const mgrNotifs = [
  { id: 1, title: "John Doe Checked In", message: "John Doe checked in at 9:02 AM — 2 minutes late", time: "2m ago", type: "late", read: false },
  { id: 2, title: "Recording Started", message: "Emma Wilson started a screen recording session", time: "5m ago", type: "recording", read: false },
  { id: 3, title: "New Employee Added", message: "Ryan Park has been added to the Engineering team", time: "1h ago", type: "employee", read: false },
  { id: 7, title: "Screenshot Captured", message: "Auto-captured screenshot of active window (VS Code) for Mike Chen", time: "10m ago", type: "screenshot", read: false },
  { id: 8, title: "Break Started", message: "Sarah Johnson started a coffee break", time: "15m ago", type: "break", read: false },
  { id: 9, title: "Break Ended", message: "Sarah Johnson ended break and resumed working", time: "45m ago", type: "break", read: true },
  { id: 4, title: "Mass Absence Alert", message: "5 employees are absent today — above average", time: "2h ago", type: "alert", read: true },
  { id: 5, title: "System Backup", message: "Daily backup completed successfully", time: "3h ago", type: "system", read: true },
  { id: 6, title: "Screenshot Quota", message: "Storage usage reached 80% of limit", time: "Yesterday", type: "alert", read: true },
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

export function ManagerDashboard({ selectedNotificationId, setSelectedNotificationId }: any) {
  const [notifs, setNotifs] = useState<any[]>(() => {
    const saved = localStorage.getItem("manager_notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return mgrNotifs;
  });
  const [expandedNotifId, setExpandedNotifId] = useState<number | null>(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const loadNotifs = () => {
      const saved = localStorage.getItem("manager_notifications");
      if (saved) {
        try {
          setNotifs(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener("storage", loadNotifs);
    const interval = setInterval(loadNotifs, 2000);
    return () => {
      window.removeEventListener("storage", loadNotifs);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (selectedNotificationId !== null && selectedNotificationId !== undefined) {
      setExpandedNotifId(selectedNotificationId);
      const updated = notifs.map(n => n.id === selectedNotificationId ? { ...n, read: true } : n);
      setNotifs(updated);
      localStorage.setItem("manager_notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      
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
  }, [selectedNotificationId, setSelectedNotificationId, notifs]);

  const handleMarkRead = (id: number) => {
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifs(updated);
    localStorage.setItem("manager_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleMarkAllRead = () => {
    const updated = notifs.map(n => ({ ...n, read: true }));
    setNotifs(updated);
    localStorage.setItem("manager_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Top Stats - Single Row of 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Employees" value="55" sub="3 new this month" icon={Users} color="#6366f1" trend={5} />
        <MetricCard label="Present Today" value="46" sub="83.6% attendance" icon={CheckCircle} color="#10b981" trend={2} />
        <MetricCard label="Online Now" value="38" sub="Live sessions" icon={Wifi} color="#06b6d4" trend={-1} />
        <MetricCard label="Absent Today" value="4" sub="Down from 6 yesterday" icon={XCircle} color="#ef4444" trend={-33} />
      </div>

      {/* Row 1: Recent Activity and Today's Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card (Unified list of activities + notifications) */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "380px" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 style={{ fontWeight: 600 }}>Recent Activity</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-white text-[0.65rem] font-bold" style={{ background: "var(--primary)" }}>
                  {unreadCount} UNREAD
                </span>
              )}
            </div>
            <button onClick={handleMarkAllRead}
              style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600 }} className="hover:underline">
              Mark all read
            </button>
          </div>
          <div className="space-y-1 overflow-y-auto pr-1 flex-1">
            {notifs.map((n) => {
              const isExpanded = expandedNotifId === n.id;
              const isBreakEnd = n.type === "break" && n.title.toLowerCase().includes("end");
              const IconComponent = isBreakEnd ? Play : (iconMap[n.type] || Bell);
              const color = isBreakEnd ? "#10b981" : (typeColors[n.type] || "#6366f1");

              return (
                <div key={n.id}
                  id={`notif-${n.id}`}
                  onClick={() => {
                    handleMarkRead(n.id);
                    setExpandedNotifId(isExpanded ? null : n.id);
                  }}
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
                    {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />}
                  </div>
                  {isExpanded && (
                    <div style={{ paddingLeft: "48px", paddingTop: "8px" }} className="animate-fade-in">
                      <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>{n.message}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Attendance Card */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "380px" }}>
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
