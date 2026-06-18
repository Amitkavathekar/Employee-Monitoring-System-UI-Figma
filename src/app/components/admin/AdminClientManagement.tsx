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
  checkIn: string;
  initials: string;
  logoUrl: string;
}

const initialClients: Client[] = [
  { id: 1, companyName: "Acme Corp", contactEmail: "admin@acme.com", manager: "Alex Morgan", employeesCount: 15, status: "online", checkIn: "09:00", initials: "AC", logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop" },
  { id: 2, companyName: "TechGlobal Inc", contactEmail: "admin@techglobal.com", manager: "Sarah Johnson", employeesCount: 12, status: "online", checkIn: "09:15", initials: "TG", logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop" },
  { id: 3, companyName: "Innovate LLC", contactEmail: "admin@innovate.com", manager: "Emma Wilson", employeesCount: 8, status: "break", checkIn: "09:05", initials: "IN", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop" },
  { id: 4, companyName: "Core Systems", contactEmail: "admin@coresystems.com", manager: "James Lee", employeesCount: 11, status: "offline", checkIn: "--", initials: "CS", logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop" },
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function AdminClientManagement() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  // Modal States
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newCheckIn, setNewCheckIn] = useState("09:00");

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
    setNewCheckIn(client.checkIn);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingClient(null);
    setNewCompany("");
    setNewEmail("");
    setNewManager("");
    setNewCheckIn("09:00");
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
        checkIn: newCheckIn,
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
        checkIn: newCheckIn,
        initials: initials || "CL",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop",
      };
      setClients([...clients, newClientObj]);
      toast.success(`Client "${newCompany}" added successfully with manager "${newManager}".`);
    }
    handleCloseModal();
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Directory Table Container */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
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
                {["Client Company", "Assigned Manager", "Check-In", "Monitored Employees", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => {
                const sc = statusColors[client.status];
                return (
                  <tr key={client.id} className="hover:opacity-80 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={client.logoUrl} alt={client.companyName} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{client.companyName}</div>
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
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>
                      {client.checkIn}
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
                      <div className="flex gap-1">
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
