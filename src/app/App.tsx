import { useState, useEffect } from "react";
import { AuthScreens } from "./components/auth/AuthScreens";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { Toaster, toast } from "sonner";
import { EmployeeDashboard } from "./components/employee/EmployeeDashboard";
import { EmployeeAttendance } from "./components/employee/EmployeeAttendance";
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
  attendance: EmployeeAttendance,
  productivity: EmployeeProductivity,
  profile: EmployeeProfile,
  settings: EmployeeProfile,
};

const managerPages: Record<string, React.ComponentType> = {
  dashboard: ManagerDashboard,
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
  approvals: ApprovalsPage,
  settings: ManagerSettings,
};

export default function App() {
  const [appState, setAppState] = useState<AppState>("auth");
  const [role, setRole] = useState<Role>("admin");
  const [activePage, setActivePage] = useState("dashboard");
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
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
          
          "--success-bg": "rgba(16, 185, 129, 0.12)",
          "--success-text": "#10b981",
          "--success-border": "rgba(16, 185, 129, 0.25)",
          
          "--info-bg": "rgba(99, 102, 241, 0.12)",
          "--info-text": "var(--primary)",
          "--info-border": "rgba(99, 102, 241, 0.25)",
          
          "--error-bg": "rgba(239, 68, 68, 0.12)",
          "--error-text": "#ef4444",
          "--error-border": "rgba(239, 68, 68, 0.25)",
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
              onLogout={handleLogout}
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
                  onLogout={() => { handleLogout(); setMobileMenuOpen(false); }}
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
              onLogout={handleLogout}
              onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
              userPhoto={role === "employee" ? userPhoto : undefined}
              onNotificationClick={(id) => {
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
    </>
  );
}
