import { useState, useEffect } from "react";
import { AuthScreens } from "./components/auth/AuthScreens";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { Toaster, toast } from "sonner";
import { LogOut } from "lucide-react";
import { EmployeeDashboard } from "./components/employee/EmployeeDashboard";
import { EmployeeAttendance } from "./components/employee/EmployeeAttendance";
import { EmployeeTasks } from "./components/employee/EmployeeTasks";
import { ManagerTasks } from "./components/manager/ManagerTasks";
import {
  WorkSession,
  EmployeeProductivity,
  EmployeeScreenshots,
  EmployeeRecordings,
  ActivityMonitoring,
  EmployeeNotifications,
  EmployeeProfile,
} from "./components/employee/EmployeePages";
import { ManagerDashboard } from "./components/manager/ManagerDashboard";
import {
  EmployeeManagement,
  LiveMonitoring,
  AttendanceManagement,
  ProductivityMonitoring,
  ScreenshotMonitoring,
  RecordingMonitoring,
  Reports,
  NotificationsCenter,
  ManagerSettings,
  ApprovalsPage,
} from "./components/manager/ManagerPages";
import { ManagerActivity } from "./components/manager/ManagerMonitoring";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminRoleManagement } from "./components/admin/AdminRoleManagement";
import { AdminClientManagement } from "./components/admin/AdminClientManagement";
import { AdminReports } from "./components/admin/AdminReports";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";
import { AdminPolicies } from "./components/admin/AdminPolicies";

{/* MARKER-MAKE-KIT-INVOKED */}

type AppState = "auth" | "app";
type Role = "admin" | "manager" | "employee";

const employeePages: Record<string, any> = {
  dashboard: EmployeeDashboard,
  tasks: EmployeeTasks,
  attendance: EmployeeAttendance,
  productivity: EmployeeProductivity,
  profile: EmployeeProfile,
  settings: EmployeeProfile,
};

const managerPages: Record<string, React.ComponentType> = {
  dashboard: ManagerDashboard,
  tasks: ManagerTasks,
  employees: EmployeeManagement,
  attendance: AttendanceManagement,
  activity: ManagerActivity,
  screenshots: ScreenshotMonitoring,
  recordings: RecordingMonitoring,
  approvals: ApprovalsPage,
  reports: Reports,
  settings: ManagerSettings,
};

const adminPages: Record<string, React.ComponentType> = {
  dashboard: AdminDashboard,
  employees: AdminRoleManagement,
  clients: AdminClientManagement,
  policies: AdminPolicies,
  reports: AdminReports,
  analytics: AdminAnalytics,
  settings: ManagerSettings,
};

export default function App() {
  const [appState, setAppState] = useState<AppState>("auth");
  const [role, setRole] = useState<Role>("admin");
  const [activePage, setActivePage] = useState("dashboard");
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string>(() => {
    return localStorage.getItem("employeePhoto") || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
  });

  const handlePhotoChange = (newPhoto: string) => {
    setUserPhoto(newPhoto);
    localStorage.setItem("employeePhoto", newPhoto);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleLogin = (loginRole: Role) => {
    setRole(loginRole);
    setActivePage("dashboard");
    setAppState("app");
    setMobileMenuOpen(false);
    toast.success(`Welcome back! Logged in as ${loginRole === "admin" ? "Administrator" : loginRole === "manager" ? "Alex Morgan" : "John Doe"}`, {
      description: `Access to ${loginRole === "admin" ? "Admin" : loginRole === "manager" ? "Manager" : "Employee"} portal granted.`,
    });
  };

  const handleLogout = () => {
    setActivePage("dashboard");
    setAppState("auth");
    setMobileMenuOpen(false);
    toast.info("Logged out successfully", {
      description: "You have been logged out of your session.",
    });
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const pages = role === "admin" ? adminPages : role === "manager" ? managerPages : employeePages;
  const PageComponent = pages[activePage] || pages["dashboard"];

  return (
    <>
      <Toaster 
        position="top-right" 
        closeButton 
        richColors 
        theme={isDark ? "dark" : "light"} 
        style={{
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          
          "--success-bg": isDark ? "#064e3b" : "#d1fae5",
          "--success-text": isDark ? "#34d399" : "#065f46",
          "--success-border": isDark ? "#065f46" : "#a7f3d0",
          
          "--info-bg": isDark ? "#1e1b4b" : "#e0e7ff",
          "--info-text": isDark ? "#818cf8" : "#3730a3",
          "--info-border": isDark ? "#312e81" : "#c7d2fe",
          
          "--error-bg": isDark ? "#450a0a" : "#fee2e2",
          "--error-text": isDark ? "#fca5a5" : "#991b1b",
          "--error-border": isDark ? "#7f1d1d" : "#fecaca",
        } as React.CSSProperties}
      />
      {appState === "auth" ? (
        <div className="min-h-screen bg-background">
          <AuthScreens onLogin={handleLogin} />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden bg-background">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block flex-shrink-0 h-full">
            <Sidebar
              role={role}
              activePage={activePage}
              onNavigate={handleNavigate}
              onLogout={() => setShowLogoutConfirm(true)}
              isDark={isDark}
              userPhoto={role === "employee" ? userPhoto : undefined}
            />
          </div>

          {/* Sidebar (Mobile Overlay Drawer) */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileMenuOpen(false)}>
              <div className="h-full w-[240px]" onClick={e => e.stopPropagation()}>
                <Sidebar
                  role={role}
                  activePage={activePage}
                  onNavigate={(page) => { handleNavigate(page); setMobileMenuOpen(false); }}
                  onLogout={() => { setShowLogoutConfirm(true); setMobileMenuOpen(false); }}
                  isDark={isDark}
                  userPhoto={role === "employee" ? userPhoto : undefined}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <TopBar
              role={role}
              isDark={isDark}
              onToggleDark={() => setIsDark(!isDark)}
              pageTitle={activePage}
              onLogout={() => setShowLogoutConfirm(true)}
              onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
              userPhoto={role === "employee" ? userPhoto : undefined}
              onNotificationClick={(id) => {
                if (role === "manager") {
                  const saved = localStorage.getItem("manager_notifications");
                  if (saved) {
                    try {
                      const list = JSON.parse(saved);
                      const found = list.find((n: any) => n.id === id);
                      if (found && found.type === "task_approval") {
                        setActivePage("tasks");
                        setSelectedNotificationId(id);
                        return;
                      }
                    } catch (e) {}
                  }
                }
                setActivePage("dashboard");
                setSelectedNotificationId(id);
              }}
            />
            <main className="flex-1 overflow-hidden" style={{ background: "var(--background)" }}>
              <PageComponent 
                activePage={activePage} 
                role={role}
                userPhoto={role === "employee" ? userPhoto : undefined}
                onPhotoChange={role === "employee" ? handlePhotoChange : undefined}
                selectedNotificationId={selectedNotificationId}
                setSelectedNotificationId={setSelectedNotificationId}
              />
            </main>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setShowLogoutConfirm(false)}>
          <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-scale-up" style={{ background: "var(--card)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLogoutConfirm(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">✕</button>
            <div className="flex flex-col gap-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Logout</h3>
                <p className="text-xs text-muted-foreground mt-1">Are you sure you want to log out of your session?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-2 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="flex-1 px-4 py-2 rounded-xl text-white font-bold gradient-danger"
                style={{ fontSize: "0.875rem" }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
