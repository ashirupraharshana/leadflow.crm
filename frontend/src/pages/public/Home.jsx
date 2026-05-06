import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold brand-text" to="/">
            LeadFlow CRM
          </Link>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-brand">
              Login
            </Link>
            <Link to="/register" className="btn btn-brand">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="home-badge">CRM Lead Management System</span>

              <h1 className="home-title mt-3">
                Manage sales leads and track your business pipeline easily.
              </h1>

              <p className="home-description mt-3">
                LeadFlow CRM is a simple full-stack application for managing
                leads, tracking statuses, adding notes, and viewing sales
                performance through a clean dashboard.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/login" className="btn btn-brand btn-lg px-4">
                  Get Started
                </Link>

                <Link to="/register" className="btn btn-outline-dark btn-lg px-4">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="home-preview-card shadow-sm">
                <h5 className="fw-bold mb-3">CRM Overview</h5>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="preview-box">
                      <p>Total Leads</p>
                      <h3>120</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="preview-box">
                      <p>New Leads</p>
                      <h3>34</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="preview-box">
                      <p>Won Deals</p>
                      <h3>18</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="preview-box">
                      <p>Deal Value</p>
                      <h3>$42K</h3>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="small text-muted mb-2">Sales Pipeline</p>

                  <div className="pipeline-row">
                    <span>New</span>
                    <div className="progress">
                      <div className="progress-bar home-progress" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div className="pipeline-row">
                    <span>Qualified</span>
                    <div className="progress">
                      <div className="progress-bar home-progress" style={{ width: "55%" }}></div>
                    </div>
                  </div>

                  <div className="pipeline-row">
                    <span>Won</span>
                    <div className="progress">
                      <div className="progress-bar home-progress" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="home-feature-card">
                <h5>Lead Management</h5>
                <p>
                  Create, view, edit, delete, and update lead status through the CRM.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-feature-card">
                <h5>Lead Notes</h5>
                <p>
                  Add notes to each lead for follow-ups, calls, emails, and meetings.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-feature-card">
                <h5>Dashboard</h5>
                <p>
                  View total leads, won leads, lost leads, and estimated deal values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container text-center">
          <p className="mb-0">© 2026 LeadFlow CRM. Full-Stack CRM Application.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;