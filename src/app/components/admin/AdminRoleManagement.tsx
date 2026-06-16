import { useState } from "react";
import {
  Users, Search, Plus, Edit2, Trash2, MoreVertical, CheckCircle,
  Wifi, Clock, ChevronLeft, ChevronRight
} from "lucide-react";

const employees = [
  { id: 1, name: "Sarah Johnson", email: "sarah@company.com", dept: "Engineering", status: "online", productivity: 97, checkIn: "09:00", initials: "SJ" },
  { id: 2, name: "Mike Chen", email: "mike@company.com", dept: "Design", status: "online", productivity: 95, checkIn: "09:10", initials: "MC" },
  { id: 3, name: "Emma Wilson", email: "emma@company.com", dept: "Marketing", status: "break", productivity: 93, checkIn: "09:05", initials: "EW" },
  { id: 4, name: "James Lee", email: "james@company.com", dept: "Engineering", status: "online", productivity: 92, checkIn: "09:30", initials: "JL" },
  { id: 5, name: "Priya Patel", email: "priya@company.com", dept: "Sales", status: "offline", productivity: 90, checkIn: "--", initials: "PP" },
  { id: 6, name: "David Kim", email: "david@company.com", dept: "HR", status: "online", productivity: 88, checkIn: "08:55", initials: "DK" },
  { id: 7, name: "Lisa Torres", email: "lisa@company.com", dept: "Design", status: "online", productivity: 86, checkIn: "09:15", initials: "LT" },
  { id: 8, name: "Ryan Park", email: "ryan@company.com", dept: "Engineering", status: "online", productivity: 85, checkIn: "09:20", initials: "RP" },
];

const statusColors: Record<string, { color: string; bg: string }> = {
  online: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  offline: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  break: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export function AdminRoleManagement() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = employees.filter(e =>
    (deptFilter === "all" || e.dept === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()))
  );

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
          <h3 style={{ fontWeight: 600 }}>Employee Directory (Role Management)</h3>
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
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
            <button onClick={() => setShowModal(true)}
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
                {["Employee", "Department", "Check-In", "Status", "Productivity", "Actions"].map(h => (
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
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{emp.initials}</span>
                        </div>
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
                        <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)" }}>
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:opacity-70 transition-opacity" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
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

      {/* Add Employee Modal without Role */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}>
          <div className="rounded-2xl w-full max-w-md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontWeight: 700 }}>Add New Employee</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--muted)" }}>✕</button>
            </div>
            <div className="p-5 space-y-4">
              {["Full Name", "Email Address", "Phone Number", "Department"].map(label => (
                <div key={label}>
                  <label className="block mb-1.5" style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</label>
                  {label === "Department" ? (
                    <select className="w-full px-4 py-2.5 rounded-xl outline-none"
                      style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                      <option>Engineering</option><option>Design</option><option>Marketing</option><option>Sales</option><option>HR</option>
                    </select>
                  ) : (
                    <input className="w-full px-4 py-2.5 rounded-xl outline-none"
                      style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 flex gap-3" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl"
                style={{ background: "var(--muted)", fontSize: "0.875rem", fontWeight: 500 }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-white gradient-primary"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}>Add Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
