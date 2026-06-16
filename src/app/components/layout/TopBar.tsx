import { useState } from "react";
import { Bell, Sun, Moon, Search, ChevronDown, Settings, User, LogOut, Menu } from "lucide-react";

interface TopBarProps {
  role: "admin" | "manager" | "employee";
  isDark: boolean;
  onToggleDark: () => void;
  pageTitle: string;
  onLogout: () => void;
  onToggleMobileMenu?: () => void;
}

const notifications = [
  { id: 1, type: "checkin", text: "John Doe checked in at 9:02 AM", time: "2m ago", read: false },
  { id: 2, type: "alert", text: "Screenshot captured for Emma Wilson", time: "5m ago", read: false },
  { id: 3, type: "recording", text: "Recording started by Mike Chen", time: "12m ago", read: false },
  { id: 4, type: "system", text: "System backup completed successfully", time: "1h ago", read: true },
  { id: 5, type: "alert", text: "Sarah Johnson marked as late", time: "2h ago", read: true },
];

export function TopBar({ role, isDark, onToggleDark, pageTitle, onLogout, onToggleMobileMenu }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const unread = notifications.filter(n => !n.read).length;

  const pageTitles: Record<string, string> = {
    dashboard: "Dashboard",
    employees: "Employee Management",
    live: "Live Monitoring",
    attendance: "Attendance Management",
    productivity: "Productivity Analytics",
    screenshots: "Screenshot Monitoring",
    recordings: "Recording Monitoring",
    reports: "Reports",
    notifications: "Notifications",
    settings: "Settings",
    session: "Work Session",
    activity: "Activity Monitor",
    profile: "My Profile",
  };

  return (
    <header className="flex items-center justify-between px-6 h-16 flex-shrink-0"
      style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileMenu}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 md:hidden"
          style={{ background: "var(--muted)", color: "var(--foreground)" }}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 style={{ fontWeight: 700, lineHeight: 1, fontSize: "1.1rem" }}>{pageTitles[pageTitle] || pageTitle}</h2>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "2px" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-xl outline-none"
            style={{
              background: "var(--input-background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontSize: "0.875rem",
              width: "200px",
            }}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "var(--muted)", color: "var(--foreground)" }}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 relative"
            style={{ background: "var(--muted)", color: "var(--foreground)" }}
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ fontSize: "0.6rem", background: "var(--destructive)", fontWeight: 700 }}>
                {unread}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 600 }}>Notifications</span>
                <span className="px-2 py-0.5 rounded-full text-white" style={{ fontSize: "0.7rem", background: "var(--primary)" }}>
                  {unread} new
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 flex gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ borderBottom: "1px solid var(--border)", background: n.read ? "transparent" : "rgba(99,102,241,0.04)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: n.read ? "var(--muted)" : "rgba(99,102,241,0.15)" }}>
                      <Bell className="w-4 h-4" style={{ color: n.read ? "var(--muted-foreground)" : "var(--primary)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "2px" }}>{n.time}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--primary)" }} />}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center">
                <button style={{ color: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:opacity-80"
            style={{ background: "var(--muted)" }}
          >
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                {role === "admin" ? "SA" : role === "manager" ? "AM" : "JD"}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{role === "admin" ? "Super Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 hidden md:block" style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-52 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{role === "admin" ? "Super Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  {role === "admin" ? "admin@company.com" : role === "manager" ? "manager@company.com" : "john@company.com"}
                </p>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 hover:opacity-70 transition-opacity"
                  style={{ fontSize: "0.875rem" }}>
                  <Icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  {label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 hover:opacity-70 transition-opacity"
                  style={{ fontSize: "0.875rem", color: "var(--destructive)" }}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
