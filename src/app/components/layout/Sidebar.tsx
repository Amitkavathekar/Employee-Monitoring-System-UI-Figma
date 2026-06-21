import { useState } from "react";
import {
  LayoutDashboard, Users, Clock, BarChart3, Camera, Video,
  Activity, Bell, Settings, LogOut, User, FileText,
  Radio, ChevronLeft, ChevronRight, Monitor, TrendingUp, Shield,
  Globe, Laptop, CheckSquare, Building, Briefcase
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";

type Role = "admin" | "manager" | "employee";

interface SidebarProps {
  role: Role;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isDark: boolean;
  userPhoto?: string;
}

const managerNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Task Tracker", icon: Briefcase },
  { id: "employees", label: "Employees", icon: Users },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "screenshots", label: "Screenshots", icon: Camera },
  { id: "recordings", label: "Recordings", icon: Video },
  { id: "approvals", label: "Approvals", icon: CheckSquare },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const employeeNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Task Tracker", icon: Briefcase },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "productivity", label: "Productivity", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const adminNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Client Management", icon: Building },
  { id: "employees", label: "Employee Management", icon: Users },
  { id: "policies", label: "Monitoring Policies", icon: Shield },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "approvals", label: "Approvals", icon: CheckSquare },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ role, activePage, onNavigate, onLogout, isDark, userPhoto }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = role === "admin" ? adminNav : role === "manager" ? managerNav : employeeNav;

  return (
    <TooltipProvider delayDuration={0}>
      <aside
      className="relative flex flex-col h-full transition-all duration-300"
      style={{
        width: collapsed ? "70px" : "240px",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 pb-3" style={{ borderBottom: "1px solid var(--sidebar-border)", height: "64px" }}>
        {/* Glowing Gradient Company Logo */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
          <img src={role === "admin" ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop" : "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=150&h=150&fit=crop"} alt="Logo" className="w-full h-full object-cover rounded-xl" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            {/* <div style={{ fontWeight: 700, fontSize: "0.825rem", color: "var(--sidebar-foreground)", lineHeight: 1.2 }} className="flex items-center gap-1.5">
              <span>Employee Monitoring</span>
              <Monitor className="w-3.5 h-3.5 text-indigo-400/80 flex-shrink-0" />
            </div> */}
            <div style={{ fontSize: "0.7rem", color: "var(--sidebar-primary)", fontWeight: 600, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {role === "admin" ? "Admin" : role === "manager" ? "Manager" : "Employee"} Portal
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
        style={{
          background: "var(--sidebar-primary)",
          border: "2px solid var(--sidebar)",
          color: "white",
        }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* User Info */}
      <div className="p-3 pt-4" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 p-2 rounded-xl justify-center cursor-pointer"
                style={{ background: "var(--sidebar-accent)" }}>
                {role === "admin" ? (
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop" alt="Admin" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                ) : role === "manager" ? (
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" alt="Alex Morgan" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                ) : role === "employee" && userPhoto ? (
                  <img src={userPhoto} alt="John Doe" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="font-semibold text-xs">{role === "admin" ? "Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}</div>
              <div className="text-[10px] opacity-80 capitalize">{role}</div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-xl"
            style={{ background: "var(--sidebar-accent)" }}>
            {role === "admin" ? (
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop" alt="Admin" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : role === "manager" ? (
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" alt="Alex Morgan" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : role === "employee" && userPhoto ? (
              <img src={userPhoto} alt="John Doe" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            )}
            <div className="overflow-hidden">
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--sidebar-foreground)", whiteSpace: "nowrap" }}>
                {role === "admin" ? "Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#10b981" }} />
                <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Online</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, badge, count }) => {
          const isActive = activePage === id;
          const buttonContent = (
            <button
              onClick={() => onNavigate(id)}
              className={`sidebar-item w-full flex items-center rounded-xl transition-all ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}`}
              style={{
                background: isActive ? "var(--sidebar-accent)" : "transparent",
                color: isActive ? "var(--sidebar-primary)" : "var(--sidebar-foreground)",
                fontWeight: isActive ? 600 : 400,
                opacity: isActive ? 1 : 0.75,
              }}
            >
              <div className="relative flex-shrink-0">
                <Icon className="w-5 h-5" />
                {badge && !collapsed && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-white animate-pulse-dot"
                    style={{ fontSize: "0.6rem", background: "#ef4444", fontWeight: 700 }}>
                    {badge}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span style={{ fontSize: "0.875rem", flex: 1, textAlign: "left" }}>{label}</span>
              )}
              {!collapsed && count && (
                <span className="px-1.5 py-0.5 rounded-full text-white"
                  style={{ fontSize: "0.7rem", background: "var(--primary)", fontWeight: 600 }}>
                  {count}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="w-1 h-6 rounded-full" style={{ background: "var(--sidebar-primary)" }} />
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  {buttonContent}
                </TooltipTrigger>
                <TooltipContent side="right">
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <div key={id}>
              {buttonContent}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onLogout}
                className="sidebar-item w-full flex items-center rounded-xl py-2.5 transition-all hover:opacity-100 justify-center p-3"
                style={{ color: "var(--destructive)", opacity: 0.8 }}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Logout
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={onLogout}
            className="sidebar-item w-full flex items-center rounded-xl py-2.5 transition-all hover:opacity-100 gap-3 px-3"
            style={{ color: "var(--destructive)", opacity: 0.8 }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Logout</span>
          </button>
        )}
      </div>
    </aside>
  </TooltipProvider>
  );
}
