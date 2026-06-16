import { useState, useEffect } from "react";
import { AuthScreens } from "./components/auth/AuthScreens";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
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
} from "./components/manager/ManagerPages";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminRoleManagement } from "./components/admin/AdminRoleManagement";
import { AdminReports } from "./components/admin/AdminReports";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";

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
  productivity: ProductivityMonitoring,
  screenshots: ScreenshotMonitoring,
  recordings: RecordingMonitoring,
  reports: Reports,
  settings: ManagerSettings,
};

const adminPages: Record<string, React.ComponentType> = {
  dashboard: AdminDashboard,
  employees: AdminRoleManagement,
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleLogin = (loginRole: Role) => {
    setRole(loginRole);
    setActivePage("dashboard");
    setAppState("app");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setActivePage("dashboard");
    setAppState("auth");
    setMobileMenuOpen(false);
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  if (appState === "auth") {
    return (
      <div className="min-h-screen bg-background">
        <AuthScreens onLogin={handleLogin} />
      </div>
    );
  }

  const pages = role === "admin" ? adminPages : role === "manager" ? managerPages : employeePages;
  const PageComponent = pages[activePage] || pages["dashboard"];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block flex-shrink-0 h-full">
        <Sidebar
          role={role}
          activePage={activePage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          isDark={isDark}
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
        />
        <main className="flex-1 overflow-hidden" style={{ background: "var(--background)" }}>
          <PageComponent activePage={activePage} />
        </main>
      </div>
    </div>
  );
}
