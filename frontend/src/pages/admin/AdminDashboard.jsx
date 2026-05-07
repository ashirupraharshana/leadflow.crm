import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, UsersRound, Trophy, XCircle, BadgeDollarSign } from "lucide-react";
import api from "../../api/api";
import AdminLayout from "../../components/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    wonLeads: 0,
    lostLeads: 0,
    totalEstimatedValue: 0,
    totalWonValue: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/leads");
      const leads = response.data;

      const calculatedStats = {
        totalLeads: leads.length,
        newLeads: leads.filter((lead) => lead.status === "NEW").length,
        qualifiedLeads: leads.filter((lead) => lead.status === "QUALIFIED").length,
        wonLeads: leads.filter((lead) => lead.status === "WON").length,
        lostLeads: leads.filter((lead) => lead.status === "LOST").length,
        totalEstimatedValue: leads.reduce(
          (sum, lead) => sum + Number(lead.estimatedDealValue || 0),
          0
        ),
        totalWonValue: leads
          .filter((lead) => lead.status === "WON")
          .reduce((sum, lead) => sum + Number(lead.estimatedDealValue || 0), 0),
      };

      setStats(calculatedStats);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">
            Overview of leads, pipeline progress, and estimated deal values.
          </p>
        </div>

        <Link to="/leads/new" className="btn btn-brand">
          <PlusCircle size={18} className="me-2" />
          Add Lead
        </Link>
      </div>

      {loading ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary mb-3"></div>
            <p className="text-muted mb-0">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="dashboard-stat-card">
                <UsersRound size={24} />
                <p>Total Leads</p>
                <h3>{stats.totalLeads}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-stat-card">
                <PlusCircle size={24} />
                <p>New Leads</p>
                <h3>{stats.newLeads}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-stat-card">
                <Trophy size={24} />
                <p>Won Leads</p>
                <h3>{stats.wonLeads}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-stat-card">
                <XCircle size={24} />
                <p>Lost Leads</p>
                <h3>{stats.lostLeads}</h3>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Qualified Leads</p>
                  <h4 className="fw-bold mb-0">{stats.qualifiedLeads}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Total Estimated Deal Value</p>
                  <h4 className="fw-bold mb-0">Rs. {formatMoney(stats.totalEstimatedValue)}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1">Total Value of Won Deals</p>
                  <h4 className="fw-bold mb-0">Rs. {formatMoney(stats.totalWonValue)}</h4>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;