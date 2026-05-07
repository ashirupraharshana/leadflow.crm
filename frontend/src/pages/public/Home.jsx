import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  Search,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <div className="container">
          <div className="home-nav-content">
            <Link className="home-brand" to="/">
              <span className="home-brand-icon">L</span>
              LeadFlow CRM
            </Link>

            <div className="home-nav-actions">
              <Link to="/login" className="btn home-login-btn">
                Login
              </Link>
              <Link to="/register" className="btn home-register-btn">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="home-hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="home-badge">
                <TrendingUp size={16} />
                Full-Stack CRM Lead Management System
              </div>

              <h1 className="home-title">
                Organize leads, track progress, and manage your sales pipeline.
              </h1>

              <p className="home-description">
                LeadFlow CRM helps sales teams manage customer leads, update
                pipeline statuses, add follow-up notes, and view important sales
                insights through a clean dashboard.
              </p>

              <div className="home-hero-actions">
                <Link to="/login" className="btn home-primary-btn">
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <Link to="/register" className="btn home-secondary-btn">
                  Create Account
                </Link>
              </div>

              <div className="home-trust-row">
                <div className="home-trust-item">
                  <ShieldCheck size={18} />
                  Secure Login
                </div>

                <div className="home-trust-item">
                  <CheckCircle2 size={18} />
                  Lead CRUD
                </div>

                <div className="home-trust-item">
                  <Search size={18} />
                  Search & Filters
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="home-preview-card">
                <div className="home-preview-header">
                  <div>
                    <h5>CRM Workspace Preview</h5>
                    <p>Lead management dashboard</p>
                  </div>

                  <span className="home-status-badge">Active</span>
                </div>

                <div className="home-preview-grid">
                  <div className="home-preview-box">
                    <UsersRound size={22} />
                    <span>Total Leads</span>
                    <strong>Lead Records</strong>
                  </div>

                  <div className="home-preview-box">
                    <ClipboardList size={22} />
                    <span>Pipeline</span>
                    <strong>Status Tracking</strong>
                  </div>

                  <div className="home-preview-box">
                    <MessageSquareText size={22} />
                    <span>Notes</span>
                    <strong>Follow-ups</strong>
                  </div>

                  <div className="home-preview-box">
                    <BarChart3 size={22} />
                    <span>Dashboard</span>
                    <strong>Sales Insights</strong>
                  </div>
                </div>

                <div className="home-pipeline-panel">
                  <div className="home-panel-title">
                    <span>Pipeline Stages</span>
                    <small>CRM Flow</small>
                  </div>

                  <div className="home-stage-list">
                    <div className="home-stage-item">
                      <span>New</span>
                      <div className="home-stage-line"></div>
                    </div>

                    <div className="home-stage-item">
                      <span>Contacted</span>
                      <div className="home-stage-line"></div>
                    </div>

                    <div className="home-stage-item">
                      <span>Qualified</span>
                      <div className="home-stage-line"></div>
                    </div>

                    <div className="home-stage-item">
                      <span>Won / Lost</span>
                    </div>
                  </div>
                </div>

                <div className="home-note-preview">
                  <MessageSquareText size={18} />
                  <p>
                    Add internal notes after calls, emails, meetings, and
                    follow-up activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <UsersRound size={24} />
              </div>
              <h5>Lead Management</h5>
              <p>
                Create, view, edit, delete, and update leads through a structured
                CRM workflow.
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <MessageSquareText size={24} />
              </div>
              <h5>Lead Notes</h5>
              <p>
                Store follow-up notes for calls, emails, meetings, and customer
                communication history.
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <BarChart3 size={24} />
              </div>
              <h5>Dashboard Insights</h5>
              <p>
                Monitor total leads, new leads, qualified leads, won leads, lost
                leads, and deal values.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p>© 2026 LeadFlow CRM. Full-Stack CRM Lead Management System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;