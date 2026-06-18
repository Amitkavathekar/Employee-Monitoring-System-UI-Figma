import { useState } from "react";
import {
  Users, Search, Plus, Edit2, Trash2, MoreVertical, CheckCircle,
  Wifi, Clock, ChevronLeft, ChevronRight, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const employees = [
  { id: 1, name: "Sarah Johnson", email: "sarah@company.com", dept: "Acme Corp", status: "online", productivity: 97, checkIn: "09:00", initials: "SJ", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Mike Chen", email: "mike@company.com", dept: "TechGlobal Inc", status: "online", productivity: 95, checkIn: "09:10", initials: "MC", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Emma Wilson", email: "emma@company.com", dept: "Innovate LLC", status: "break", productivity: 93, checkIn: "09:05", initials: "EW", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "James Lee", email: "james@company.com", dept: "Core Systems", status: "online", productivity: 92, checkIn: "09:30", initials: "JL", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Priya Patel", email: "priya@company.com", dept: "Acme Corp", status: "offline", productivity: 90, checkIn: "--", initials: "PP", photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" },
  { id: 6, name: "David Kim", email: "david@company.com", dept: "TechGlobal Inc", status: "online", productivity: 88, checkIn: "08:55", initials: "DK", photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
  { id: 7, name: "Lisa Torres", email: "lisa@company.com", dept: "Innovate LLC", status: "online", productivity: 86, checkIn: "09:15", initials: "LT", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { id: 8, name: "Ryan Park", email: "ryan@company.com", dept: "Core Systems", status: "online", productivity: 85, checkIn: "09:20", initials: "RP", photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" },
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function AdminRoleManagement() {
  const [employeesList, setEmployeesList] = useState(employees);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  // Modal States
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empCompany, setEmpCompany] = useState("Acme Corp");

  const filtered = employeesList.filter(e =>
    (deptFilter === "all" || e.dept === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEditClick = (emp: any) => {
    setEditingEmployee(emp);
    setEmpName(emp.name);
    setEmpEmail(emp.email);
    setEmpPhone(emp.phone || "");
    setEmpCompany(emp.dept);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
    setEmpName("");
    setEmpEmail("");
    setEmpPhone("");
    setEmpCompany("Acme Corp");
    setShowModal(false);
  };

  const handleSaveEmployee = () => {
    if (!empName || !empEmail) return;
    if (editingEmployee) {
      setEmployeesList(employeesList.map(e => e.id === editingEmployee.id ? {
        ...e,
        name: empName,
        email: empEmail,
        dept: empCompany,
        phone: empPhone,
      } : e));
      toast.success(`Updated employee details for "${empName}" successfully.`);
    } else {
      const initials = empName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
      const newEmp = {
        id: employeesList.length + 1,
        name: empName,
        email: empEmail,
        dept: empCompany,
        status: "online",
        productivity: 90,
        checkIn: "09:00",
        initials: initials || "EM",
        photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
        phone: empPhone,
      };
      setEmployeesList([...employeesList, newEmp]);
      toast.success(`Employee "${empName}" registered successfully.`);
    }
    handleCloseModal();
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: "55", color: "#6366f1" },
          { label: "Active Today", value: "46", color: "#10b981" },
          { label: "On Break", value: "3", color: "#f59e0b" },
          { label: "Inactive", value: "6", color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Table without Role */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="p-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: 600 }}>Employee Directory</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..."
                className="pl-9 pr-4 py-2 rounded-xl outline-none"
                style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem", width: "180px" }} />
            </div>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="py-2 px-3 rounded-xl outline-none"
              style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.8rem" }}>
              <option value="all">All Companies</option>
              <option value="Acme Corp">Acme Corp</option>
              <option value="TechGlobal Inc">TechGlobal Inc</option>
              <option value="Innovate LLC">Innovate LLC</option>
              <option value="Core Systems">Core Systems</option>
            </select>
            <button onClick={() => { setEditingEmployee(null); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "var(--primary)", fontSize: "0.8rem", fontWeight: 500 }}>
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Employee", "Company", "Check-In", "Status", "Productivity", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => {
                const sc = statusColors[emp.status];
                return (
                  <tr key={emp.id} className="hover:opacity-80 transition-opacity" style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={emp.photoUrl} alt={emp.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{emp.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem" }}>{emp.dept}</td>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{emp.checkIn}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg capitalize"
                        style={{ background: sc.bg, color: sc.color, fontSize: "0.75rem", fontWeight: 600 }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--muted)" }}>
                          <div className="h-1.5 rounded-full transition-all" style={{ width: `${emp.productivity}%`, background: emp.productivity > 90 ? "#10b981" : emp.productivity > 75 ? "#f59e0b" : "#ef4444" }} />
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{emp.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => handleEditClick(emp)} className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(emp.id)}
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
          <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Showing {filtered.length} of 55 employees</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg"
                style={{ background: p === page ? "var(--primary)" : "var(--muted)", color: p === page ? "white" : "var(--foreground)", fontSize: "0.875rem", fontWeight: p === page ? 600 : 400 }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(3, page + 1))} className="p-1.5 rounded-lg" style={{ background: "var(--muted)" }}>
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
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Delete Employee</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                  Are you sure you want to delete this employee? All associated employee information will be permanently removed.
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
                  const empToDelete = employeesList.find(e => e.id === deleteConfirmId);
                  setEmployeesList(employeesList.filter(e => e.id !== deleteConfirmId));
                  setDeleteConfirmId(null);
                  if (empToDelete) {
                    toast.info(`Employee "${empToDelete.name}" has been deleted.`);
                  }
                }
              }} className="px-4 py-2 rounded-xl text-white" style={{ background: "#ef4444", fontSize: "0.875rem", fontWeight: 600 }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={handleCloseModal}>
          <div className="rounded-2xl w-full max-w-md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontWeight: 700 }}>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h3>
              <button onClick={handleCloseModal} className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--muted)" }}>✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Full Name</label>
                <input value={empName} onChange={e => setEmpName(e.target.value)} placeholder="Sarah Johnson"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Email Address</label>
                <input value={empEmail} onChange={e => setEmpEmail(e.target.value)} placeholder="sarah@company.com"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Phone Number</label>
                <input value={empPhone} onChange={e => setEmpPhone(e.target.value)} placeholder="+1 (555) 234-5678"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Company</label>
                <select value={empCompany} onChange={e => setEmpCompany(e.target.value)} className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  <option>Acme Corp</option>
                  <option>TechGlobal Inc</option>
                  <option>Innovate LLC</option>
                  <option>Core Systems</option>
                </select>
              </div>
            </div>
            <div className="p-5 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={handleCloseModal} className="flex-1 py-2.5 rounded-xl"
                style={{ background: "var(--muted)", fontSize: "0.875rem", fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSaveEmployee} className="flex-1 py-2.5 rounded-xl text-white gradient-primary"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}>{editingEmployee ? "Save Changes" : "Add Employee"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
