import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../api/api";
import AdminLayout from "../../components/AdminLayout";

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

const sourceOptions = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Email",
  "Event",
  "Facebook",
  "Other",
];

const LeadForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    leadSource: "Website",
    assignedSalesperson: "",
    status: "NEW",
    estimatedDealValue: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchLead = async () => {
    try {
      const response = await api.get(`/leads/${id}`);

      setFormData({
        leadName: response.data.leadName || "",
        companyName: response.data.companyName || "",
        email: response.data.email || "",
        phoneNumber: response.data.phoneNumber || "",
        leadSource: response.data.leadSource || "Website",
        assignedSalesperson: response.data.assignedSalesperson || "",
        status: response.data.status || "NEW",
        estimatedDealValue: response.data.estimatedDealValue || "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load lead.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchLead();
    }
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...formData,
      estimatedDealValue: Number(formData.estimatedDealValue || 0),
    };

    try {
      if (isEditMode) {
        await api.put(`/leads/${id}`, payload);
        navigate(`/leads/${id}`);
      } else {
        await api.post("/leads", payload);
        navigate("/leads");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save lead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            {isEditMode ? "Edit Lead" : "Add Lead"}
          </h2>
          <p className="text-muted mb-0">
            {isEditMode
              ? "Update lead information and pipeline details."
              : "Create a new sales lead for the CRM pipeline."}
          </p>
        </div>

        <Link to="/leads" className="btn btn-outline-secondary">
          <ArrowLeft size={18} className="me-2" />
          Back to Leads
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3"></div>
              <p className="text-muted mb-0">Loading lead...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Lead Name</label>
                    <input
                      type="text"
                      name="leadName"
                      className="form-control"
                      value={formData.leadName}
                      onChange={handleChange}
                      placeholder="Enter lead name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Lead Source</label>
                    <select
                      name="leadSource"
                      className="form-select"
                      value={formData.leadSource}
                      onChange={handleChange}
                      required
                    >
                      {sourceOptions.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Assigned Salesperson</label>
                    <input
                      type="text"
                      name="assignedSalesperson"
                      className="form-control"
                      value={formData.assignedSalesperson}
                      onChange={handleChange}
                      placeholder="Enter salesperson name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Estimated Deal Value</label>
                    <input
                      type="number"
                      name="estimatedDealValue"
                      className="form-control"
                      value={formData.estimatedDealValue}
                      onChange={handleChange}
                      placeholder="Enter estimated value"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-brand" disabled={saving}>
                    <Save size={18} className="me-2" />
                    {saving ? "Saving..." : "Save Lead"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default LeadForm;