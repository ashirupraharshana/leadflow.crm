import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">LeadFlow CRM</span>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <p className="mb-0 fw-semibold">{user?.name}</p>
              <small className="text-muted">
                User Dashboard | Role: {user?.role}
              </small>
            </div>

            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <h1 className="fw-bold mb-1">User Dashboard</h1>
        <p className="text-muted">
          Manage your assigned leads, update statuses, and add follow-up notes.
        </p>

        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm stat-card">
              <div className="card-body">
                <p className="text-muted mb-1">My Leads</p>
                <h3 className="fw-bold">0</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm stat-card">
              <div className="card-body">
                <p className="text-muted mb-1">New Leads</p>
                <h3 className="fw-bold">0</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm stat-card">
              <div className="card-body">
                <p className="text-muted mb-1">Won Leads</p>
                <h3 className="fw-bold">0</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5 className="fw-bold">User Access</h5>
            <p className="text-muted mb-0">
              This page is only accessible for users with role value 0.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;