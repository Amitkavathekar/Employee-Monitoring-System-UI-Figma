import { useState } from "react";
import {
  Camera, Globe, Clock, Activity, Bell, Shield, ChevronDown, ChevronUp,
  Search, Plus, RotateCcw, Save, Check, X, ShieldAlert, Laptop
} from "lucide-react";

interface Policy {
  id: string;
  title: string;
  description: string;
  icon: "Camera" | "Globe" | "Clock" | "Activity" | "Bell" | "Shield";
  departments: string;
  targetRole?: "Manager" | "Employee" | "All Roles";
  enabled: boolean;
  
  // Work Schedule Policies
  workingHoursStart?: string;
  workingHoursEnd?: string;
  breakDuration?: string;
  overtimeEnabled?: boolean;
  overtimeRules?: string;

  // Productivity Policies
  idleThreshold?: string;
  productivityGoals?: string;
  minDailyHours?: string;

  // Application Policies
  allowedApps?: string[];
  restrictedApps?: string[];

  // Website Policies
  allowedWebsites?: string[];
  blockedWebsites?: string[];

  // Screenshot Policies
  screenshotInterval?: string;
  screenRecordingSettings?: string;

  // Notifications & Alerts
  inactivityAlertsEnabled?: boolean;
  lateLoginAlertsEnabled?: boolean;
  overtimeAlertsEnabled?: boolean;
}

const initialPolicies: Policy[] = [
  {
    id: "work-schedule",
    title: "Work Schedule Policies",
    description: "Configure working hours, break durations, and overtime rules",
    icon: "Clock",
    departments: "All Departments",
    targetRole: "All Roles",
    enabled: true,
    workingHoursStart: "09:00 AM",
    workingHoursEnd: "06:00 PM",
    breakDuration: "60 minutes",
    overtimeEnabled: true,
    overtimeRules: "Pre-approved overtime only",
  },
  {
    id: "productivity",
    title: "Productivity Policies",
    description: "Configure idle thresholds, productivity goals, and minimum daily hours",
    icon: "Activity",
    departments: "All Departments",
    targetRole: "Employee",
    enabled: true,
    idleThreshold: "10 minutes",
    productivityGoals: "80% Focus",
    minDailyHours: "8 hours",
  },
  {
    id: "application",
    title: "Application Policies",
    description: "Configure allowed and restricted application lists",
    icon: "Shield",
    departments: "Engineering, Design",
    targetRole: "Employee",
    enabled: true,
    allowedApps: ["VS Code", "Slack", "Figma", "Chrome", "Git", "Terminal"],
    restrictedApps: ["Steam", "Epic Games", "Netflix", "Spotify", "Roblox"],
  },
  {
    id: "website",
    title: "Website Policies",
    description: "Configure allowed and blocked website domains",
    icon: "Globe",
    departments: "All Departments",
    targetRole: "Employee",
    enabled: true,
    allowedWebsites: ["github.com", "stackoverflow.com", "google.com", "jira.com", "meet.google.com"],
    blockedWebsites: ["facebook.com", "youtube.com", "twitter.com", "reddit.com", "instagram.com"],
  },
  {
    id: "screenshot",
    title: "Screenshot Policies",
    description: "Configure screenshot intervals and screen recording settings",
    icon: "Camera",
    departments: "Engineering, Marketing",
    targetRole: "Employee",
    enabled: false,
    screenshotInterval: "Every 5 minutes",
    screenRecordingSettings: "Record on Active Window",
  },
  {
    id: "notifications-alerts",
    title: "Notifications & Alerts",
    description: "Configure inactivity, late login, and overtime alert rules",
    icon: "Bell",
    departments: "All Departments",
    targetRole: "All Roles",
    enabled: true,
    inactivityAlertsEnabled: true,
    lateLoginAlertsEnabled: true,
    overtimeAlertsEnabled: false,
  }
];

const defaultSettings: Record<string, Partial<Policy>> = {
  "work-schedule": {
    workingHoursStart: "09:00 AM",
    workingHoursEnd: "05:00 PM",
    breakDuration: "60 minutes",
    overtimeEnabled: true,
    overtimeRules: "Pre-approved overtime only",
  },
  productivity: {
    idleThreshold: "10 minutes",
    productivityGoals: "80% Focus",
    minDailyHours: "8 hours",
  },
  application: {
    allowedApps: ["VS Code", "Slack", "Chrome"],
    restrictedApps: ["Steam", "Netflix"],
  },
  website: {
    allowedWebsites: ["github.com", "google.com"],
    blockedWebsites: ["facebook.com", "youtube.com"],
  },
  screenshot: {
    screenshotInterval: "Every 5 minutes",
    screenRecordingSettings: "Record on Active Window",
  },
  "notifications-alerts": {
    inactivityAlertsEnabled: true,
    lateLoginAlertsEnabled: true,
    overtimeAlertsEnabled: true,
  }
};

const iconMap = {
  Camera: Camera,
  Globe: Globe,
  Clock: Clock,
  Activity: Activity,
  Bell: Bell,
  Shield: Shield,
};

export function AdminPolicies() {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("work-schedule");
  const [showModal, setShowModal] = useState(false);
  
  // Custom Draft/Edit State for the expanded policy
  const [draftSettings, setDraftSettings] = useState<Partial<Policy>>({});
  
  // Modal State
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDept, setNewDept] = useState("All Departments");
  const [newTargetRole, setNewTargetRole] = useState<"Manager" | "Employee" | "All Roles">("All Roles");
  const [newIcon, setNewIcon] = useState<"Camera" | "Globe" | "Clock" | "Activity" | "Bell" | "Shield">("Shield");
  const [newEnabled, setNewEnabled] = useState(true);

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "info" }>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleToggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setDraftSettings({});
    } else {
      setExpandedId(id);
      const policy = policies.find(p => p.id === id);
      if (policy) {
        setDraftSettings({ ...policy });
      }
    }
  };

  const handleTogglePolicyStatus = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPolicies(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextState = !p.enabled;
          showToast(`Policy "${p.title}" ${nextState ? "Enabled" : "Disabled"} successfully.`, "info");
          return { ...p, enabled: nextState };
        }
        return p;
      })
    );
  };

  const handleSaveSettings = (id: string) => {
    setPolicies(prev =>
      prev.map(p => {
        if (p.id === id) {
          showToast(`Saved updates for "${p.title}" policy!`);
          return { ...p, ...draftSettings } as Policy;
        }
        return p;
      })
    );
  };

  const handleResetSettings = (id: string) => {
    const defaults = defaultSettings[id] || {};
    setDraftSettings(prev => ({
      ...prev,
      ...defaults,
    }));
    showToast(`Reset "${policies.find(p => p.id === id)?.title}" settings to defaults.`, "info");
  };

  const handleCreatePolicy = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast("Please fill out all fields", "info");
      return;
    }

    const newPolicy: Policy = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      icon: newIcon,
      departments: newDept,
      targetRole: newTargetRole,
      enabled: newEnabled,
      // Default configurations
      workingHoursStart: newIcon === "Clock" ? "09:00 AM" : undefined,
      workingHoursEnd: newIcon === "Clock" ? "05:00 PM" : undefined,
      breakDuration: newIcon === "Clock" ? "60 minutes" : undefined,
      overtimeEnabled: newIcon === "Clock" ? true : undefined,
      idleThreshold: newIcon === "Activity" ? "10 minutes" : undefined,
      productivityGoals: newIcon === "Activity" ? "80% Focus" : undefined,
      minDailyHours: newIcon === "Activity" ? "8 hours" : undefined,
      allowedApps: newIcon === "Shield" ? ["VS Code", "Slack"] : undefined,
      restrictedApps: newIcon === "Shield" ? ["Steam"] : undefined,
      allowedWebsites: newIcon === "Globe" ? ["github.com"] : undefined,
      blockedWebsites: newIcon === "Globe" ? ["youtube.com"] : undefined,
      screenshotInterval: newIcon === "Camera" ? "Every 5 minutes" : undefined,
      screenRecordingSettings: newIcon === "Camera" ? "Record on Active Window" : undefined,
      inactivityAlertsEnabled: newIcon === "Bell" ? true : undefined,
      lateLoginAlertsEnabled: newIcon === "Bell" ? true : undefined,
      overtimeAlertsEnabled: newIcon === "Bell" ? false : undefined,
    };

    setPolicies(prev => [...prev, newPolicy]);
    setShowModal(false);
    showToast(`Policy "${newTitle}" created successfully!`);

    setNewTitle("");
    setNewDescription("");
    setNewDept("All Departments");
    setNewTargetRole("All Roles");
    setNewIcon("Shield");
    setNewEnabled(true);
  };

  // Text inputs helpers for app/website lists
  const handleListChange = (key: "allowedApps" | "restrictedApps" | "allowedWebsites" | "blockedWebsites", value: string) => {
    const list = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
    setDraftSettings(prev => ({ ...prev, [key]: list }));
  };

  // Compute stats dynamically
  const activeCount = policies.filter(p => p.enabled).length;
  const inactiveCount = policies.filter(p => !p.enabled).length;
  const deptCount = 6;

  // Filter policies based on search
  const filteredPolicies = policies.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.departments.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground animate-fade-in" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Monitoring Policies</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Configure schedules, application bounds, website limits, screenshots, and alert triggers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search policies..."
              className="pl-9 pr-4 py-2 rounded-xl outline-none"
              style={{
                background: "var(--input-background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "0.85rem",
                width: "200px"
              }}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all hover:opacity-90 active:scale-95"
            style={{ fontSize: "0.85rem" }}
          >
            <Plus className="w-4 h-4" /> New Policy
          </button>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl flex-shrink-0"
               style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>
            {activeCount}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Active Policies</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)" }}>Running System Rules</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl flex-shrink-0"
               style={{ background: "rgba(156,163,175,0.15)", color: "var(--muted-foreground)" }}>
            {inactiveCount}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Inactive Policies</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)" }}>Currently Paused</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl flex-shrink-0"
               style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary)" }}>
            {deptCount}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Policy Categories</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)" }}>Global Control Scope</div>
          </div>
        </div>
      </div>

      {/* Accordion Policy List */}
      <div className="space-y-4">
        {filteredPolicies.map(policy => {
          const IconComponent = iconMap[policy.icon] || Shield;
          const isExpanded = expandedId === policy.id;

          return (
            <div
              key={policy.id}
              className="rounded-2xl transition-all"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: isExpanded ? "0 4px 20px -2px rgba(0,0,0,0.15)" : "none"
              }}
            >
              {/* Card Header Row */}
              <div
                onClick={() => handleToggleExpand(policy.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none gap-4 flex-wrap sm:flex-nowrap"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: "var(--muted)", color: "var(--primary)", border: "1px solid var(--border)" }}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)" }}>{policy.title}</h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{policy.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto sm:ml-0 flex-shrink-0">
                  <span className="hidden md:inline" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {policy.departments}
                  </span>

                  <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold border"
                    style={{
                      background: policy.targetRole === "Manager" ? "rgba(99,102,241,0.1)" : policy.targetRole === "Employee" ? "rgba(6,182,212,0.1)" : "rgba(107,114,128,0.1)",
                      color: policy.targetRole === "Manager" ? "#6366f1" : policy.targetRole === "Employee" ? "#06b6d4" : "var(--muted-foreground)",
                      borderColor: policy.targetRole === "Manager" ? "rgba(99,102,241,0.2)" : policy.targetRole === "Employee" ? "rgba(6,182,212,0.2)" : "rgba(107,114,128,0.2)",
                    }}
                  >
                    {policy.targetRole || "All Roles"}
                  </span>

                  <button
                    onClick={(e) => handleTogglePolicyStatus(e, policy.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full transition-all border font-semibold select-none text-[0.75rem]"
                    style={{
                      background: policy.enabled ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                      color: policy.enabled ? "#10b981" : "var(--muted-foreground)",
                      borderColor: policy.enabled ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.2)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: policy.enabled ? "#10b981" : "#6b7280" }} />
                    {policy.enabled ? "Enabled" : "Disabled"}
                  </button>

                  <div className="text-muted-foreground">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Card Expanded Settings Area */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-4 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
                  {/* Shared Scope Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Target Role Scope</label>
                      <select
                        value={draftSettings.targetRole || "All Roles"}
                        onChange={e => setDraftSettings(prev => ({ ...prev, targetRole: e.target.value as any }))}
                        className="w-full px-4 py-2 rounded-xl outline-none"
                        style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                      >
                        <option value="All Roles">All Roles</option>
                        <option value="Manager">Manager Only</option>
                        <option value="Employee">Employee Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Scope Departments</label>
                      <input
                        type="text"
                        value={draftSettings.departments || ""}
                        onChange={e => setDraftSettings(prev => ({ ...prev, departments: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl outline-none"
                        style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  {/* 1. Work Schedule Policies Settings */}
                  {policy.id === "work-schedule" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Working Hours</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={draftSettings.workingHoursStart || ""}
                              onChange={e => setDraftSettings(prev => ({ ...prev, workingHoursStart: e.target.value }))}
                              placeholder="Start, e.g. 09:00 AM"
                              className="w-1/2 px-3 py-2 rounded-xl outline-none"
                              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}
                            />
                            <span className="text-muted-foreground text-xs">to</span>
                            <input
                              type="text"
                              value={draftSettings.workingHoursEnd || ""}
                              onChange={e => setDraftSettings(prev => ({ ...prev, workingHoursEnd: e.target.value }))}
                              placeholder="End, e.g. 05:00 PM"
                              className="w-1/2 px-3 py-2 rounded-xl outline-none"
                              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Break Duration</label>
                          <select
                            value={draftSettings.breakDuration || "60 minutes"}
                            onChange={e => setDraftSettings(prev => ({ ...prev, breakDuration: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          >
                            <option value="30 minutes">30 minutes</option>
                            <option value="45 minutes">45 minutes</option>
                            <option value="60 minutes">60 minutes</option>
                            <option value="90 minutes">90 minutes</option>
                          </select>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex items-center justify-between py-1">
                            <div>
                              <div className="text-sm font-semibold">Overtime Rules Enabled</div>
                              <p className="text-xs text-muted-foreground">Enforce rules for extra hours</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDraftSettings(prev => ({ ...prev, overtimeEnabled: !prev.overtimeEnabled }))}
                              className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5"
                              style={{ background: draftSettings.overtimeEnabled ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                            >
                              <div
                                className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                                style={{ transform: draftSettings.overtimeEnabled ? "translateX(20px)" : "translateX(0px)" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Overtime Description/Rules</label>
                        <input
                          type="text"
                          value={draftSettings.overtimeRules || ""}
                          onChange={e => setDraftSettings(prev => ({ ...prev, overtimeRules: e.target.value }))}
                          placeholder="e.g. Overtime requires manager pre-approval"
                          className="w-full px-3 py-2 rounded-xl outline-none"
                          style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Productivity Policies Settings */}
                  {policy.id === "productivity" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Idle Time Threshold</label>
                          <select
                            value={draftSettings.idleThreshold || "10 minutes"}
                            onChange={e => setDraftSettings(prev => ({ ...prev, idleThreshold: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          >
                            <option value="3 minutes">3 minutes</option>
                            <option value="5 minutes">5 minutes</option>
                            <option value="10 minutes">10 minutes</option>
                            <option value="15 minutes">15 minutes</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Productivity Goals Target</label>
                          <input
                            type="text"
                            value={draftSettings.productivityGoals || ""}
                            onChange={e => setDraftSettings(prev => ({ ...prev, productivityGoals: e.target.value }))}
                            placeholder="e.g. 80% Efficiency"
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Minimum Daily Hours</label>
                          <input
                            type="text"
                            value={draftSettings.minDailyHours || ""}
                            onChange={e => setDraftSettings(prev => ({ ...prev, minDailyHours: e.target.value }))}
                            placeholder="e.g. 8 hours"
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Application Policies Settings */}
                  {policy.id === "application" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Allowed Applications (Comma separated)</label>
                          <textarea
                            value={draftSettings.allowedApps?.join(", ") || ""}
                            onChange={e => handleListChange("allowedApps", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-xl outline-none resize-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {draftSettings.allowedApps?.map(app => (
                              <span key={app} className="px-2 py-0.5 rounded text-[0.7rem] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Restricted Applications (Comma separated)</label>
                          <textarea
                            value={draftSettings.restrictedApps?.join(", ") || ""}
                            onChange={e => handleListChange("restrictedApps", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-xl outline-none resize-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {draftSettings.restrictedApps?.map(app => (
                              <span key={app} className="px-2 py-0.5 rounded text-[0.7rem] bg-rose-500/10 text-rose-500 border border-rose-500/20 font-medium">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Website Policies Settings */}
                  {policy.id === "website" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Allowed Websites (Comma separated)</label>
                          <textarea
                            value={draftSettings.allowedWebsites?.join(", ") || ""}
                            onChange={e => handleListChange("allowedWebsites", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-xl outline-none resize-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {draftSettings.allowedWebsites?.map(web => (
                              <span key={web} className="px-2 py-0.5 rounded text-[0.7rem] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                                {web}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Blocked Websites (Comma separated)</label>
                          <textarea
                            value={draftSettings.blockedWebsites?.join(", ") || ""}
                            onChange={e => handleListChange("blockedWebsites", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-xl outline-none resize-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {draftSettings.blockedWebsites?.map(web => (
                              <span key={web} className="px-2 py-0.5 rounded text-[0.7rem] bg-rose-500/10 text-rose-500 border border-rose-500/20 font-medium">
                                {web}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Screenshot Policies Settings */}
                  {policy.id === "screenshot" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Screenshot Interval</label>
                          <select
                            value={draftSettings.screenshotInterval || "Every 5 minutes"}
                            onChange={e => setDraftSettings(prev => ({ ...prev, screenshotInterval: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          >
                            <option value="Every 1 minute">Every 1 minute</option>
                            <option value="Every 3 minutes">Every 3 minutes</option>
                            <option value="Every 5 minutes">Every 5 minutes</option>
                            <option value="Every 10 minutes">Every 10 minutes</option>
                            <option value="Every 15 minutes">Every 15 minutes</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">Screen Recording Settings</label>
                          <select
                            value={draftSettings.screenRecordingSettings || "Record on Active Window"}
                            onChange={e => setDraftSettings(prev => ({ ...prev, screenRecordingSettings: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          >
                            <option value="Disabled">Disable Recording</option>
                            <option value="Record on Active Window">Record on Active Window</option>
                            <option value="Record Entire Screen">Record Entire Screen</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. Notifications & Alerts Settings */}
                  {policy.id === "notifications-alerts" && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--input-background)" }}>
                          <div>
                            <div className="text-sm font-semibold">Inactivity Alerts</div>
                            <p className="text-[0.7rem] text-muted-foreground">Alert on idle limit hit</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDraftSettings(prev => ({ ...prev, inactivityAlertsEnabled: !prev.inactivityAlertsEnabled }))}
                            className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0"
                            style={{ background: draftSettings.inactivityAlertsEnabled ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                          >
                            <div
                              className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                              style={{ transform: draftSettings.inactivityAlertsEnabled ? "translateX(20px)" : "translateX(0px)" }}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--input-background)" }}>
                          <div>
                            <div className="text-sm font-semibold">Late Login Alerts</div>
                            <p className="text-[0.7rem] text-muted-foreground">Alert on late start</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDraftSettings(prev => ({ ...prev, lateLoginAlertsEnabled: !prev.lateLoginAlertsEnabled }))}
                            className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0"
                            style={{ background: draftSettings.lateLoginAlertsEnabled ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                          >
                            <div
                              className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                              style={{ transform: draftSettings.lateLoginAlertsEnabled ? "translateX(20px)" : "translateX(0px)" }}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--input-background)" }}>
                          <div>
                            <div className="text-sm font-semibold">Overtime Alerts</div>
                            <p className="text-[0.7rem] text-muted-foreground">Alert on overtime hours</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDraftSettings(prev => ({ ...prev, overtimeAlertsEnabled: !prev.overtimeAlertsEnabled }))}
                            className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0"
                            style={{ background: draftSettings.overtimeAlertsEnabled ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                          >
                            <div
                              className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                              style={{ transform: draftSettings.overtimeAlertsEnabled ? "translateX(20px)" : "translateX(0px)" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="flex justify-end gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <button
                      onClick={() => handleResetSettings(policy.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all text-xs font-medium hover:opacity-85"
                      style={{ background: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset to Default
                    </button>
                    <button
                      onClick={() => handleSaveSettings(policy.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all hover:opacity-90 active:scale-95 text-xs"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredPolicies.length === 0 && (
          <div className="text-center py-10 rounded-2xl border border-dashed" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <ShieldAlert className="w-8 h-8 mx-auto text-muted-foreground mb-2 animate-bounce" />
            <p className="font-semibold text-muted-foreground">No policies match your search.</p>
          </div>
        )}
      </div>

      {/* Floating Toast Banner */}
      {toast.show && (
        <div
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-2 text-white border text-sm transition-all transform animate-in slide-in-from-bottom-5 duration-300"
          style={{
            background: toast.type === "success" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #6366f1, #4f46e5)",
            borderColor: toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.3)",
          }}
        >
          <Check className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modal - Create New Policy */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowModal(false)}>
          <div
            className="rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-foreground">Create New Policy</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-muted"
                style={{ color: "var(--foreground)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block mb-1 text-xs font-semibold text-muted-foreground">Policy Name</label>
                <input
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Activity Thresholds"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold text-muted-foreground">Description</label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Summarize the behavior tracked by this rule..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl outline-none resize-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-muted-foreground">Target Role Scope</label>
                  <select
                    value={newTargetRole}
                    onChange={e => setNewTargetRole(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Manager">Manager Only</option>
                    <option value="Employee">Employee Only</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-semibold text-muted-foreground">Department Scope</label>
                  <select
                    value={newDept}
                    onChange={e => setNewDept(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold text-muted-foreground">Policy Icon / Category</label>
                <select
                  value={newIcon}
                  onChange={e => setNewIcon(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                >
                  <option value="Shield">Shield (Application Policies)</option>
                  <option value="Camera">Camera (Screenshot Policies)</option>
                  <option value="Globe">Globe (Website Policies)</option>
                  <option value="Clock">Clock (Work Schedule Policies)</option>
                  <option value="Activity">Activity (Productivity Policies)</option>
                  <option value="Bell">Bell (Notifications & Alerts)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-semibold">Enable Status</div>
                  <p className="text-[0.7rem] text-muted-foreground">Activate this monitoring policy immediately</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewEnabled(!newEnabled)}
                  className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5"
                  style={{ background: newEnabled ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                    style={{ transform: newEnabled ? "translateX(20px)" : "translateX(0px)" }}
                  />
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 flex gap-3 bg-muted/40" style={{ borderTop: "1px solid var(--border)" }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-muted"
                style={{ background: "var(--muted)", color: "var(--foreground)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreatePolicy}
                className="flex-1 py-2.5 rounded-xl text-white font-semibold gradient-primary transition-all hover:opacity-90 active:scale-95 text-xs"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
