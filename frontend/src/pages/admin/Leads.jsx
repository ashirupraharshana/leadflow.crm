import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import api from "../../api/api";
import AdminLayout from "../../components/AdminLayout";

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

const sourceOptions = [
  "",
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Email",
  "Event",
  "Facebook",
  "Other",
];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    leadSource: "",
    assignedSalesperson: "",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const params = {};

      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.leadSource) params.leadSource = filters.leadSource;
      if (filters.assignedSalesperson) {
        params.assignedSalesperson = filters.assignedSalesperson;
      }

      const response = await api.get("/leads", { params });
      setLeads(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchLeads();
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "",
      leadSource: "",
      assignedSalesperson: "",
    });

    setTimeout(fetchLeads, 0);
  };

  const handleStatusChange = async (leadId, status) => {
    try {
      await api.patch(`/leads/${leadId}/status`, { status });
      fetchLeads();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (leadId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/leads/${leadId}`);
      fetchLeads();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete lead.");
    }
  };

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Leads</h2>
          <p className="text-muted mb-0">
            Manage customer leads and sales pipeline progress.
          </p>
        </div>

        <Link to="/leads/new" className="btn btn-brand">
          <PlusCircle size={18} className="me-2" />
          Add Lead
        </Link>
      </div>

      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSearchSubmit}>
            <div className="row g-3">
              <div className="col-lg-4">
                <label className="form-label">Search</label>
                <div className="input-icon-wrapper">
                  <Search className="input-icon" size={18} />
                  <input
                    type="text"
                    name="search"
                    className="form-control auth-input"
                    placeholder="Lead name, company, or email"
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="col-lg-2">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-2">
                <label className="form-label">Source</label>
                <select
                  name="leadSource"
                  className="form-select"
                  value={filters.leadSource}
                  onChange={handleFilterChange}
                >
                  {sourceOptions.map((source) => (
                    <option key={source || "all"} value={source}>
                      {source || "All Sources"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-2">
                <label className="form-label">Salesperson</label>
                <input
                  type="text"
                  name="assignedSalesperson"
                  className="form-control"
                  placeholder="Name"
                  value={filters.assignedSalesperson}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-lg-2 d-flex align-items-end gap-2">
                <button type="submit" className="btn btn-brand w-100">
                  Filter
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3"></div>
              <p className="text-muted mb-0">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="fw-bold">No leads found</h5>
              <p className="text-muted">Create your first lead to start managing the pipeline.</p>
              <Link to="/leads/new" className="btn btn-brand">
                Add Lead
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Company</th>
                    <th>Source</th>
                    <th>Salesperson</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <p className="fw-semibold mb-0">{lead.leadName}</p>
                        <small className="text-muted">{lead.email}</small>
                      </td>

                      <td>{lead.companyName}</td>
                      <td>{lead.leadSource}</td>
                      <td>{lead.assignedSalesperson}</td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value)
                          }
                        >
                          {statusOptions
                            .filter((status) => status.value !== "")
                            .map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td>Rs. {formatMoney(lead.estimatedDealValue)}</td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            to={`/leads/${lead.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <Eye size={16} />
                          </Link>

                          <Link
                            to={`/leads/${lead.id}/edit`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(lead.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Leads;