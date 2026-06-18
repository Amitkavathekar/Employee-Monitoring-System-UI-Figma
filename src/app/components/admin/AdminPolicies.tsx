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
  // Specific Settings
  captureInterval?: string;
  blurPersonalContent?: boolean;
  notifyEmployee?: boolean;
  storageRetention?: string;
  blockedCategories?: string[];
  startTime?: string;
  endTime?: string;
  idleThreshold?: string;
  alertChannels?: string[];
}

const initialPolicies: Policy[] = [
  {
    id: "screenshot",
    title: "Screenshot Capture",
    description: "Automated periodic screenshot capture during work hours",
    icon: "Camera",
    departments: "All Departments",
    targetRole: "Employee",
    enabled: false,
    captureInterval: "Every 5 minutes",
    blurPersonalContent: true,
    notifyEmployee: true,
    storageRetention: "30 days",
  },
  {
    id: "website",
    title: "Website Tracking",
    description: "Monitor and categorize websites visited during work hours",
    icon: "Globe",
    departments: "Engineering, Sales, Marketing",
    targetRole: "Employee",
    enabled: true,
    blockedCategories: ["Social Media", "Gaming", "Shopping"],
  },
  {
    id: "working-hours",
    title: "Working Hours",
    description: "Define and enforce standard working hours per department",
    icon: "Clock",
    departments: "All Departments",
    targetRole: "All Roles",
    enabled: true,
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  },
  {
    id: "idle-detection",
    title: "Idle Detection",
    description: "Detect and track employee idle periods",
    icon: "Activity",
    departments: "All Departments",
    targetRole: "Employee",
    enabled: true,
    idleThreshold: "10 minutes",
  },
  {
    id: "policy-violations",
    title: "Policy Violation Alerts",
    description: "Configure alerts for policy violations (e.g., idle time, unauthorized website/app)",
    icon: "Bell",
    departments: "All Departments",
    targetRole: "All Roles",
    enabled: true,
    alertChannels: ["System Notification", "Email"],
  }
];

const defaultSettings: Record<string, Partial<Policy>> = {
  screenshot: {
    captureInterval: "Every 5 minutes",
    blurPersonalContent: true,
    notifyEmployee: true,
    storageRetention: "30 days",
  },
  website: {
    blockedCategories: ["Social Media", "Gaming", "Shopping"],
  },
  "working-hours": {
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  },
  "idle-detection": {
    idleThreshold: "10 minutes",
  },
  "policy-violations": {
    alertChannels: ["System Notification", "Email"],
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
  const [expandedId, setExpandedId] = useState<string | null>("screenshot"); // Open Screenshot Capture by default
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
        // Copy current policy configurations to draft
        setDraftSettings({ ...policy });
      }
    }
  };

  const handleTogglePolicyStatus = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid triggering accordion toggle
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
      // Default placeholder fields based on icon selection
      captureInterval: newIcon === "Camera" ? "Every 5 minutes" : undefined,
      blurPersonalContent: newIcon === "Camera" ? true : undefined,
      notifyEmployee: newIcon === "Camera" ? true : undefined,
      storageRetention: newIcon === "Camera" ? "30 days" : undefined,
    };

    setPolicies(prev => [...prev, newPolicy]);
    setShowModal(false);
    showToast(`Policy "${newTitle}" created successfully!`);

    // Reset Modal Form
    setNewTitle("");
    setNewDescription("");
    setNewDept("All Departments");
    setNewTargetRole("All Roles");
    setNewIcon("Shield");
    setNewEnabled(true);
  };

  // Compute stats dynamically
  const activeCount = policies.filter(p => p.enabled).length;
  const inactiveCount = policies.filter(p => !p.enabled).length;
  const deptCount = 8; // Fixed reference based on mockup specs

  // Filter policies based on search
  const filteredPolicies = policies.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.departments.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full text-foreground" style={{ background: "var(--background)" }}>
      {/* Header Container */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Monitoring Policies</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Configure data collection and monitoring rules</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
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
          {/* New Policy Button */}
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
        {/* Active Policies */}
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

        {/* Inactive Policies */}
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

        {/* Departments Covered */}
        <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl flex-shrink-0"
               style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary)" }}>
            {deptCount}
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Departments Covered</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--foreground)" }}>Global Office Scope</div>
          </div>
        </div>
      </div>

      {/* Accordion Policy List Container */}
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
                  {/* Left Rounded Icon Wrapper */}
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
                  {/* Scope Department Description */}
                  <span className="hidden md:inline" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {policy.departments}
                  </span>

                  {/* Target Role Scope Badge */}
                  <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold border"
                    style={{
                      background: policy.targetRole === "Manager" ? "rgba(99,102,241,0.1)" : policy.targetRole === "Employee" ? "rgba(6,182,212,0.1)" : "rgba(107,114,128,0.1)",
                      color: policy.targetRole === "Manager" ? "#6366f1" : policy.targetRole === "Employee" ? "#06b6d4" : "var(--muted-foreground)",
                      borderColor: policy.targetRole === "Manager" ? "rgba(99,102,241,0.2)" : policy.targetRole === "Employee" ? "rgba(6,182,212,0.2)" : "rgba(107,114,128,0.2)",
                    }}
                  >
                    {policy.targetRole || "All Roles"}
                  </span>

                  {/* Switch Pill Toggle */}
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

                  {/* Expand Caret */}
                  <div className="text-muted-foreground">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Card Expanded Settings Area */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-4 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
                  {/* Shared Global Scope Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                    <div>
                      <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">
                        Target Role Scope
                      </label>
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
                      <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">
                        Scope Departments
                      </label>
                      <input
                        type="text"
                        value={draftSettings.departments || ""}
                        onChange={e => setDraftSettings(prev => ({ ...prev, departments: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl outline-none"
                        style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>

                  {policy.id === "screenshot" ? (
                    /* Screenshot Capture Expanded UI Details */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                              Capture Interval
                            </label>
                            <select
                              value={draftSettings.captureInterval || ""}
                              onChange={e => setDraftSettings(prev => ({ ...prev, captureInterval: e.target.value }))}
                              className="w-full px-4 py-2 rounded-xl outline-none"
                              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                            >
                              <option value="Every 1 minute">Every 1 minute</option>
                              <option value="Every 3 minutes">Every 3 minutes</option>
                              <option value="Every 5 minutes">Every 5 minutes</option>
                              <option value="Every 10 minutes">Every 10 minutes</option>
                              <option value="Every 15 minutes">Every 15 minutes</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between py-1">
                            <div>
                              <div className="text-sm font-semibold">Notify Employee</div>
                              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Show notification when screen is captured</p>
                            </div>
                            <button
                              onClick={() => setDraftSettings(prev => ({ ...prev, notifyEmployee: !prev.notifyEmployee }))}
                              className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5"
                              style={{ background: draftSettings.notifyEmployee ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                            >
                              <div
                                className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                                style={{ transform: draftSettings.notifyEmployee ? "translateX(20px)" : "translateX(0px)" }}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-1">
                            <div>
                              <div className="text-sm font-semibold">Blur Personal Content</div>
                              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Apply Gaussian blur automatically</p>
                            </div>
                            <button
                              onClick={() => setDraftSettings(prev => ({ ...prev, blurPersonalContent: !prev.blurPersonalContent }))}
                              className="w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5"
                              style={{ background: draftSettings.blurPersonalContent ? "var(--primary)" : "rgba(255,255,255,0.15)" }}
                            >
                              <div
                                className="w-5 h-5 bg-white rounded-full transition-all shadow-sm"
                                style={{ transform: draftSettings.blurPersonalContent ? "translateX(20px)" : "translateX(0px)" }}
                              />
                            </button>
                          </div>

                          <div>
                            <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                              Storage Retention
                            </label>
                            <select
                              value={draftSettings.storageRetention || ""}
                              onChange={e => setDraftSettings(prev => ({ ...prev, storageRetention: e.target.value }))}
                              className="w-full px-4 py-2 rounded-xl outline-none"
                              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                            >
                              <option value="7 days">7 days</option>
                              <option value="15 days">15 days</option>
                              <option value="30 days">30 days</option>
                              <option value="90 days">90 days</option>
                              <option value="Forever">Forever (No Auto-delete)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Actions Footer */}
                      <div className="flex justify-end gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
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
                  ) : policy.id === "website" ? (
                    /* Website Tracking Expanded Settings */
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block mb-1.5 text-xs font-semibold text-muted-foreground">
                          Blocked Domain Categories
                        </label>
                          <div className="flex gap-2 flex-wrap pt-1">
                            {["Social Media", "Gaming", "Shopping", "Entertainment"].map(cat => {
                              const list = draftSettings.blockedCategories || [];
                              const isChecked = list.includes(cat);
                              return (
                                <button
                                  key={cat}
                                  onClick={() => {
                                    const next = isChecked ? list.filter(c => c !== cat) : [...list, cat];
                                    setDraftSettings(prev => ({ ...prev, blockedCategories: next }));
                                  }}
                                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                                  style={{
                                    background: isChecked ? "var(--primary)" : "var(--muted)",
                                    color: isChecked ? "white" : "var(--muted-foreground)"
                                  }}
                                >
                                  {cat}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      <div className="flex justify-end gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                        <button
                          onClick={() => handleResetSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all text-xs font-medium"
                          style={{ background: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button
                          onClick={() => handleSaveSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all text-xs"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                      </div>
                    </div>
                  ) : policy.id === "working-hours" ? (
                    /* Working Hours Expanded Settings */
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                            Standard Start Time
                          </label>
                          <input
                            type="text"
                            value={draftSettings.startTime || ""}
                            onChange={e => setDraftSettings(prev => ({ ...prev, startTime: e.target.value }))}
                            className="w-full px-4 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                            Standard End Time
                          </label>
                          <input
                            type="text"
                            value={draftSettings.endTime || ""}
                            onChange={e => setDraftSettings(prev => ({ ...prev, endTime: e.target.value }))}
                            className="w-full px-4 py-2 rounded-xl outline-none"
                            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                        <button
                          onClick={() => handleResetSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all text-xs font-medium"
                          style={{ background: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button
                          onClick={() => handleSaveSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all text-xs"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Default Fallback Config Form */
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {policy.id === "idle-detection" && (
                          <div>
                            <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                              Idle Timeout Threshold
                            </label>
                            <select
                              value={draftSettings.idleThreshold || ""}
                              onChange={e => setDraftSettings(prev => ({ ...prev, idleThreshold: e.target.value }))}
                              className="w-full px-4 py-2 rounded-xl outline-none"
                              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                            >
                              <option value="5 minutes">5 minutes</option>
                              <option value="10 minutes">10 minutes</option>
                              <option value="15 minutes">15 minutes</option>
                              <option value="20 minutes">20 minutes</option>
                            </select>
                          </div>
                        )}
                        {policy.id === "policy-violations" && (
                          <div>
                            <label className="block mb-1.5 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                              Alert Channels
                            </label>
                            <div className="flex gap-2">
                              {["System Notification", "Email", "Slack"].map(ch => {
                                const list = draftSettings.alertChannels || [];
                                const isChecked = list.includes(ch);
                                return (
                                  <button
                                    key={ch}
                                    onClick={() => {
                                      const next = isChecked ? list.filter(c => c !== ch) : [...list, ch];
                                      setDraftSettings(prev => ({ ...prev, alertChannels: next }));
                                    }}
                                    className="px-3 py-1 rounded-lg text-xs transition-all"
                                    style={{
                                      background: isChecked ? "var(--primary)" : "var(--muted)",
                                      color: isChecked ? "white" : "var(--muted-foreground)"
                                    }}
                                  >
                                    {ch}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                        <button
                          onClick={() => handleResetSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border transition-all text-xs font-medium"
                          style={{ background: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button
                          onClick={() => handleSaveSettings(policy.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-medium gradient-primary transition-all text-xs"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                      </div>
                    </div>
                  )}
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

      {/* Floating Interactive Toast Banner */}
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

            {/* Modal Body / Inputs */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block mb-1 text-xs font-semibold text-muted-foreground">Policy Name</label>
                <input
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Application Time Limit"
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
                <label className="block mb-1 text-xs font-semibold text-muted-foreground">Policy Icon</label>
                <select
                  value={newIcon}
                  onChange={e => setNewIcon(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem" }}
                >
                  <option value="Shield">Shield (Default)</option>
                  <option value="Camera">Camera (Capture)</option>
                  <option value="Globe">Globe (Websites)</option>
                  <option value="Clock">Clock (Time)</option>
                  <option value="Activity">Activity (Idle)</option>
                  <option value="Bell">Bell (Alerts)</option>
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
