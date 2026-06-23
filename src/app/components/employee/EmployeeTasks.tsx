import { useState, useEffect } from "react";
import {
  CheckCircle, Activity, Play, Clock, Briefcase, Calendar, RotateCcw
} from "lucide-react";
import { toast } from "sonner";

interface TaskQuery {
  id: string;
  description: string;
  image?: string;
  raisedAt: string;
  resolvedAt?: string;
}

interface Task {
  id: string;
  title: string;
  employee: string;
  description: string;
  assignedAt: string;
  duration: number;
  eta: string;
  status: "pending" | "in_progress" | "completed" | "completed_pending_approval";
  timeSpent: number;
  timerStartedAt?: number;
  delayReason?: string;
  queries?: TaskQuery[];
  completionComment?: string;
}

const DEFAULT_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Implement Login Validation",
    employee: "John Doe",
    description: "Add client-side form validation for email and password fields.",
    assignedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    duration: 3,
    eta: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    status: "in_progress",
    timeSpent: 300,
    timerStartedAt: Date.now() - 300 * 1000,
    delayReason: ""
  },
  {
    id: "task-2",
    title: "Design System Integration",
    employee: "John Doe",
    description: "Incorporate the updated figma-tailored tokens into index.css.",
    assignedAt: new Date(Date.now() - 1800 * 1000).toISOString(),
    duration: 5,
    eta: new Date(Date.now() + 4.5 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-3",
    title: "Database Indexing",
    employee: "John Doe",
    description: "Optimize database queries by adding indexes to employee search columns.",
    assignedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    duration: 2,
    eta: new Date(Date.now() - 3600 * 1000).toISOString(), // Overdue
    status: "in_progress",
    timeSpent: 1200,
    timerStartedAt: Date.now() - 600 * 1000,
    delayReason: ""
  },
  {
    id: "task-4",
    title: "Fix Sidebar Navigation Bug",
    employee: "John Doe",
    description: "Sidebar was not collapsing properly on mobile screens.",
    assignedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    duration: 2,
    eta: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 1800,
    delayReason: "Faced some issues with CSS media queries mismatch."
  },
  {
    id: "task-5",
    title: "Write API Documentation",
    employee: "John Doe",
    description: "Document endpoints for login, auth, and employee monitoring metrics.",
    assignedAt: new Date(Date.now() - 10000).toISOString(),
    duration: 8,
    eta: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-6",
    title: "Refactor Auth Middleware",
    employee: "John Doe",
    description: "Improve route protection by cleaning up session validation middleware.",
    assignedAt: new Date().toISOString(),
    duration: 24,
    eta: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-7",
    title: "UI Polish - Dark Mode Toggle",
    employee: "John Doe",
    description: "Fix color contrast anomalies in dark mode for sidebar labels.",
    assignedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    duration: 2,
    eta: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 2400,
    delayReason: "Debugging local style overrides took longer than expected."
  },
  {
    id: "task-8",
    title: "Unit Tests for WorkSession",
    employee: "John Doe",
    description: "Add unit tests verifying timer calculation and local storage saving.",
    assignedAt: new Date().toISOString(),
    duration: 12,
    eta: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-9",
    title: "Setup Sonner Toast System",
    employee: "John Doe",
    description: "Integrate rich notifications for success/error handling across UI portals.",
    assignedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    duration: 4,
    eta: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 3600,
    delayReason: ""
  },
  {
    id: "task-10",
    title: "Optimize SVG Icons Bundle",
    employee: "John Doe",
    description: "Replace heavy custom icons with optimized Lucide SVG components.",
    assignedAt: new Date().toISOString(),
    duration: 3,
    eta: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-16",
    title: "Configure SMTP Mailer",
    employee: "John Doe",
    description: "Setup SMTP credentials and test contact form submissions for email query alerts.",
    assignedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // Yesterday
    duration: 4,
    eta: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 3600,
    delayReason: ""
  },
  {
    id: "task-17",
    title: "Tailwind Configuration Polish",
    employee: "John Doe",
    description: "Standardize spacing and font sizing utility classes across dynamic widgets.",
    assignedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // Yesterday
    duration: 2,
    eta: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 1800,
    delayReason: ""
  },
  {
    id: "task-18",
    title: "API Error Handling Middleware",
    employee: "John Doe",
    description: "Create a global error handling middleware to gracefully respond to invalid requests.",
    assignedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // 2 days ago
    duration: 3,
    eta: new Date(Date.now() - 45 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 7200,
    delayReason: "Encountered circular dependency in middleware routing logs."
  },
  {
    id: "task-19",
    title: "Figma Token Auto-Exporter",
    employee: "John Doe",
    description: "Develop a node script to fetch styles directly from Figma design API.",
    assignedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // 2 days ago
    duration: 6,
    eta: new Date(Date.now() - 42 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 5400,
    delayReason: ""
  },
  {
    id: "task-20",
    title: "Draft Security Policy Guidelines",
    employee: "John Doe",
    description: "Write guidelines on handling sensitive metadata in local storage and cookies.",
    assignedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
    duration: 4,
    eta: new Date(Date.now() - 68 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 2800,
    delayReason: ""
  },
  {
    id: "task-21",
    title: "Fix Toast Alert Layout",
    employee: "John Doe",
    description: "Resolve stacking order overlap where toast messages appeared under floating modals.",
    assignedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
    duration: 1,
    eta: new Date(Date.now() - 71 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 1200,
    delayReason: ""
  },
  {
    id: "task-22",
    title: "Webpack/Vite Optimizations",
    employee: "John Doe",
    description: "Configure code splitting and route lazy loading to improve initial load speeds.",
    assignedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(), // 4 days ago
    duration: 8,
    eta: new Date(Date.now() - 88 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 10800,
    delayReason: "Optimizing media resources took longer than planned."
  },
  {
    id: "task-23",
    title: "Prettier & ESLint Configuration",
    employee: "John Doe",
    description: "Standardize syntax format formatting and code styling checkers.",
    assignedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(), // 4 days ago
    duration: 2,
    eta: new Date(Date.now() - 94 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 2200,
    delayReason: ""
  },
  {
    id: "task-24",
    title: "Setup Vitest Framework",
    employee: "John Doe",
    description: "Configure test suite settings and mock environment configurations.",
    assignedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), // 5 days ago
    duration: 5,
    eta: new Date(Date.now() - 115 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 4000,
    delayReason: ""
  },
  {
    id: "task-25",
    title: "Sanitize Input Form Fields",
    employee: "John Doe",
    description: "Write sanitize functions to filter special characters from text fields.",
    assignedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), // 5 days ago
    duration: 3,
    eta: new Date(Date.now() - 117 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 3000,
    delayReason: ""
  },
  {
    id: "task-11",
    title: "Design Landing Page Mockup",
    employee: "Mike Chen",
    description: "Create high-fidelity Figma mockups for the landing page hero section.",
    assignedAt: new Date().toISOString(),
    duration: 18,
    eta: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-12",
    title: "Frontend Theme Customization",
    employee: "Mike Chen",
    description: "Build custom dashboard cards incorporating glassmorphism styling guidelines.",
    assignedAt: new Date(Date.now() - 1800 * 1000).toISOString(),
    duration: 2,
    eta: new Date(Date.now() + 1.5 * 3600 * 1000).toISOString(),
    status: "in_progress",
    timeSpent: 1800,
    timerStartedAt: Date.now() - 1800 * 1000,
    delayReason: ""
  },
  {
    id: "task-13",
    title: "Client Onboarding Flow",
    employee: "Sarah Johnson",
    description: "Create multi-step modal form for adding and verifying client credentials.",
    assignedAt: new Date().toISOString(),
    duration: 36,
    eta: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    status: "pending",
    timeSpent: 0,
    delayReason: ""
  },
  {
    id: "task-14",
    title: "Setup Firebase Hosting",
    employee: "Sarah Johnson",
    description: "Deploy client app and setup SSL certificates with domain mapping.",
    assignedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    duration: 3,
    eta: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: "completed",
    timeSpent: 4500,
    delayReason: ""
  },
  {
    id: "task-15",
    title: "Add Client Activity Charts",
    employee: "Emma Wilson",
    description: "Incorporate Recharts BarChart displaying live screenshot quotas.",
    assignedAt: new Date(Date.now() - 900 * 1000).toISOString(),
    duration: 6,
    eta: new Date(Date.now() + 5.75 * 3600 * 1000).toISOString(),
    status: "in_progress",
    timeSpent: 900,
    timerStartedAt: Date.now() - 900 * 1000,
    delayReason: ""
  }
];

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h > 0 ? String(h).padStart(2, '0') : null,
    String(m).padStart(2, '0'),
    String(s).padStart(2, '0')
  ].filter(Boolean).join(':');
}

export function EmployeeTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("employee_tasks_v3");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10 && parsed.every(p => p.assignedAt)) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_TASKS;
  });

  const [tick, setTick] = useState(0);
  const [filterDate, setFilterDate] = useState("");

  // Confirmation popup states
  const [startConfirmTaskId, setStartConfirmTaskId] = useState<string | null>(null);
  const [endConfirmTaskId, setEndConfirmTaskId] = useState<string | null>(null);
  const [endTaskComment, setEndTaskComment] = useState("");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("employee_tasks_v3", JSON.stringify(tasks));
  }, [tasks]);

  // Handle live timer ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync from localStorage if other roles make changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("employee_tasks_v3");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 10 && parsed.every(p => p.assignedAt)) {
            setTasks(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    const pollInterval = setInterval(handleStorageChange, 2000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

  const startTask = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: "in_progress" as const,
          timerStartedAt: Date.now()
        };
      }
      return t;
    });
    setTasks(updated);
  };

  const submitEndTask = (id: string, comment: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        const elapsed = t.timerStartedAt ? Math.floor((Date.now() - t.timerStartedAt) / 1000) : 0;
        return {
          ...t,
          timeSpent: t.timeSpent + elapsed,
          timerStartedAt: undefined,
          status: "completed_pending_approval" as const,
          completedAt: new Date().toISOString(),
          completionComment: comment
        };
      }
      return t;
    });
    setTasks(updated);

    // Create a new notification for the manager
    const targetTask = tasks.find(t => t.id === id);
    const taskTitle = targetTask ? targetTask.title : "Task";

    const newNotif = {
      id: Date.now(),
      title: "Task Approval Request",
      message: `John Doe completed task "${taskTitle}" with comment: "${comment}"`,
      time: "Just now",
      type: "task_approval",
      taskId: id,
      read: false
    };

    const savedNotifs = localStorage.getItem("manager_notifications");
    let notifList = [];
    if (savedNotifs) {
      try {
        notifList = JSON.parse(savedNotifs);
      } catch (e) {}
    }
    localStorage.setItem("manager_notifications", JSON.stringify([newNotif, ...notifList]));
    window.dispatchEvent(new Event("storage"));

    toast.success("Task ended and submitted to manager for approval!");
  };

  const undoTask = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: "in_progress" as const,
          timerStartedAt: Date.now() // start running immediately when undone
        };
      }
      return t;
    });
    setTasks(updated);
  };

  // handleResolveQuery removed from employee module as requested.

  // Filter tasks for John Doe
  const employeeTasks = tasks.filter(t => {
    const isJohn = t.employee === "John Doe";
    if (!isJohn) return false;
    if (filterDate) {
      const taskDate = new Date(t.assignedAt).toDateString();
      const filterDateObj = new Date(filterDate).toDateString();
      return taskDate === filterDateObj;
    }
    return true;
  });
  const futureTasks = employeeTasks.filter(t => t.status === "pending");
  const currentTasks = employeeTasks.filter(t => t.status === "in_progress" || t.status === "completed_pending_approval");
  const completedTasks = employeeTasks.filter(t => t.status === "completed");

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-h-[calc(100vh-64px)]">
      {/* Task Tracker Section */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-border flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            <h3 style={{ fontWeight: 600 }}>Task Tracker (Assigned to You)</h3>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-muted-foreground">Filter by Date:</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="text-xs p-1.5 rounded bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                style={{ colorScheme: "dark" }}
              />
              {filterDate && (
                <button
                  onClick={() => setFilterDate("")}
                  className="text-xs text-indigo-400 hover:underline font-semibold ml-1"
                >
                  Clear
                </button>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium border-l border-border pl-4">
              Logged in as John Doe
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Future Tasks */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Future Tasks ({futureTasks.length})
            </h4>
            <div className="space-y-3 overflow-y-auto max-h-[450px] pr-1">
              {futureTasks.length === 0 ? (
                <div className="text-xs text-muted-foreground p-4 text-center rounded-xl bg-muted/20 border border-dashed border-border">
                  No future tasks assigned.
                </div>
              ) : (
                futureTasks.map(task => (
                  <div key={task.id} className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2 shadow-sm animate-fade-in">
                    <div className="font-semibold text-sm">{task.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{task.description}</div>
                    <div className="text-[11px] text-muted-foreground">
                      Assigned: {new Date(task.assignedAt).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-indigo-500 font-semibold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 w-fit">
                      ETA: {task.duration} {task.duration === 1 ? "Hour" : "Hours"}
                    </div>
                    <button
                      onClick={() => setStartConfirmTaskId(task.id)}
                      className="mt-1 w-full py-1.5 px-3 rounded-lg text-xs font-semibold gradient-success text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Task
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Current Tasks */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className="text-sm font-semibold mb-3 text-cyan-500 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Current Tasks ({currentTasks.length})
            </h4>
            <div className="space-y-3 overflow-y-auto max-h-[450px] pr-1">
              {currentTasks.length === 0 ? (
                <div className="text-xs text-muted-foreground p-4 text-center rounded-xl bg-muted/20 border border-dashed border-border">
                  No active tasks.
                </div>
              ) : (
                currentTasks.map(task => {
                  if (task.status === "completed_pending_approval") {
                    return (
                      <div key={task.id} className="p-4 rounded-xl border border-amber-500/20 bg-card flex flex-col gap-2 shadow-sm relative overflow-hidden animate-fade-in">
                        <div className="absolute top-0 right-0 h-1 w-full bg-amber-500" />
                        <div className="font-semibold text-sm flex items-center justify-between">
                          {task.title}
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            PENDING APPROVAL
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{task.description}</div>
                        
                        {task.completionComment && (
                          <div className="p-2 rounded bg-muted/30 border border-border text-[11px] text-muted-foreground mt-1">
                            <span className="font-bold text-indigo-400 block mb-0.5">Submitted Comment:</span>
                            {task.completionComment}
                          </div>
                        )}

                        <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-border">
                          <div className="text-[11px] text-muted-foreground">
                            Assigned: {new Date(task.assignedAt).toLocaleString()}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-indigo-500 font-semibold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                              ETA: {task.duration} {task.duration === 1 ? "Hour" : "Hours"}
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/5 px-2 py-1 rounded-lg border border-amber-500/10">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Time Spent: {formatDuration(task.timeSpent)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <button
                            disabled
                            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center gap-1.5 cursor-not-allowed"
                          >
                            <Clock className="w-3.5 h-3.5" /> Approval Request Sent to Manager
                          </button>
                        </div>
                      </div>
                    );
                  }

                  const elapsed = task.timeSpent + (task.timerStartedAt ? Math.floor((Date.now() - task.timerStartedAt) / 1000) : 0);
                  const isRunning = !!task.timerStartedAt;
                  const durationInSeconds = task.duration * 3600;
                  const isTimeOverLimit = elapsed > durationInSeconds;

                  return (
                    <div key={task.id} className="p-4 rounded-xl border border-cyan-500/20 bg-card flex flex-col gap-2 shadow-sm relative overflow-hidden animate-fade-in">
                      <div className="absolute top-0 right-0 h-1 w-full gradient-accent" />
                      <div className="font-semibold text-sm flex items-center justify-between">
                        {task.title}
                        {isTimeOverLimit && (
                          <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 animate-pulse">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{task.description}</div>

                      <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-border">
                        <div className="text-[11px] text-muted-foreground">
                          Assigned: {new Date(task.assignedAt).toLocaleString()}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] text-indigo-500 font-semibold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                            ETA: {task.duration} {task.duration === 1 ? "Hour" : "Hours"}
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-cyan-500 bg-cyan-500/5 px-2 py-1 rounded-lg border border-cyan-500/10">
                            <Clock className={`w-3.5 h-3.5 ${isRunning ? "animate-pulse text-cyan-400" : ""}`} />
                            <span>{formatDuration(elapsed)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1">
                        <button
                          onClick={() => setEndConfirmTaskId(task.id)}
                          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold gradient-danger text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> End Task
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col">
          <h4 className="text-sm font-semibold mb-4 text-emerald-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Completed Tasks ({completedTasks.length})
          </h4>
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[500px] pr-1 w-full">
            {completedTasks.length === 0 ? (
              <div className="text-xs text-muted-foreground p-4 text-center rounded-xl bg-muted/20 border border-dashed border-border w-full">
                No completed tasks.
              </div>
            ) : (
              completedTasks.map(task => (
                <div key={task.id} className="p-4 rounded-xl border border-emerald-500/20 bg-card flex flex-col gap-1.5 shadow-sm relative overflow-hidden animate-fade-in flex-grow flex-shrink-0 min-w-[280px] md:min-w-[320px] max-w-full lg:flex-1">
                  <div className="absolute top-0 right-0 h-1 w-full gradient-success" />
                  <div className="font-semibold text-sm text-emerald-500 flex items-center justify-between">
                    {task.title}
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                      DONE
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed flex-1">{task.description}</div>

                  {task.completionComment && (
                    <div className="p-2 rounded bg-muted/30 border border-border text-[11px] text-muted-foreground mt-1">
                      <span className="font-bold text-indigo-400 block mb-0.5">Completion Comment:</span>
                      {task.completionComment}
                    </div>
                  )}



                  <div className="text-[10px] text-muted-foreground mt-1 pt-2 border-t border-border/50">
                    Time Spent: <span className="font-bold text-emerald-500">{formatDuration(task.timeSpent)}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Assigned: {new Date(task.assignedAt).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-indigo-500 font-semibold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 w-fit">
                    ETA: {task.duration} {task.duration === 1 ? "Hour" : "Hours"}
                  </div>
                  <button
                    onClick={() => undoTask(task.id)}
                    className="mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-border"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" /> Undo Task
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Start Task Confirmation Modal */}
      {startConfirmTaskId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setStartConfirmTaskId(null)}>
          <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-scale-up" style={{ background: "var(--card)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setStartConfirmTaskId(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">✕</button>
            <div className="flex flex-col gap-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-indigo-500/10 text-indigo-500">
                <Play className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Start Task</h3>
                <p className="text-xs text-muted-foreground mt-1">Are you sure you want to start this task? The timer will begin immediately.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStartConfirmTaskId(null)} className="flex-1 px-4 py-2 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  startTask(startConfirmTaskId);
                  setStartConfirmTaskId(null);
                }}
                className="flex-1 px-4 py-2 rounded-xl text-white font-bold gradient-success"
                style={{ fontSize: "0.875rem" }}
              >
                Yes, Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Task Confirmation Modal */}
      {endConfirmTaskId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => { setEndConfirmTaskId(null); setEndTaskComment(""); }}>
          <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-scale-up" style={{ background: "var(--card)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setEndConfirmTaskId(null); setEndTaskComment(""); }} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">✕</button>
            <div className="flex flex-col gap-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>End Task</h3>
                <p className="text-xs text-muted-foreground mt-1">Please enter a completion comment. This comment is mandatory to end the task and request approval.</p>
              </div>
              <div className="text-left mt-2">
                <label className="block text-[10px] font-bold text-muted-foreground mb-1">Completion Comment:</label>
                <textarea
                  placeholder="Describe what was accomplished..."
                  value={endTaskComment}
                  onChange={(e) => setEndTaskComment(e.target.value)}
                  className="w-full text-xs p-2 rounded bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none h-20"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setEndConfirmTaskId(null); setEndTaskComment(""); }} className="flex-1 px-4 py-2 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!endTaskComment.trim()) {
                    toast.error("Please enter a completion comment to end the task.");
                    return;
                  }
                  submitEndTask(endConfirmTaskId, endTaskComment);
                  setEndConfirmTaskId(null);
                  setEndTaskComment("");
                }}
                className="flex-1 px-4 py-2 rounded-xl text-white font-bold gradient-danger"
                style={{ fontSize: "0.875rem" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
