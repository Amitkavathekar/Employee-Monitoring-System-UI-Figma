import { useState, useEffect } from "react";
import {
  Play, Square, Clock, Activity, Camera, Download, Trash2,
  Video, Eye, ZoomIn, Keyboard, Mouse, Globe, AppWindow,
  Bell, CheckCircle, AlertCircle, User, Mail, Phone, Building,
  Calendar, Lock, TrendingUp, BarChart2, Target, Award, Coffee
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PieChart, Pie, Cell
} from "recharts";

// ─── Work Session ─────────────────────────────────────────────────────────────

const sessionHistory = [
  { date: "Jun 13", start: "09:02", end: "18:05", duration: "9h 3m", breaks: "30m", status: "completed" },
  { date: "Jun 12", start: "09:15", end: "17:48", duration: "8h 33m", breaks: "45m", status: "completed" },
  { date: "Jun 11", start: "09:32", end: "18:10", duration: "8h 38m", breaks: "30m", status: "completed" },
  { date: "Jun 10", start: "--", end: "--", duration: "--", breaks: "--", status: "absent" },
  { date: "Jun 09", start: "09:00", end: "13:00", duration: "4h 0m", breaks: "0m", status: "half" },
];

const weekSessionData = [
  { day: "Mon", hours: 9.0, breaks: 0.5 },
  { day: "Tue", hours: 8.5, breaks: 0.75 },
  { day: "Wed", hours: 8.6, breaks: 0.5 },
  { day: "Thu", hours: 0, breaks: 0 },
  { day: "Fri", hours: 4.0, breaks: 0 },
];

export function WorkSession() {
  const [active, setActive] = useState(true);
  const [elapsed] = useState("06:23:14");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Session Control */}
      <div className="rounded-2xl p-6 text-center"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="mb-4">
          <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center relative"
            style={{ background: active ? "rgba(99,102,241,0.1)" : "var(--muted)", border: `3px solid ${active ? "var(--primary)" : "var(--border)"}` }}>
            {active && <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-20" style={{ borderColor: "var(--primary)" }} />}
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "1.5rem", fontWeight: 700, color: active ? "var(--primary)" : "var(--muted-foreground)" }}>
                {elapsed}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{active ? "Active" : "Stopped"}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActive(!active)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: active ? "var(--destructive)" : "var(--success, #10b981)", fontWeight: 600 }}>
            {active ? <><Square className="w-5 h-5" /> End Session</> : <><Play className="w-5 h-5" /> Start Session</>}
          </button>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Total Today", value: "6h 23m", color: "var(--primary)" },
            { label: "Break Time", value: "30 min", color: "#f59e0b" },
            { label: "Active Time", value: "5h 53m", color: "#10b981" },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 rounded-xl" style={{ background: "var(--muted)" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Weekly Session Statistics</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekSessionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            <Bar dataKey="hours" name="Work Hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="breaks" name="Break Hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Session History */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Session History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Date", "Start", "End", "Duration", "Breaks", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessionHistory.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.date}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.start}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{row.end}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{row.duration}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{row.breaks}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-1 rounded-lg"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: row.status === "completed" ? "rgba(16,185,129,0.1)" : row.status === "absent" ? "rgba(239,68,68,0.1)" : "rgba(6,182,212,0.1)",
                        color: row.status === "completed" ? "#10b981" : row.status === "absent" ? "#ef4444" : "#06b6d4",
                      }}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Productivity ─────────────────────────────────────────────────────────────

const prodData = [
  { week: "W1", score: 82, tasks: 42, hours: 40 },
  { week: "W2", score: 87, tasks: 48, hours: 42 },
  { week: "W3", score: 91, tasks: 51, hours: 43 },
  { week: "W4", score: 88, tasks: 45, hours: 40 },
];

const monthlyTrend = [
  { month: "Jan", score: 84 }, { month: "Feb", score: 80 }, { month: "Mar", score: 88 },
  { month: "Apr", score: 85 }, { month: "May", score: 90 }, { month: "Jun", score: 92 },
];

export function EmployeeProductivity() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Score Card */}
      <div className="rounded-2xl p-6 gradient-primary text-white"
        style={{ position: "relative", overflow: "hidden" }}>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: "white" }} />
        <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Productivity Score", value: "92%", icon: Award },
            { label: "Attendance Rate", value: "95%", icon: CheckCircle },
            { label: "Tasks Completed", value: "48/55", icon: Target },
            { label: "Avg Daily Hours", value: "8.4h", icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="w-7 h-7 mx-auto mb-2 opacity-80" />
              <div style={{ fontSize: "1.8rem", fontWeight: 800 }}>{value}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as const).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="px-4 py-2 rounded-xl capitalize transition-all"
            style={{
              background: period === p ? "var(--primary)" : "var(--muted)",
              color: period === p ? "white" : "var(--muted-foreground)",
              fontWeight: period === p ? 600 : 400,
              fontSize: "0.875rem",
            }}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Tasks Completion Bar Chart */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Weekly Task Completion</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={prodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Bar dataKey="tasks" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Manager Assigned Tasks */}
        <div className="lg:col-span-2 rounded-2xl p-5 overflow-hidden flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Manager Assigned Tasks</h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: "var(--muted)" }}>
                  {["Task Name", "Priority", "Deadline", "Progress", "Status"].map(h => (
                    <th key={h} className="px-4 py-2 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: "Integrate Redux for Leave state", priority: "High", deadline: "June 20, 2026", progress: 65, status: "In Progress" },
                  { id: 2, name: "Implement Auth Register Screens", priority: "High", deadline: "June 22, 2026", progress: 100, status: "Completed" },
                  { id: 3, name: "Optimize Database Queries", priority: "Medium", deadline: "June 25, 2026", progress: 0, status: "Pending" },
                  { id: 4, name: "Write API Documentation", priority: "Low", deadline: "June 30, 2026", progress: 0, status: "Pending" },
                ].map((task) => (
                  <tr key={task.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{task.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[0.7rem] font-bold"
                        style={{
                          background: task.priority === "High" ? "rgba(239,68,68,0.15)" : task.priority === "Medium" ? "rgba(245,158,11,0.15)" : "rgba(6,182,212,0.15)",
                          color: task.priority === "High" ? "#ef4444" : task.priority === "Medium" ? "#f59e0b" : "#06b6d4"
                        }}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{task.deadline}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--muted)" }}>
                          <div className="h-1.5 rounded-full transition-all" style={{ width: `${task.progress}%`, background: "var(--primary)" }} />
                        </div>
                        <span style={{ fontSize: "0.75rem" }}>{task.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[0.7rem] font-bold"
                        style={{
                          background: task.status === "Completed" ? "rgba(16,185,129,0.15)" : task.status === "In Progress" ? "rgba(99,102,241,0.15)" : "rgba(107,114,128,0.15)",
                          color: task.status === "Completed" ? "#10b981" : task.status === "In Progress" ? "var(--primary)" : "#6b7280"
                        }}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screenshots ──────────────────────────────────────────────────────────────

const screenshots = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  time: `${Math.floor(9 + i * 0.5)}:${i % 2 === 0 ? "00" : "30"} AM`,
  date: "Jun 13, 2026",
  activity: Math.floor(70 + Math.random() * 30),
  size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
}));

export function EmployeeScreenshots() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Screenshots", value: "24", color: "#6366f1" },
          { label: "This Week", value: "120", color: "#06b6d4" },
          { label: "Avg Activity", value: "87%", color: "#10b981" },
          { label: "Storage Used", value: "156 MB", color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 style={{ fontWeight: 600 }}>Screenshot Gallery</h3>
        <div className="flex items-center gap-2">
          <select className="py-2 px-3 rounded-xl outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
          </select>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="px-3 py-2 rounded-xl transition-all"
            style={{ background: "var(--muted)", fontSize: "0.8rem", color: "var(--foreground)" }}>
            {view === "grid" ? "List View" : "Grid View"}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white"
            style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {screenshots.map((ss) => (
            <div key={ss.id} className="rounded-xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
              style={{ border: "1px solid var(--border)" }}
              onClick={() => setPreview(ss.id)}>
              <div className="h-32 relative flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, hsl(${ss.id * 30}, 40%, 30%) 0%, hsl(${ss.id * 30 + 60}, 50%, 20%) 100%)` }}>
                <Monitor style={{ width: 40, height: 40, color: "rgba(255,255,255,0.3)" }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.4)" }}>
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-white"
                  style={{ background: "rgba(0,0,0,0.6)", fontSize: "0.65rem" }}>
                  {ss.activity}% active
                </div>
              </div>
              <div className="px-3 py-2" style={{ background: "var(--card)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{ss.time}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{ss.date} · {ss.size}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Preview", "Time", "Date", "Activity", "Size", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {screenshots.map((ss) => (
                <tr key={ss.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-3">
                    <div className="w-12 h-8 rounded flex items-center justify-center"
                      style={{ background: `hsl(${ss.id * 30}, 40%, 30%)` }}>
                      <Camera className="w-3 h-3 text-white" />
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{ss.time}</td>
                  <td className="px-5 py-3" style={{ fontSize: "0.875rem" }}>{ss.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--muted)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${ss.activity}%`, background: "#10b981" }} />
                      </div>
                      <span style={{ fontSize: "0.8rem" }}>{ss.activity}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: "0.875rem" }}>{ss.size}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setPreview(ss.id)} className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {preview !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setPreview(null)}>
          <div className="rounded-2xl overflow-hidden max-w-2xl w-full" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="h-80 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, hsl(${preview * 30}, 40%, 30%) 0%, hsl(${preview * 30 + 60}, 50%, 20%) 100%)` }}>
              <Monitor style={{ width: 80, height: 80, color: "rgba(255,255,255,0.3)" }} />
            </div>
            <div className="p-5 flex justify-between items-center">
              <div>
                <div style={{ fontWeight: 600 }}>Screenshot #{preview}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Jun 13, 2026 · Activity: {screenshots[preview-1]?.activity}%</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={() => setPreview(null)} className="p-2 rounded-xl" style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Recordings ───────────────────────────────────────────────────────────────

const recordings = [
  { id: 1, date: "Jun 13, 2026", start: "09:00", end: "10:30", duration: "1h 30m", size: "245 MB", status: "completed" },
  { id: 2, date: "Jun 13, 2026", start: "14:00", end: "15:45", duration: "1h 45m", size: "289 MB", status: "completed" },
  { id: 3, date: "Jun 12, 2026", start: "09:00", end: "12:00", duration: "3h 0m", size: "498 MB", status: "completed" },
  { id: 4, date: "Jun 12, 2026", start: "13:00", end: "17:00", duration: "4h 0m", size: "654 MB", status: "completed" },
];

export function EmployeeRecordings() {
  const [isRecording, setIsRecording] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Control */}
      <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontWeight: 600 }}>Screen Recording</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
              {isRecording ? "Recording in progress..." : "Not recording"}
            </p>
          </div>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: isRecording ? "var(--destructive)" : "#10b981", fontWeight: 600 }}>
            {isRecording ? <><Square className="w-4 h-4" /> Stop Recording</> : <><Video className="w-4 h-4" /> Start Recording</>}
          </button>
        </div>
        {isRecording && (
          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="w-3 h-3 rounded-full animate-pulse-dot" style={{ background: "#ef4444" }} />
            <span style={{ fontWeight: 600, color: "#ef4444", fontSize: "0.875rem" }}>REC</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--foreground)", fontSize: "0.875rem" }}>00:12:45</span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", marginLeft: "auto" }}>~45 MB / 245 MB limit</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Recordings", value: "28", color: "#6366f1" },
          { label: "Total Duration", value: "48h", color: "#06b6d4" },
          { label: "Storage Used", value: "7.2 GB", color: "#f59e0b" },
          { label: "Storage Limit", value: "20 GB", color: "#10b981" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Recording List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Recording History</h3>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {recordings.map((rec) => (
            <div key={rec.id} className="p-5 flex items-center gap-4">
              <div className="w-16 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `hsl(${rec.id * 60}, 50%, 30%)` }}>
                <Video className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Recording #{rec.id}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                  {rec.date} · {rec.start} – {rec.end} · {rec.size}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)" }}>{rec.duration}</span>
                <button
                  onClick={() => setPlaying(playing === rec.id ? null : rec.id)}
                  className="p-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: playing === rec.id ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)", color: playing === rec.id ? "#ef4444" : "var(--primary)" }}>
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

// ─── Activity Monitoring ──────────────────────────────────────────────────────

const appUsage = [
  { name: "VS Code", usage: 180, color: "#6366f1" },
  { name: "Chrome", usage: 120, color: "#06b6d4" },
  { name: "Slack", usage: 60, color: "#f59e0b" },
  { name: "Figma", usage: 45, color: "#8b5cf6" },
  { name: "Terminal", usage: 30, color: "#10b981" },
];

const websiteUsage = [
  { name: "github.com", usage: 95 }, { name: "docs.company.com", usage: 60 },
  { name: "stackoverflow.com", usage: 45 }, { name: "notion.so", usage: 30 },
];

const hourlyActivity = Array.from({ length: 9 }, (_, i) => ({
  time: `${9 + i}:00`,
  keyboard: Math.floor(60 + Math.random() * 40),
  mouse: Math.floor(50 + Math.random() * 40),
}));

export function ActivityMonitoring() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Keyboard Strokes", value: "18,245", icon: Keyboard, color: "#6366f1" },
          { label: "Mouse Clicks", value: "3,892", icon: Mouse, color: "#06b6d4" },
          { label: "Active Time", value: "5h 48m", icon: Activity, color: "#10b981" },
          { label: "Focus Score", value: "88%", icon: Target, color: "#f59e0b" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Hourly Activity */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Hourly Activity</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourlyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
            <Bar dataKey="keyboard" name="Keyboard" fill="var(--primary)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="mouse" name="Mouse" fill="var(--accent)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Usage */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Application Usage</h3>
          <div className="space-y-3">
            {appUsage.map(({ name, usage, color }) => (
              <div key={name}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: "0.875rem" }}>{name}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color }}>{usage}m</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${(usage / 180) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Usage */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Website Usage</h3>
          <div className="space-y-3">
            {websiteUsage.map(({ name, usage }) => (
              <div key={name}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: "0.875rem" }}>{name}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{usage}m</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${(usage / 95) * 100}%`, background: "var(--accent)" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <div className="flex justify-between">
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Idle Time Today</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f59e0b" }}>35 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

const notifData = [
  { id: 1, type: "checkin", title: "Check-in Reminder", message: "Don't forget to check in! Your shift started 5 minutes ago.", time: "9:05 AM", read: false, icon: Clock, color: "#6366f1" },
  { id: 2, type: "screenshot", title: "Screenshot Captured", message: "Automatic screenshot captured at 9:30 AM", time: "9:30 AM", read: false, icon: Camera, color: "#06b6d4" },
  { id: 3, type: "recording", title: "Recording Started", message: "Screen recording has been initiated by admin", time: "2:00 PM", read: false, icon: Video, color: "#ef4444" },
  { id: 4, type: "break", title: "Break Time Alert", message: "You've been working for 4 hours. Take a break!", time: "1:00 PM", read: true, icon: Coffee, color: "#f59e0b" },
  { id: 5, type: "announce", title: "Announcement", message: "Company meeting scheduled for Friday 3 PM in Conference Room A", time: "Yesterday", read: true, icon: Bell, color: "#8b5cf6" },
];

export function EmployeeNotifications() {
  const [notifs, setNotifs] = useState(notifData);
  const unread = notifs.filter(n => !n.read).length;

  const markRead = (id: number) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ fontWeight: 600 }}>Notifications</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{unread} unread notifications</p>
        </div>
        <button onClick={markAllRead} style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500 }} className="hover:underline">
          Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map(({ id, title, message, time, read, icon: Icon, color }) => (
          <div
            key={id}
            onClick={() => markRead(id)}
            className="rounded-2xl p-4 flex gap-4 cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: read ? "var(--card)" : `${color}08`, border: `1px solid ${read ? "var(--border)" : color + "30"}` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontWeight: read ? 400 : 600, fontSize: "0.9rem" }}>{title}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{time}</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{message}</p>
            </div>
            {!read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: color }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export function EmployeeProfile({ activePage }: { activePage?: string }) {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "password" | "settings">(
    activePage === "settings" ? "settings" : "info"
  );

  useEffect(() => {
    if (activePage === "settings") {
      setActiveTab("settings");
    } else if (activePage === "profile") {
      setActiveTab("info");
    }
  }, [activePage]);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Profile Header */}
      <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
            <span className="text-white" style={{ fontSize: "2rem", fontWeight: 700 }}>JD</span>
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: "var(--primary)", border: "2px solid var(--card)" }}>
            <User className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 style={{ fontWeight: 700 }}>John Doe</h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem" }}>Software Engineer · Frontend Team</p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", fontSize: "0.75rem", fontWeight: 600 }}>Active</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)", fontSize: "0.75rem" }}>Employee ID: EMP-0042</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "var(--muted)", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Joined Jan 15, 2025</span>
          </div>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="px-5 py-2.5 rounded-xl transition-all hover:opacity-80"
          style={{ background: editing ? "var(--muted)" : "var(--primary)", color: editing ? "var(--foreground)" : "white", fontWeight: 500, fontSize: "0.875rem" }}>
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["info", "password", "settings"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl capitalize transition-all"
            style={{ background: activeTab === tab ? "var(--primary)" : "var(--muted)", color: activeTab === tab ? "white" : "var(--muted-foreground)", fontWeight: activeTab === tab ? 600 : 400, fontSize: "0.875rem" }}>
            {tab === "info" ? "Personal Info" : tab === "password" ? "Change Password" : "Settings"}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {[
            { label: "Full Name", value: "John Doe", icon: User },
            { label: "Email Address", value: "john.doe@company.com", icon: Mail },
            { label: "Phone Number", value: "+1 (555) 234-5678", icon: Phone },
            { label: "Department", value: "Engineering", icon: Building },
            { label: "Designation", value: "Software Engineer", icon: Award },
            { label: "Joining Date", value: "January 15, 2025", icon: Calendar },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <label className="flex items-center gap-2 mb-2" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                <Icon className="w-4 h-4" /> {label}
              </label>
              <input
                defaultValue={value}
                disabled={!editing}
                className="w-full px-4 py-2.5 rounded-xl outline-none"
                style={{
                  background: editing ? "var(--input-background)" : "var(--muted)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          ))}
          {editing && (
            <div className="md:col-span-2 flex justify-end">
              <button className="px-6 py-2.5 rounded-xl text-white gradient-primary font-medium transition-all hover:opacity-90">
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "password" && (
        <div className="rounded-2xl p-6 max-w-md space-y-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {["Current Password", "New Password", "Confirm New Password"].map(label => (
            <div key={label}>
              <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
            </div>
          ))}
          <button className="w-full py-2.5 rounded-xl text-white gradient-primary font-medium transition-all hover:opacity-90">
            Update Password
          </button>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {[
            { label: "Email Notifications", desc: "Receive notifications via email", enabled: true },
            { label: "Break Reminders", desc: "Get reminded to take breaks", enabled: true },
            { label: "Screenshot Alerts", desc: "Notify when screenshots are taken", enabled: false },
            { label: "Session Alerts", desc: "Get alerts for session events", enabled: true },
          ].map(({ label, desc, enabled }) => (
            <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{label}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{desc}</div>
              </div>
              <div className="w-11 h-6 rounded-full cursor-pointer transition-all" style={{ background: enabled ? "var(--primary)" : "var(--muted)", padding: "2px" }}>
                <div className="w-5 h-5 rounded-full bg-white transition-all" style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
