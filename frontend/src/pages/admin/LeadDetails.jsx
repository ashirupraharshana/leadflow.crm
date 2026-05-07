import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import api from "../../api/api";
import AdminLayout from "../../components/AdminLayout";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLead = async () => {
    try {
      const response = await api.get(`/leads/${id}`);
      setLead(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load lead details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString();
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Lead Details</h2>
          <p className="text-muted mb-0">
            View lead information and sales pipeline status.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/leads" className="btn btn-outline-secondary">
            <ArrowLeft size={18} className="me-2" />
            Back
          </Link>

          {lead && (
            <Link to={`/leads/${lead.id}/edit`} className="btn btn-brand">
              <Pencil size={18} className="me-2" />
              Edit
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary mb-3"></div>
            <p className="text-muted mb-0">Loading lead details...</p>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-1">{lead.leadName}</h4>
                <p className="text-muted mb-4">{lead.companyName}</p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Email</span>
                      <p>{lead.email}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Phone Number</span>
                      <p>{lead.phoneNumber || "-"}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Lead Source</span>
                      <p>{lead.leadSource}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Assigned Salesperson</span>
                      <p>{lead.assignedSalesperson}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Status</span>
                      <p>{lead.statusLabel}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="detail-box">
                      <span>Estimated Deal Value</span>
                      <p>Rs. {formatMoney(lead.estimatedDealValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Record Information</h5>

                <div className="detail-box mb-3">
                  <span>Created Date</span>
                  <p>{formatDate(lead.createdDate)}</p>
                </div>

                <div className="detail-box">
                  <span>Last Updated Date</span>
                  <p>{formatDate(lead.lastUpdatedDate)}</p>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <h5 className="fw-bold mb-2">Lead Notes</h5>
                <p className="text-muted mb-0">
                  Notes will be added in the next feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default LeadDetails;