import { useState } from "react";
import {
  LayoutDashboard, Users, Clock, BarChart3, Camera, Video,
  Activity, Bell, Settings, LogOut, User, FileText,
  Radio, ChevronLeft, ChevronRight, Monitor, TrendingUp, Shield,
  Globe, Laptop, CheckSquare
} from "lucide-react";

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
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "productivity", label: "Productivity", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const adminNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Role Management", icon: Users },
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
          <img src="data:image/jpeg;base64,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" alt="" />
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
        <div className={`flex items-center gap-3 p-2 rounded-xl ${collapsed ? "justify-center" : ""}`}
          style={{ background: "var(--sidebar-accent)" }}>
          {role === "employee" && userPhoto ? (
            <img src={userPhoto} alt="John Doe" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                {role === "admin" ? "SA" : role === "manager" ? "AM" : "JD"}
              </span>
            </div>
          )}
          {!collapsed && (
            <div className="overflow-hidden">
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--sidebar-foreground)", whiteSpace: "nowrap" }}>
                {role === "admin" ? "Super Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#10b981" }} />
                <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Online</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, badge, count }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`sidebar-item w-full flex items-center rounded-xl transition-all ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}`}
              style={{
                background: isActive ? "var(--sidebar-accent)" : "transparent",
                color: isActive ? "var(--sidebar-primary)" : "var(--sidebar-foreground)",
                fontWeight: isActive ? 600 : 400,
                opacity: isActive ? 1 : 0.75,
              }}
              title={collapsed ? label : undefined}
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
        })}
      </nav>

      {/* Logout */}
      <div className="p-3" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
        <button
          onClick={onLogout}
          className={`sidebar-item w-full flex items-center rounded-xl py-2.5 transition-all hover:opacity-100 ${collapsed ? "justify-center p-3" : "gap-3 px-3"}`}
          style={{ color: "var(--destructive)", opacity: 0.8 }}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
