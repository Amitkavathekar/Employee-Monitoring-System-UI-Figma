import { useState, useEffect } from "react";
import {
  Briefcase, Calendar, Clock, Plus, Send, AlertTriangle, ChevronLeft, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface TaskQuery {
  id: string;
  description: string;
  image?: string;
  raisedAt: string;
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

export function ManagerTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("employee_tasks");
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

  // Form states
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedEmp, setAssignedEmp] = useState("John Doe");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  // Filter states
  const [filterEmployee, setFilterEmployee] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterEmployee, filterStatus, filterDate]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("employee_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle live timer ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync from localStorage if employee page updates status
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("employee_tasks");
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

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDuration) {
      toast.error("Please fill in task title and allocated duration.");
      return;
    }
    const durationHours = parseFloat(taskDuration);
    if (isNaN(durationHours) || durationHours <= 0) {
      toast.error("Duration must be a positive number.");
      return;
    }

    const assignedTime = new Date().toISOString();
    const etaDate = new Date(Date.now() + durationHours * 3600 * 1000);

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      employee: assignedEmp,
      description: taskDesc,
      assignedAt: assignedTime,
      duration: durationHours,
      eta: etaDate.toISOString(),
      status: "pending",
      timeSpent: 0,
      delayReason: ""
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    toast.success("Task assigned successfully!", {
      description: `Assigned "${taskTitle}" to ${assignedEmp} for ${durationHours} hours.`
    });
    setTaskTitle("");
    setTaskDesc("");
    setTaskDuration("");
  };

  // Filtering tasks dynamically
  const filteredTasks = tasks.filter(task => {
    const matchEmployee = filterEmployee === "All" || task.employee === filterEmployee;
    const matchStatus = filterStatus === "All" || task.status === filterStatus;
    let matchDate = true;
    if (filterDate) {
      const taskDate = new Date(task.assignedAt).toDateString();
      const filterDateObj = new Date(filterDate).toDateString();
      matchDate = taskDate === filterDateObj;
    }
    return matchEmployee && matchStatus && matchDate;
  });

  // Pagination logic
  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-h-[calc(100vh-64px)]">
      {/* Task Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        {/* Task List */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", minHeight: "450px" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <h3 style={{ fontWeight: 600 }}>Assigned Tasks Status</h3>
            </div>
            <span className="text-xs text-muted-foreground font-medium">{filteredTasks.length} visible of {tasks.length} total</span>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-4 mb-4 p-4 rounded-xl bg-muted/20 border border-border">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Filter by Employee</label>
              <select
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ colorScheme: "dark" }}
              >
                <option value="All">All Employees</option>
                <option value="John Doe">John Doe</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Mike Chen">Mike Chen</option>
                <option value="Emma Wilson">Emma Wilson</option>
                <option value="James Lee">James Lee</option>
                <option value="Priya Patel">Priya Patel</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ colorScheme: "dark" }}
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-muted-foreground">Filter by Date</label>
                {filterDate && (
                  <button
                    onClick={() => setFilterDate("")}
                    className="text-[10px] text-indigo-400 hover:underline font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[480px]">
            {currentTasks.length === 0 ? (
              <div className="text-sm text-muted-foreground p-8 text-center rounded-2xl bg-muted/10 border border-dashed border-border h-full flex items-center justify-center">
                No matching tasks found.
              </div>
            ) : (
              currentTasks.map(task => {
                const isOverdue = task.status !== "completed" && new Date() > new Date(task.eta);
                const elapsed = task.timeSpent + (task.timerStartedAt ? Math.floor((Date.now() - task.timerStartedAt) / 1000) : 0);
                const isRunning = !!task.timerStartedAt;

                let statusBadgeColor = "bg-muted text-muted-foreground";
                let statusText = "Pending";
                if (task.status === "in_progress") {
                  statusBadgeColor = "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20";
                  statusText = isRunning ? "Running" : "Paused";
                } else if (task.status === "completed") {
                  statusBadgeColor = "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
                  statusText = "Completed";
                }

                return (
                  <div key={task.id} className="p-4 rounded-xl border border-border bg-card shadow-sm hover:scale-[1.002] transition-all flex flex-col gap-2 relative overflow-hidden animate-fade-in">
                    {task.status === "in_progress" && <div className="absolute top-0 right-0 h-1 w-full gradient-accent" />}
                    {task.status === "completed" && <div className="absolute top-0 right-0 h-1 w-full gradient-success" />}

                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          {task.title}
                          {isOverdue && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 animate-pulse">
                              OVERDUE
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{task.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${statusBadgeColor}`}>
                          {statusText}
                        </span>
                        <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded text-xs font-semibold">
                          <span className="text-[10px] text-muted-foreground">Assignee:</span>
                          <span className="text-foreground">{task.employee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delay reason displayed in Manager Dashboard */}
                    {task.delayReason && (
                      <div className="p-2 rounded bg-red-500/5 border border-red-500/10 text-[11px] text-muted-foreground mt-1">
                        <span className="font-bold text-red-500 block mb-0.5">Delay Reason (reported by employee):</span>
                        {task.delayReason}
                      </div>
                    )}

                    {/* Dependency Queries list displayed in Manager Dashboard */}
                    {task.queries && task.queries.length > 0 && (
                      <div className="space-y-2 mt-1">
                        {task.queries.map((q) => (
                          <div key={q.id} className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-xs">
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold mb-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Query Raised (Dependency)</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-medium">{q.description}</p>
                            {q.image && (
                              <div className="mt-2 rounded-lg overflow-hidden border border-border bg-black/20 max-h-[120px] flex items-center justify-center">
                                <img
                                  src={q.image}
                                  alt="Query Attachment"
                                  className="max-h-[120px] w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => {
                                    const w = window.open();
                                    if (w) {
                                      w.document.write(`<img src="${q.image}" style="max-width:100%; max-height:100vh; display:block; margin:auto;" />`);
                                    }
                                  }}
                                  title="Click to view full image"
                                />
                              </div>
                            )}
                            <div className="text-[10px] text-muted-foreground mt-1.5 flex items-center justify-between">
                              <span>Raised: {new Date(q.raisedAt).toLocaleString()}</span>
                              <button
                                onClick={() => {
                                  const updated = tasks.map(t => {
                                    if (t.id === task.id) {
                                      const remainingQueries = (t.queries || []).filter(item => item.id !== q.id);
                                      const shouldResume = remainingQueries.length === 0 && t.status === "in_progress";
                                      return {
                                        ...t,
                                        queries: remainingQueries,
                                        timerStartedAt: shouldResume ? Date.now() : t.timerStartedAt
                                      };
                                    }
                                    return t;
                                  });
                                  setTasks(updated);
                                  toast.success("Query resolved by manager!");
                                }}
                                className="text-[10px] text-emerald-500 hover:underline font-bold"
                              >
                                Mark Resolved
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Assigned: {new Date(task.assignedAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                          <span>ETA: {task.duration} {task.duration === 1 ? "Hour" : "Hours"}</span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-foreground">
                          <Clock className={`w-3.5 h-3.5 text-muted-foreground ${isRunning ? "animate-pulse" : ""}`} />
                          <span>Time Spent: {formatDuration(elapsed)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border flex-wrap gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                Showing {indexOfFirstTask + 1}-{Math.min(indexOfLastTask, filteredTasks.length)} of {filteredTasks.length} tasks
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-1.5 rounded-lg border border-border text-xs hover:bg-muted/50 disabled:opacity-50 disabled:hover:bg-transparent transition-all flex items-center justify-center min-w-[32px] h-[32px] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
                    style={{
                      background: currentPage === page ? "var(--primary)" : "transparent",
                      border: currentPage === page ? "1px solid var(--primary)" : "1px solid var(--border)",
                      color: currentPage === page ? "white" : "var(--foreground)",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-1.5 rounded-lg border border-border text-xs hover:bg-muted/50 disabled:opacity-50 disabled:hover:bg-transparent transition-all flex items-center justify-center min-w-[32px] h-[32px] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Task Assign Form */}
        <div className="rounded-2xl p-5 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-500" /> Assign New Task
          </h3>
          <form onSubmit={handleAssignTask} className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Implement Login Validation"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Assign Employee</label>
                <select
                  value={assignedEmp}
                  onChange={(e) => setAssignedEmp(e.target.value)}
                  className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Mike Chen">Mike Chen</option>
                  <option value="Emma Wilson">Emma Wilson</option>
                  <option value="James Lee">James Lee</option>
                  <option value="Priya Patel">Priya Patel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                <textarea
                  placeholder="Describe the task instructions..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none h-20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">ETA</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 3.5"
                  value={taskDuration}
                  onChange={(e) => setTaskDuration(e.target.value)}
                  className="w-full text-sm p-2 rounded-lg bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 rounded-lg text-sm font-semibold gradient-primary text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4" /> Assign Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
