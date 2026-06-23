import { useState, useEffect } from "react";
import { Bell, Sun, Moon, Search, ChevronDown, Settings, User, LogOut, Menu } from "lucide-react";

interface TopBarProps {
  role: "admin" | "manager" | "employee";
  isDark: boolean;
  onToggleDark: () => void;
  pageTitle: string;
  onLogout: () => void;
  onToggleMobileMenu?: () => void;
  userPhoto?: string;
  onNotificationClick?: (id: number) => void;
}

const notifications = [
  { id: 1, type: "checkin", text: "John Doe checked in at 9:02 AM", time: "2m ago", read: false },
  { id: 2, type: "alert", text: "Screenshot captured for Emma Wilson", time: "5m ago", read: false },
  { id: 3, type: "recording", text: "Recording started by Mike Chen", time: "12m ago", read: false },
  { id: 4, type: "system", text: "System backup completed successfully", time: "1h ago", read: true },
  { id: 5, type: "alert", text: "Sarah Johnson marked as late", time: "2h ago", read: true },
];

export function TopBar({ role, isDark, onToggleDark, pageTitle, onLogout, onToggleMobileMenu, userPhoto, onNotificationClick }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const [notifs, setNotifs] = useState<any[]>(() => {
    if (role === "manager") {
      const saved = localStorage.getItem("manager_notifications");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
      return [
        { id: 1, type: "checkin", text: "John Doe checked in at 9:02 AM", time: "2m ago", read: false },
        { id: 2, type: "alert", text: "Screenshot captured for Emma Wilson", time: "5m ago", read: false },
        { id: 3, type: "recording", text: "Recording started by Mike Chen", time: "12m ago", read: false },
        { id: 4, type: "system", text: "System backup completed successfully", time: "1h ago", read: true },
        { id: 5, type: "alert", text: "Sarah Johnson marked as late", time: "2h ago", read: true },
      ];
    }
    return [
      { id: 1, type: "checkin", text: "John Doe checked in at 9:02 AM", time: "2m ago", read: false },
      { id: 2, type: "alert", text: "Screenshot captured for Emma Wilson", time: "5m ago", read: false },
      { id: 3, type: "recording", text: "Recording started by Mike Chen", time: "12m ago", read: false },
      { id: 4, type: "system", text: "System backup completed successfully", time: "1h ago", read: true },
      { id: 5, type: "alert", text: "Sarah Johnson marked as late", time: "2h ago", read: true },
    ];
  });

  const unread = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handleStorage = () => {
      if (role === "manager") {
        const saved = localStorage.getItem("manager_notifications");
        if (saved) {
          try {
            setNotifs(JSON.parse(saved));
          } catch (e) {}
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 2000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [role]);

  const handleNotifClick = (nId: number) => {
    if (!onNotificationClick) return;
    setShowNotifications(false);

    if (role === "manager") {
      const updated = notifs.map(n => n.id === nId ? { ...n, read: true } : n);
      setNotifs(updated);
      localStorage.setItem("manager_notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));

      if (typeof nId !== "number" || nId > 5) {
        onNotificationClick(nId);
        return;
      }
    }
    
    if (role === "employee") {
      const mapping: Record<number, number> = {
        1: 1, // Checked In
        2: 2, // Screenshot Captured
        3: 5, // Recording Started
        4: 4, // Break Ended
        5: 3, // Break Started
      };
      onNotificationClick(mapping[nId] || nId);
    } else {
      const mapping: Record<number, number> = {
        1: 1, // John Doe Checked In
        2: 7, // Screenshot Captured
        3: 2, // Recording Started
        4: 5, // System Backup
        5: 1, // Late
      };
      onNotificationClick(mapping[nId] || nId);
    }
  };

  const pageTitles: Record<string, string> = {
    dashboard: "Dashboard",
    employees: "Employee Management",
    clients: "Client Management",
    policies: "Monitoring Policies",
    applications: "Application Monitoring",
    websites: "Website Monitoring",
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
                {notifs.map(n => (
                  <div key={n.id} 
                    onClick={() => handleNotifClick(n.id)}
                    className="px-4 py-3 flex gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ borderBottom: "1px solid var(--border)", background: n.read ? "transparent" : "rgba(99,102,241,0.04)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: n.read ? "var(--muted)" : "rgba(99,102,241,0.15)" }}>
                      <Bell className="w-4 h-4" style={{ color: n.read ? "var(--muted-foreground)" : "var(--primary)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>{n.text || n.message || n.title}</p>
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
            {role === "admin" ? (
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop" alt="Admin" className="w-7 h-7 rounded-full object-cover" />
            ) : role === "manager" ? (
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" alt="Alex Morgan" className="w-7 h-7 rounded-full object-cover" />
            ) : role === "employee" && userPhoto ? (
              <img src={userPhoto} alt="John Doe" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" alt="User" className="w-7 h-7 rounded-full object-cover" />
            )}
            <div className="hidden md:block text-left">
              <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{role === "admin" ? " Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 hidden md:block" style={{ color: "var(--muted-foreground)" }} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-52 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{role === "admin" ? " Admin" : role === "manager" ? "Alex Morgan" : "John Doe"}</p>
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
