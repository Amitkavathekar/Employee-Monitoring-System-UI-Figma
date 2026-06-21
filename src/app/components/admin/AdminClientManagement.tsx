import { useState } from "react";
import {
  Building, Search, Plus, Edit2, Trash2, MoreVertical, CheckCircle,
  XCircle, Shield, User, ChevronLeft, ChevronRight, Clock, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: number;
  companyName: string;
  contactEmail: string;
  manager: string;
  employeesCount: number;
  status: "online" | "offline" | "break";
  initials: string;
  logoUrl: string;
  businessType: string;
  address: string;
  phone: string;
  memberSince: string;
  notes?: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    companyName: "Acme Corp",
    contactEmail: "admin@acme.com",
    manager: "Alex Morgan",
    employeesCount: 15,
    status: "online",
    initials: "AC",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop",
    businessType: "Software Development",
    address: "100 Pine St, San Francisco, CA 94111",
    phone: "+1 (555) 019-2831",
    memberSince: "May 12, 2025",
    notes: "Acme Corp is using custom keystroke and idle monitoring configurations. Review Q3 check-in compliance logs weekly."
  },
  {
    id: 2,
    companyName: "TechGlobal Inc",
    contactEmail: "admin@techglobal.com",
    manager: "Sarah Johnson",
    employeesCount: 12,
    status: "online",
    initials: "TG",
    logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop",
    businessType: "Cloud Services & Infrastructure",
    address: "500 Vista Ave, Seattle, WA 98101",
    phone: "+1 (555) 382-9901",
    memberSince: "August 24, 2025",
    notes: "Currently testing dynamic task pauses for employees who encounter external dependency queries."
  },
  {
    id: 3,
    companyName: "Innovate LLC",
    contactEmail: "admin@innovate.com",
    manager: "Emma Wilson",
    employeesCount: 8,
    status: "break",
    initials: "IN",
    logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop",
    businessType: "Design & Glassmorphic UI Agency",
    address: "80 Queen Rd, Austin, TX 78701",
    phone: "+1 (555) 887-3211",
    memberSince: "November 03, 2025",
    notes: "Requires high-frequency screenshot capture intervals for active design sprint verification sessions."
  },
  {
    id: 4,
    companyName: "Core Systems",
    contactEmail: "admin@coresystems.com",
    manager: "James Lee",
    employeesCount: 11,
    status: "offline",
    initials: "CS",
    logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop",
    businessType: "Data Warehousing",
    address: "700 Broadway, New York, NY 10003",
    phone: "+1 (555) 223-8890",
    memberSince: "February 18, 2026",
    notes: "Security policies restrict storage access on remote employee local storage caches. Need proxy sync."
  }
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

function getMockEmployees(companyName: string) {
  if (companyName === "Acme Corp") {
    return [
      { name: "John Doe", role: "Frontend Developer", activeTask: "Implement Login Validation", status: "online", idleTime: "02m" },
      { name: "Sarah Connor", role: "QA Engineer", activeTask: "Test Auth Flows", status: "online", idleTime: "00m" },
      { name: "Bruce Wayne", role: "DevOps Engineer", activeTask: "Setup Jenkins Pipeline", status: "break", idleTime: "15m" }
    ];
  }
  if (companyName === "TechGlobal Inc") {
    return [
      { name: "Jane Smith", role: "Fullstack Architect", activeTask: "Database Query Tuning", status: "online", idleTime: "01m" },
      { name: "David Miller", role: "Backend Engineer", activeTask: "Write Stripe Webhook", status: "offline", idleTime: "--" }
    ];
  }
  return [
    { name: "Alice Johnson", role: "UI Designer", activeTask: "Mockup New Landing Page", status: "online", idleTime: "04m" },
    { name: "Bob Martin", role: "Developer", activeTask: "Code Review Pull Requests", status: "break", idleTime: "10m" }
  ];
}

function getMockActivityLogs(companyName: string) {
  return [
    { time: "10 minutes ago", title: "Query Raised", desc: `John Doe raised a dependency query for "Implement Login Validation".` },
    { time: "1 hour ago", title: "Shift Started", desc: "Bruce Wayne checked in for active work session." },
    { time: "2 hours ago", title: "Task Ended", desc: `Sarah Connor completed task "Design Landing Page Mockup" in 3 hours.` },
    { time: "Yesterday", title: "System Login", desc: "Manager updated tracking window intervals configuration settings." }
  ];
}

export function AdminClientManagement() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  // Client Selection State
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "employees" | "activity" | "documents">("overview");

  // Modal States
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newBusinessType, setNewBusinessType] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filtered = clients.filter(c =>
    (statusFilter === "all" || c.status === statusFilter) &&
    (c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.manager.toLowerCase().includes(search.toLowerCase()) ||
      c.contactEmail.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setNewCompany(client.companyName);
    setNewEmail(client.contactEmail);
    setNewManager(client.manager);
    setNewBusinessType(client.businessType || "");
    setNewAddress(client.address || "");
    setNewPhone(client.phone || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingClient(null);
    setNewCompany("");
    setNewEmail("");
    setNewManager("");
    setNewBusinessType("");
    setNewAddress("");
    setNewPhone("");
    setShowModal(false);
  };

  const handleSaveClient = () => {
    if (!newCompany || !newEmail || !newManager) return;
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? {
        ...c,
        companyName: newCompany,
        contactEmail: newEmail,
        manager: newManager,
        businessType: newBusinessType,
        address: newAddress,
        phone: newPhone,
      } : c));
      toast.success(`Updated client details for "${newCompany}" successfully.`);
    } else {
      const initials = newCompany.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
      const newClientObj: Client = {
        id: clients.length + 1,
        companyName: newCompany,
        contactEmail: newEmail,
        manager: newManager,
        employeesCount: 0,
        status: "online",
        initials: initials || "CL",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop",
        businessType: newBusinessType || "General Business",
        address: newAddress || "Not Specified Address",
        phone: newPhone || "+1 (555) 000-0000",
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      };
      setClients([...clients, newClientObj]);
      toast.success(`Client "${newCompany}" added successfully with manager "${newManager}".`);
    }
    handleCloseModal();
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {selectedClient ? (
        // Client Detailed Page
        <div className="space-y-6 animate-fade-in">
          {/* Back button and profile info */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelectedClientId(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground border border-border transition-all w-fit active:scale-95 mb-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Clients
            </button>
            
            <div className="flex items-center gap-4">
              <img src={selectedClient.logoUrl} alt={selectedClient.companyName} className="w-14 h-14 rounded-2xl object-cover border border-border" />
              <div>
                <h2 className="text-xl font-bold">{selectedClient.companyName}</h2>
                <p className="text-xs text-muted-foreground">{selectedClient.contactEmail} • Manager: {selectedClient.manager}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {/* Tab 1: Overview */}
            <button
              onClick={() => setActiveTab("overview")}
              className="p-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-95 bg-card hover:opacity-90 shadow-sm"
              style={{
                border: activeTab === "overview" ? "2px solid var(--primary)" : "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold">Overview</span>
                <span className="text-xs font-bold text-foreground mt-0.5">Details</span>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <Building className="w-4.5 h-4.5" />
              </div>
            </button>

            {/* Tab 2: Total Employees */}
            <button
              onClick={() => setActiveTab("employees")}
              className="p-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-95 bg-card hover:opacity-90 shadow-sm"
              style={{
                border: activeTab === "employees" ? "2px solid var(--primary)" : "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold">Total Employees</span>
                <span className="text-xs font-bold text-foreground mt-0.5">{selectedClient.employeesCount} Employees</span>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <User className="w-4.5 h-4.5" />
              </div>
            </button>

            {/* Tab 3: Activity */}
            <button
              onClick={() => setActiveTab("activity")}
              className="p-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-95 bg-card hover:opacity-90 shadow-sm"
              style={{
                border: activeTab === "activity" ? "2px solid var(--primary)" : "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold">Activity</span>
                <span className="text-xs font-bold text-foreground mt-0.5">Real-Time Logs</span>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Clock className="w-4.5 h-4.5" />
              </div>
            </button>

            {/* Tab 4: Documents */}
            <button
              onClick={() => setActiveTab("documents")}
              className="p-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-95 bg-card hover:opacity-90 shadow-sm"
              style={{
                border: activeTab === "documents" ? "2px solid var(--primary)" : "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold">Documents</span>
                <span className="text-xs font-bold text-foreground mt-0.5">Files & NDA</span>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <Shield className="w-4.5 h-4.5" />
              </div>
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Company Details Card */}
              <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-foreground pb-2 border-b border-border flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" /> Company Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Company Name</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.companyName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Business Type</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.businessType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Address</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.address}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold capitalize mt-1"
                      style={{ background: statusColors[selectedClient.status].bg, color: statusColors[selectedClient.status].color }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: statusColors[selectedClient.status].color }} />
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-foreground pb-2 border-b border-border flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-500" /> Contact Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Contact Person</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.manager}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Email</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.contactEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Phone</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Member Since</span>
                    <span className="text-xs font-semibold text-foreground">{selectedClient.memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Notes section */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-card border border-border space-y-3 shadow-sm">
                <h4 className="text-sm font-bold text-foreground">Notes</h4>
                <textarea
                  value={selectedClient.notes || ""}
                  onChange={(e) => {
                    setClients(clients.map(c => c.id === selectedClient.id ? { ...c, notes: e.target.value } : c));
                  }}
                  className="w-full text-xs p-3 rounded-xl bg-input-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none h-24 font-medium"
                  placeholder="Write internal notes about client settings or special policies here..."
                />
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="p-5 rounded-2xl bg-card border border-border mt-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Employees of {selectedClient.companyName}</h4>
                <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">{selectedClient.employeesCount} Monitored</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: "var(--muted)" }}>
                      {["Employee Name", "Role", "Active Task", "Status", "Idle Time"].map(h => (
                        <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getMockEmployees(selectedClient.companyName).map((emp, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td className="px-4 py-3 text-xs font-semibold text-foreground flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-500/15 text-indigo-500 flex items-center justify-center text-[10px] font-bold">
                            {emp.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          {emp.name}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{emp.role}</td>
                        <td className="px-4 py-3 text-xs font-medium text-foreground">{emp.activeTask}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold capitalize ${
                            emp.status === "online" ? "bg-emerald-500/10 text-emerald-500" : emp.status === "break" ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-muted-foreground font-mono">{emp.idleTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="p-5 rounded-2xl bg-card border border-border mt-6 space-y-4 shadow-sm">
              <h4 className="text-sm font-bold text-foreground">Recent Activity Logs</h4>
              <div className="relative border-l border-border pl-6 ml-3 space-y-6 py-2">
                {getMockActivityLogs(selectedClient.companyName).map((log, i) => (
                  <div key={i} className="relative animate-fade-in">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-card" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground font-semibold">{log.time}</span>
                      <span className="text-xs font-semibold text-foreground">{log.title}</span>
                      <span className="text-xs text-muted-foreground leading-relaxed">{log.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="p-5 rounded-2xl bg-card border border-border mt-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Client Contracts & Documents</h4>
                <button className="px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white text-xs font-semibold active:scale-95 transition-all">
                  + Upload File
                </button>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: `Service_Agreement_${selectedClient.companyName.replace(/\s+/g, "_")}.pdf`, size: "2.4 MB", date: "May 15, 2025" },
                  { name: "Monitoring_Disclosure_Signed.pdf", size: "1.1 MB", date: "May 16, 2025" },
                  { name: "NDA_Executed.pdf", size: "850 KB", date: "May 12, 2025" }
                ].map((doc, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border hover:bg-muted/20 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                        <Shield className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground">{doc.name}</span>
                        <span className="text-[10px] text-muted-foreground">{doc.size} • Uploaded on {doc.date}</span>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Directory Table List
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="p-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontWeight: 600 }}>Client Directory</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients/managers..."
                  className="pl-9 pr-4 py-2 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem", width: "180px" }} />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="py-2 px-3 rounded-xl outline-none"
                style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
                <option value="all">All Statuses</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="break">On Break</option>
              </select>
              <button onClick={() => { setEditingClient(null); setShowModal(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
                <Plus className="w-4 h-4" /> Add Manager
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--muted)" }}>
                  {["Client Company", "Assigned Manager", "Monitored Employees", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => {
                  const sc = statusColors[client.status];
                  return (
                    <tr
                      key={client.id}
                      onClick={() => { setSelectedClientId(client.id); setActiveTab("overview"); }}
                      className="cursor-pointer hover:bg-muted/10 transition-colors"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img src={client.logoUrl} alt={client.companyName} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                          <div>
                            <div
                              className="font-semibold text-sm hover:text-primary transition-colors"
                            >
                              {client.companyName}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{client.contactEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{client.manager}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontWeight: 600, paddingLeft: "2.5rem" }}>
                        {client.employeesCount}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg capitalize"
                          style={{ background: sc.bg, color: sc.color, fontSize: "0.75rem", fontWeight: 600 }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                          {client.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleEditClick(client)} className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(client.id)}
                            className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Showing {filtered.length} of {clients.length} clients</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg" style={{ background: "var(--primary)", color: "white", fontSize: "0.875rem", fontWeight: 600 }}>1</button>
              <button onClick={() => setPage(Math.min(1, page + 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setDeleteConfirmId(null)}>
          <div className="rounded-2xl w-full max-w-md p-6 relative animate-fade-in" style={{ background: "var(--card)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setDeleteConfirmId(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">✕</button>
            
            <div className="flex gap-4 items-start mt-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
                <AlertCircle className="w-6 h-6" style={{ color: "#ef4444" }} />
              </div>
              <div className="space-y-1">
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Delete Client</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                  Are you sure you want to delete this client? All associated client information will be permanently removed.
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", opacity: 0.8 }}>
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
                No, Cancel
              </button>
              <button onClick={() => {
                if (deleteConfirmId !== null) {
                  const clientToDelete = clients.find(c => c.id === deleteConfirmId);
                  setClients(clients.filter(c => c.id !== deleteConfirmId));
                  setDeleteConfirmId(null);
                  if (clientToDelete) {
                    toast.info(`Client "${clientToDelete.companyName}" has been deleted.`);
                  }
                }
              }} className="px-4 py-2 rounded-xl text-white" style={{ background: "#ef4444", fontSize: "0.875rem", fontWeight: 600 }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={handleCloseModal}>
          <div className="rounded-2xl w-full max-w-md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontWeight: 700 }}>{editingClient ? "Edit Client & Manager" : "Add New Client & Manager"}</h3>
              <button onClick={handleCloseModal} className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--muted)" }}>✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Company Name</label>
                <input value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="Acme Partners LLC"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Contact Email Address</label>
                <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="contact@company.com"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Assigned Manager</label>
                <input value={newManager} onChange={e => setNewManager(e.target.value)} placeholder="Full Name of Manager"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Business Type</label>
                <input value={newBusinessType} onChange={e => setNewBusinessType(e.target.value)} placeholder="Software / Consulting"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Contact Phone</label>
                <input value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="+1 (555) 012-3456"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Office Address</label>
                <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="Suite 400, Pine St"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
            </div>
            <div className="p-5 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={handleCloseModal} className="flex-1 py-2.5 rounded-xl"
                style={{ background: "var(--muted)", fontSize: "0.875rem", fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSaveClient} className="flex-1 py-2.5 rounded-xl text-white gradient-primary"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}>{editingClient ? "Save Changes" : "Add Manager"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
