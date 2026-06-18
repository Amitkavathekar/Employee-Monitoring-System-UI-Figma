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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi6jCN0QDCOddESDs_W2Cofjv4_6X0KVAcA&s" alt="Logo" className="w-full h-full object-cover rounded-xl" />
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
          {role === "admin" ? (
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi6jCN0QDCOddESDs_W2Cofjv4_6X0KVAcA&s" alt="Admin" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : role === "manager" ? (
            <img src="data:image/jpeg;base64,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" alt="Alex Morgan" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : role === "employee" && userPhoto ? (
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
                {role === "admin" ? "Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}
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
