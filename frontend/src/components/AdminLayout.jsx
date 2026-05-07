import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UsersRound,
  LogOut,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useSidebarToggle from "../pages/admin/JavaScript/useSidebarToggle";
import "../pages/admin/css/index.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarToggle();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? "show" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <h4>LeadFlow</h4>
            <span>CRM Workspace</span>
          </div>

          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link" onClick={closeSidebar}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/leads" className="sidebar-link" onClick={closeSidebar}>
            <UsersRound size={18} />
            Leads
          </NavLink>

          <NavLink to="/leads/new" className="sidebar-link" onClick={closeSidebar}>
            <PlusCircle size={18} />
            Add Lead
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>

            <div>
              <h6 className="mb-0">LeadFlow CRM</h6>
              <small className="text-muted">Lead Management System</small>
            </div>
          </div>

          <div className="text-end">
            <p className="mb-0 fw-semibold">{user?.name}</p>
            <small className="text-muted">
              {user?.role === 1 ? "Admin" : "User"}
            </small>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;