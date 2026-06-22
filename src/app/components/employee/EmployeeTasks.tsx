import { useState, useEffect } from "react";
import {
  CheckCircle, Activity, Play, Clock, Briefcase, Calendar, RotateCcw, AlertTriangle
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
  status: "pending" | "in_progress" | "completed";
  timeSpent: number;
  timerStartedAt?: number;
  delayReason?: string;
  queries?: TaskQuery[];
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

  // Query raising form states
  const [activeQueryFormTaskId, setActiveQueryFormTaskId] = useState<string | null>(null);
  const [queryDesc, setQueryDesc] = useState("");
  const [queryImage, setQueryImage] = useState<string | null>(null);

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

  const endTask = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        const elapsed = t.timerStartedAt ? Math.floor((Date.now() - t.timerStartedAt) / 1000) : 0;
        return {
          ...t,
          timeSpent: t.timeSpent + elapsed,
          timerStartedAt: undefined,
          status: "completed" as const,
          completedAt: new Date().toISOString()
        };
      }
      return t;
    });
    setTasks(updated);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQueryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRaiseQuery = (taskId: string) => {
    if (!queryDesc.trim()) {
      toast.error("Please enter a query description.");
      return;
    }
    const newQuery: TaskQuery = {
      id: `q-${Date.now()}`,
      description: queryDesc,
      image: queryImage || undefined,
      raisedAt: new Date().toISOString()
    };

    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const elapsed = t.timerStartedAt ? Math.floor((Date.now() - t.timerStartedAt) / 1000) : 0;
        const existingQueries = t.queries || [];
        return {
          ...t,
          timeSpent: t.timeSpent + elapsed,
          timerStartedAt: undefined, // stop timer
          queries: [...existingQueries, newQuery]
        };
      }
      return t;
    });
    setTasks(updated);

    // Find the task title to pre-fill the mail details
    const targetTask = tasks.find(t => t.id === taskId);
    const taskTitle = targetTask ? targetTask.title : "Blocked Task";
    
    const subjectText = `Dependency Query: ${taskTitle}`;
    const bodyText = `Hi Manager,\n\nI have raised a dependency blocker query for the task: "${taskTitle}".\n\nIssue Description:\n${queryDesc}\n\n(Note: If you have uploaded a screenshot, please manually attach or paste it in this mail for sending.)\n\nThanks,\nJohn Doe`;
    
    // Open Gmail compose directly in a new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=manager@company.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmailUrl, "_blank");

    setActiveQueryFormTaskId(null);
    setQueryDesc("");
    setQueryImage(null);
    toast.success("Query saved and Gmail tab opened!");
  };

  const handleResolveQuery = (taskId: string, queryId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const updatedQueries = (t.queries || []).map(q => {
          if (q.id === queryId) {
            return {
              ...q,
              resolvedAt: new Date().toISOString()
            };
          }
          return q;
        });
        const hasUnresolved = updatedQueries.some(q => !q.resolvedAt);
        const shouldResume = !hasUnresolved;
        return {
          ...t,
          queries: updatedQueries,
          timerStartedAt: shouldResume ? Date.now() : undefined // resume timer only if no unresolved queries remain
        };
      }
      return t;
    });
    setTasks(updated);
    toast.success("Query resolved!");
  };

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
  const currentTasks = employeeTasks.filter(t => t.status === "in_progress");
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

                      {/* Delayed Reason Input ONLY if Time Spent exceeds Allocated Duration (ETA) */}
                      {isTimeOverLimit && (
                        <div className="mt-1 p-2 rounded bg-red-500/5 border border-red-500/10">
                          <label className="block text-[10px] font-bold text-red-500 mb-1">
                            Explain Delay (Why was it not completed?):
                          </label>
                          <textarea
                            placeholder="Why is it taking longer than estimated?"
                            value={task.delayReason || ""}
                            onChange={(e) => {
                              const updated = tasks.map(t => t.id === task.id ? { ...t, delayReason: e.target.value } : t);
                              setTasks(updated);
                            }}
                            className="w-full text-xs p-1.5 rounded bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-red-500 resize-none h-12"
                          />
                        </div>
                      )}

                      {/* Active / Resolved Queries List */}
                      {task.queries && task.queries.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {task.queries.map((q) => (
                            <div
                              key={q.id}
                              className={`p-2.5 rounded text-xs border animate-fade-in ${
                                q.resolvedAt
                                  ? "bg-emerald-500/5 border-emerald-500/20 text-foreground"
                                  : "bg-amber-500/10 border-amber-500/20"
                              }`}
                            >
                              <div className={`flex items-center gap-1.5 font-bold mb-1 ${q.resolvedAt ? "text-emerald-500" : "text-amber-500"}`}>
                                {q.resolvedAt ? (
                                  <CheckCircle className="w-3.5 h-3.5" />
                                ) : (
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                )}
                                <span>{q.resolvedAt ? "Query Resolved" : "Query Raised (Dependency)"}</span>
                              </div>
                              <div className={`text-[10px] mb-2 font-semibold ${q.resolvedAt ? "text-emerald-500/80" : "text-amber-500/80"}`}>
                                Raised: {new Date(q.raisedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {q.resolvedAt && ` | Resolved: ${new Date(q.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                              </div>
                              <p className="text-muted-foreground leading-relaxed font-medium">{q.description}</p>
                              {q.image && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-border bg-black/20 max-h-[100px] flex items-center justify-center">
                                  <img src={q.image} alt="Query Attachment" className="max-h-[100px] w-auto object-contain" />
                                </div>
                              )}
                              {!q.resolvedAt && (
                                <button
                                  onClick={() => handleResolveQuery(task.id, q.id)}
                                  className="mt-2 text-[10px] text-amber-500 hover:underline font-semibold"
                                >
                                  Resolve Query
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Another Query Option */}
                      {activeQueryFormTaskId === task.id ? (
                        <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border space-y-3 animate-fade-in">
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground mb-1">Attach Screenshot / Image:</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                            />
                            {queryImage && (
                              <div className="mt-2 relative rounded-lg overflow-hidden border border-border bg-black/20 max-h-[80px] flex items-center justify-center">
                                <img src={queryImage} alt="Attachment Preview" className="max-h-[80px] w-auto object-contain" />
                                <button
                                  type="button"
                                  onClick={() => setQueryImage(null)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-[9px] font-bold leading-none hover:bg-red-600"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground mb-1">Describe Dependency / Issue:</label>
                            <textarea
                              placeholder="Describe dependency or blocker..."
                              value={queryDesc}
                              onChange={(e) => setQueryDesc(e.target.value)}
                              className="w-full text-xs p-2 rounded bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none h-16"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRaiseQuery(task.id)}
                              className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold gradient-warning text-white hover:opacity-90 active:scale-95 transition-all"
                            >
                              Submit Query
                            </button>
                            <button
                              onClick={() => {
                                setActiveQueryFormTaskId(null);
                                setQueryDesc("");
                                setQueryImage(null);
                              }}
                              className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveQueryFormTaskId(task.id);
                            setQueryDesc("");
                            setQueryImage(null);
                          }}
                          className="mt-2 py-1 px-2.5 rounded-lg text-[10px] font-semibold border border-amber-500/30 text-amber-500 hover:bg-amber-500/5 active:scale-95 transition-all w-fit"
                        >
                          + Raise Dependency Query
                        </button>
                      )}

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

                  {task.delayReason && (
                    <div className="p-2 rounded bg-muted/30 border border-border text-[11px] text-muted-foreground mt-1">
                      <span className="font-bold text-red-500 block mb-0.5">Delay Explanation:</span>
                      {task.delayReason}
                    </div>
                  )}

                  {/* Completed Task Queries list */}
                  {task.queries && task.queries.length > 0 && (
                    <div className="space-y-2 mt-2 pt-2 border-t border-border/50">
                      <div className="text-[10px] font-bold text-muted-foreground mb-1">Task Queries & Blockers:</div>
                      {task.queries.map((q) => (
                        <div
                          key={q.id}
                          className={`p-2 rounded text-[11px] border ${
                            q.resolvedAt
                              ? "bg-emerald-500/5 border-emerald-500/20 text-foreground"
                              : "bg-amber-500/10 border-amber-500/20"
                          }`}
                        >
                          <div className={`flex items-center gap-1.5 font-bold mb-0.5 ${q.resolvedAt ? "text-emerald-500" : "text-amber-500"}`}>
                            {q.resolvedAt ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            <span>{q.resolvedAt ? "Query Resolved" : "Query Raised (Dependency)"}</span>
                          </div>
                          <div className={`text-[9px] mb-1 font-semibold ${q.resolvedAt ? "text-emerald-500/80" : "text-amber-500/80"}`}>
                            Raised: {new Date(q.raisedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {q.resolvedAt && ` | Resolved: ${new Date(q.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                          </div>
                          <p className="text-muted-foreground leading-normal font-medium">{q.description}</p>
                          {q.image && (
                            <div className="mt-1.5 rounded border border-border bg-black/20 max-h-[80px] flex items-center justify-center overflow-hidden">
                              <img src={q.image} alt="Query Attachment" className="max-h-[80px] w-auto object-contain" />
                            </div>
                          )}
                        </div>
                      ))}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setEndConfirmTaskId(null)}>
          <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-scale-up" style={{ background: "var(--card)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setEndConfirmTaskId(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">✕</button>
            <div className="flex flex-col gap-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>End Task</h3>
                <p className="text-xs text-muted-foreground mt-1">Are you sure you want to end this task and complete it? The timer will be stopped.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEndConfirmTaskId(null)} className="flex-1 px-4 py-2 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  endTask(endConfirmTaskId);
                  setEndConfirmTaskId(null);
                }}
                className="flex-1 px-4 py-2 rounded-xl text-white font-bold gradient-danger"
                style={{ fontSize: "0.875rem" }}
              >
                Yes, End Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
