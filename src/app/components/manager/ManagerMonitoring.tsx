import { useState } from "react";
import {
  Search, Keyboard, MousePointerClick, Clock, Target, Calendar,
  ArrowLeft, Laptop, Globe, Eye
} from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Legend
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & HIGH FIDELITY MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

interface AppUsageItem {
  name: string;
  duration: string;
  val: number;
  max: number;
  color: string;
}

interface WebActivityItem {
  name: string;
  duration: string;
  val: number;
  max: number;
  color: string;
}

interface EmployeeActivity {
  id: number;
  name: string;
  dept: string;
  status: "online" | "offline" | "break";
  keystrokes: string;
  clicks: string;
  activeTime: string;
  initials: string;
  hourlyData: { time: string; keyboard: number; mouse: number }[];
  apps: AppUsageItem[];
  websites: WebActivityItem[];
  idleTime: string;
}

const activityEmployees: EmployeeActivity[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    dept: "Engineering",
    status: "online",
    keystrokes: "18,245",
    clicks: "3,892",
    activeTime: "5h 48m",
    initials: "SJ",
    hourlyData: [
      { time: "8:00", keyboard: 85, mouse: 75 },
      { time: "9:00", keyboard: 98, mouse: 86 },
      { time: "10:00", keyboard: 92, mouse: 82 },
      { time: "11:00", keyboard: 78, mouse: 68 },
      { time: "12:00", keyboard: 80, mouse: 70 },
      { time: "13:00", keyboard: 90, mouse: 84 },
      { time: "14:00", keyboard: 60, mouse: 62 },
      { time: "15:00", keyboard: 75, mouse: 72 },
      { time: "16:00", keyboard: 85, mouse: 78 },
      { time: "17:00", keyboard: 88, mouse: 80 },
    ],
    apps: [
      { name: "VS Code", duration: "180m", val: 180, max: 180, color: "#6366f1" },
      { name: "Chrome", duration: "120m", val: 120, max: 180, color: "#06b6d4" },
      { name: "Slack", duration: "60m", val: 60, max: 180, color: "#f59e0b" },
      { name: "Figma", duration: "45m", val: 45, max: 180, color: "#8b5cf6" },
      { name: "Terminal", duration: "30m", val: 30, max: 180, color: "#10b981" },
    ],
    websites: [
      { name: "github.com", duration: "95m", val: 95, max: 95, color: "#6366f1" },
      { name: "docs.company.com", duration: "60m", val: 60, max: 95, color: "#06b6d4" },
      { name: "stackoverflow.com", duration: "45m", val: 45, max: 95, color: "#f59e0b" },
      { name: "notion.so", duration: "30m", val: 30, max: 95, color: "#8b5cf6" },
    ],
    idleTime: "35 min"
  },
  {
    id: 2,
    name: "Mike Chen",
    dept: "Design",
    status: "online",
    keystrokes: "12,450",
    clicks: "2,910",
    activeTime: "4h 15m",
    initials: "MC",
    hourlyData: [
      { time: "8:00", keyboard: 60, mouse: 70 },
      { time: "9:00", keyboard: 75, mouse: 80 },
      { time: "10:00", keyboard: 80, mouse: 85 },
      { time: "11:00", keyboard: 68, mouse: 75 },
      { time: "12:00", keyboard: 70, mouse: 75 },
      { time: "13:00", keyboard: 85, mouse: 90 },
      { time: "14:00", keyboard: 55, mouse: 60 },
      { time: "15:00", keyboard: 70, mouse: 80 },
      { time: "16:00", keyboard: 78, mouse: 85 },
      { time: "17:00", keyboard: 80, mouse: 82 },
    ],
    apps: [
      { name: "Figma", duration: "240m", val: 240, max: 240, color: "#8b5cf6" },
      { name: "Chrome", duration: "90m", val: 90, max: 240, color: "#06b6d4" },
      { name: "Slack", duration: "45m", val: 45, max: 240, color: "#f59e0b" },
      { name: "Illustrator", duration: "30m", val: 30, max: 240, color: "#6366f1" },
    ],
    websites: [
      { name: "figma.com", duration: "120m", val: 120, max: 120, color: "#8b5cf6" },
      { name: "dribbble.com", duration: "50m", val: 50, max: 120, color: "#06b6d4" },
      { name: "pinterest.com", duration: "30m", val: 30, max: 120, color: "#f59e0b" },
    ],
    idleTime: "25 min"
  },
  {
    id: 3,
    name: "Emma Wilson",
    dept: "Marketing",
    status: "break",
    keystrokes: "8,920",
    clicks: "1,850",
    activeTime: "3h 30m",
    initials: "EW",
    hourlyData: [
      { time: "8:00", keyboard: 40, mouse: 45 },
      { time: "9:00", keyboard: 65, mouse: 60 },
      { time: "10:00", keyboard: 70, mouse: 75 },
      { time: "11:00", keyboard: 58, mouse: 60 },
      { time: "12:00", keyboard: 50, mouse: 55 },
      { time: "13:00", keyboard: 75, mouse: 80 },
      { time: "14:00", keyboard: 30, mouse: 35 },
      { time: "15:00", keyboard: 50, mouse: 60 },
      { time: "16:00", keyboard: 65, mouse: 70 },
      { time: "17:00", keyboard: 70, mouse: 72 },
    ],
    apps: [
      { name: "Chrome", duration: "150m", val: 150, max: 150, color: "#06b6d4" },
      { name: "Slack", duration: "60m", val: 60, max: 150, color: "#f59e0b" },
      { name: "Excel", duration: "45m", val: 45, max: 150, color: "#10b981" },
    ],
    websites: [
      { name: "linkedin.com", duration: "80m", val: 80, max: 80, color: "#6366f1" },
      { name: "facebook.com", duration: "40m", val: 40, max: 80, color: "#ef4444" },
      { name: "twitter.com", duration: "30m", val: 30, max: 80, color: "#06b6d4" },
    ],
    idleTime: "50 min"
  },
  {
    id: 4,
    name: "James Lee",
    dept: "Engineering",
    status: "online",
    keystrokes: "15,800",
    clicks: "3,200",
    activeTime: "5h 10m",
    initials: "JL",
    hourlyData: [
      { time: "8:00", keyboard: 75, mouse: 68 },
      { time: "9:00", keyboard: 90, mouse: 80 },
      { time: "10:00", keyboard: 85, mouse: 78 },
      { time: "11:00", keyboard: 70, mouse: 65 },
      { time: "12:00", keyboard: 72, mouse: 68 },
      { time: "13:00", keyboard: 88, mouse: 80 },
      { time: "14:00", keyboard: 50, mouse: 55 },
      { time: "15:00", keyboard: 70, mouse: 70 },
      { time: "16:00", keyboard: 80, mouse: 75 },
      { time: "17:00", keyboard: 82, mouse: 78 },
    ],
    apps: [
      { name: "VS Code", duration: "200m", val: 200, max: 200, color: "#6366f1" },
      { name: "Chrome", duration: "100m", val: 100, max: 200, color: "#06b6d4" },
      { name: "Slack", duration: "50m", val: 50, max: 200, color: "#f59e0b" },
    ],
    websites: [
      { name: "github.com", duration: "85m", val: 85, max: 85, color: "#6366f1" },
      { name: "stackoverflow.com", duration: "60m", val: 60, max: 85, color: "#f59e0b" },
      { name: "reddit.com", duration: "25m", val: 25, max: 85, color: "#ef4444" },
    ],
    idleTime: "40 min"
  },
  {
    id: 5,
    name: "Priya Patel",
    dept: "Sales",
    status: "offline",
    keystrokes: "9,150",
    clicks: "2,050",
    activeTime: "2h 45m",
    initials: "PP",
    hourlyData: [
      { time: "8:00", keyboard: 50, mouse: 55 },
      { time: "9:00", keyboard: 60, mouse: 62 },
      { time: "10:00", keyboard: 65, mouse: 68 },
      { time: "11:00", keyboard: 50, mouse: 55 },
      { time: "12:00", keyboard: 45, mouse: 50 },
      { time: "13:00", keyboard: 60, mouse: 65 },
      { time: "14:00", keyboard: 35, mouse: 40 },
      { time: "15:00", keyboard: 40, mouse: 48 },
      { time: "16:00", keyboard: 55, mouse: 58 },
      { time: "17:00", keyboard: 58, mouse: 60 },
    ],
    apps: [
      { name: "Salesforce", duration: "120m", val: 120, max: 120, color: "#06b6d4" },
      { name: "Chrome", duration: "60m", val: 60, max: 120, color: "#6366f1" },
      { name: "Slack", duration: "30m", val: 30, max: 120, color: "#f59e0b" },
    ],
    websites: [
      { name: "salesforce.com", duration: "90m", val: 90, max: 90, color: "#06b6d4" },
      { name: "linkedin.com", duration: "40m", val: 40, max: 90, color: "#6366f1" },
      { name: "youtube.com", duration: "20m", val: 20, max: 90, color: "#ef4444" },
    ],
    idleTime: "15 min"
  }
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function ManagerActivity() {
  const [selectedEmp, setSelectedEmp] = useState<EmployeeActivity | null>(null);
  const [search, setSearch] = useState("");

  const filtered = activityEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  );

  // Render State 2: Detailed Activity Monitor (Matching figma image layout exactly)
  if (selectedEmp) {
    return (
      <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setSelectedEmp(null)}
                className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground transition-all flex items-center justify-center"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold tracking-tight">Activity Monitor</h2>
            </div>
            <p className="text-xs text-muted-foreground ml-9">Wednesday, June 17, 2026</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{selectedEmp.initials}</span>
              </div>
              <span className="text-xs font-semibold">{selectedEmp.name}</span>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: statusColors[selectedEmp.status].color }} />
            </div>
          </div>
        </div>

        {/* 3 Cards Metric Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Keyboard Strokes */}
          <div className="rounded-2xl p-5 border transition-all" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                <Keyboard className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-indigo-400 leading-none">{selectedEmp.keystrokes}</div>
            <div className="text-xs text-muted-foreground mt-2 font-medium">Keyboard Strokes</div>
          </div>

          {/* Card 2: Mouse Clicks */}
          <div className="rounded-2xl p-5 border transition-all" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.1)" }}>
                <MousePointerClick className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 leading-none">{selectedEmp.clicks}</div>
            <div className="text-xs text-muted-foreground mt-2 font-medium">Mouse Clicks</div>
          </div>

          {/* Card 3: Active Time */}
          <div className="rounded-2xl p-5 border transition-all" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 leading-none">{selectedEmp.activeTime}</div>
            <div className="text-xs text-muted-foreground mt-2 font-medium">Active Time</div>
          </div>
        </div>

        {/* Hourly Activity Bar Chart */}
        <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold text-sm mb-4">Hourly Activity</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={selectedEmp.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.8rem" }} />
              <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
              <Bar dataKey="keyboard" name="Keyboard" fill="#6366f1" radius={[3, 3, 0, 0]} />
              <Bar dataKey="mouse" name="Mouse" fill="#06b6d4" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Usage & Website Usage Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Usage */}
          <div className="rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="font-semibold text-sm mb-4">Application Usage</h3>
            <div className="space-y-4">
              {selectedEmp.apps.map((app, idx) => {
                const percent = (app.val / app.max) * 100;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">{app.name}</span>
                      <span className="text-indigo-400 font-bold">{app.duration}</span>
                    </div>
                    <div className="h-2 rounded-full w-full" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${percent}%`, background: app.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Website Usage */}
          <div className="rounded-2xl p-5 border flex flex-col justify-between" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div>
              <h3 className="font-semibold text-sm mb-4">Website Usage</h3>
              <div className="space-y-4">
                {selectedEmp.websites.map((web, idx) => {
                  const percent = (web.val / web.max) * 100;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-indigo-300">{web.name}</span>
                        <span className="text-cyan-400 font-bold">{web.duration}</span>
                      </div>
                      <div className="h-2 rounded-full w-full" style={{ background: "var(--muted)" }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${percent}%`, background: web.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 text-xs border-t font-semibold" style={{ borderColor: "var(--border)" }}>
              <span className="text-muted-foreground">Idle Time Today</span>
              <span className="text-amber-500 text-sm font-bold">{selectedEmp.idleTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render State 1: All Employees List
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
      {/* Top Filter and Search Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-bold text-base">Activity Directory</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employee or dept..."
            className="pl-9 pr-4 py-2 rounded-xl outline-none text-xs w-full text-foreground"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)" }}
          />
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(emp => {
          const sc = statusColors[emp.status] || { color: "#6b7280", bg: "rgba(0,0,0,0.05)" };
          return (
            <div
              key={emp.id}
              onClick={() => setSelectedEmp(emp)}
              className="rounded-2xl p-5 border cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all flex flex-col justify-between"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center relative">
                      <span className="text-white font-bold text-xs">{emp.initials}</span>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                        style={{ background: sc.color, borderColor: "var(--card)" }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{emp.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{emp.dept}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg capitalize font-bold text-[10px]"
                    style={{ background: sc.bg, color: sc.color }}>
                    {emp.status}
                  </span>
                </div>

                <div className="py-3 border-t border-b text-center" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-medium">Activity Time</span>
                    <span className="text-xs font-bold text-emerald-400">{emp.activeTime}</span>
                  </div>
                </div>
              </div>

              <button
                className="mt-4 flex items-center justify-center gap-1.5 py-2 w-full rounded-xl text-xs font-bold text-white gradient-primary hover:opacity-90 transition-all"
              >
                <Eye className="w-3.5 h-3.5" /> View Activity Detail
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
