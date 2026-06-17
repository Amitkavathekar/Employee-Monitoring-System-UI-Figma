import { useState } from "react";
import {
  CheckCircle, Activity, Coffee, Monitor, ArrowUp, ArrowDown, Play,
  LogIn, LogOut
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const recentActivities = [
  { id: 1, action: "Checked In", time: "9:02 AM", icon: CheckCircle, color: "#10b981" },
  { id: 2, action: "Screenshot Captured", time: "9:30 AM", icon: Monitor, color: "#6366f1" },
  { id: 3, action: "Break Started", time: "12:00 PM", icon: Coffee, color: "#f59e0b" },
  { id: 4, action: "Break Ended", time: "12:30 PM", icon: Play, color: "#10b981" },
  { id: 5, action: "Recording Started", time: "2:00 PM", icon: Activity, color: "#ef4444" },
];

export function EmployeeDashboard() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime] = useState("09:02 AM");

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
            {recentActivities.map(({ id, action, time, icon: Icon, color }) => (
              <div key={id} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15` }}>
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

        {/* Attendance Summary (This Month - Pie Chart) */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", height: "380px" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>This Month</h3>
          
          <div className="flex flex-col items-center justify-center flex-1">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={attendanceData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {attendanceData.filter(d => d.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    color: "var(--foreground)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-3">
              {attendanceData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs p-1 rounded hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="truncate text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-semibold">{d.value} days</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
