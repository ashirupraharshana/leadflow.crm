import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  MessageSquare,
  Send,
  Edit3,
  Trash2,
  Save,
  X,
} from "lucide-react";
import api from "../../api/api";
import AdminLayout from "../../components/AdminLayout";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(true);

  const [error, setError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [noteSuccess, setNoteSuccess] = useState("");

  const [noteContent, setNoteContent] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [updatingNote, setUpdatingNote] = useState(false);

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

  const fetchNotes = async () => {
    try {
      const response = await api.get(`/leads/${id}/notes`);
      setNotes(response.data);
    } catch (error) {
      setNoteError(error.response?.data?.message || "Failed to load notes.");
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  const handleAddNote = async (event) => {
    event.preventDefault();

    if (!noteContent.trim()) {
      setNoteError("Note content is required.");
      return;
    }

    setSavingNote(true);
    setNoteError("");
    setNoteSuccess("");

    try {
      await api.post(`/leads/${id}/notes`, {
        noteContent: noteContent.trim(),
      });

      setNoteContent("");
      setNoteSuccess("Note added successfully.");
      fetchNotes();
    } catch (error) {
      setNoteError(error.response?.data?.message || "Failed to add note.");
    } finally {
      setSavingNote(false);
    }
  };

  const startEditingNote = (note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.noteContent);
    setNoteError("");
    setNoteSuccess("");
  };

  const cancelEditingNote = () => {
    setEditingNoteId(null);
    setEditingContent("");
  };

  const handleUpdateNote = async (noteId) => {
    if (!editingContent.trim()) {
      setNoteError("Note content is required.");
      return;
    }

    setUpdatingNote(true);
    setNoteError("");
    setNoteSuccess("");

    try {
      await api.put(`/leads/${id}/notes/${noteId}`, {
        noteContent: editingContent.trim(),
      });

      setEditingNoteId(null);
      setEditingContent("");
      setNoteSuccess("Note updated successfully.");
      fetchNotes();
    } catch (error) {
      setNoteError(error.response?.data?.message || "Failed to update note.");
    } finally {
      setUpdatingNote(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    setNoteError("");
    setNoteSuccess("");

    try {
      await api.delete(`/leads/${id}/notes/${noteId}`);
      setNoteSuccess("Note deleted successfully.");
      fetchNotes();
    } catch (error) {
      setNoteError(error.response?.data?.message || "Failed to delete note.");
    }
  };

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
            View lead information, pipeline status, and follow-up notes.
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

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <MessageSquare size={22} className="text-brand" />
                  <h5 className="fw-bold mb-0">Lead Notes</h5>
                </div>

                {noteError && (
                  <div className="alert alert-danger py-2">{noteError}</div>
                )}

                {noteSuccess && (
                  <div className="alert alert-success py-2">{noteSuccess}</div>
                )}

                <form onSubmit={handleAddNote} className="mb-4">
                  <label className="form-label">Add New Note</label>
                  <textarea
                    className="form-control note-textarea"
                    rows="4"
                    value={noteContent}
                    onChange={(event) => setNoteContent(event.target.value)}
                    placeholder="Write a follow-up note, call update, meeting summary, or internal comment..."
                  ></textarea>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="submit"
                      className="btn btn-brand"
                      disabled={savingNote}
                    >
                      <Send size={18} className="me-2" />
                      {savingNote ? "Adding..." : "Add Note"}
                    </button>
                  </div>
                </form>

                {notesLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary mb-3"></div>
                    <p className="text-muted mb-0">Loading notes...</p>
                  </div>
                ) : notes.length === 0 ? (
                  <div className="empty-notes-box">
                    <MessageSquare size={28} />
                    <h6 className="fw-bold mt-2 mb-1">No notes yet</h6>
                    <p className="text-muted mb-0">
                      Add the first note for this lead.
                    </p>
                  </div>
                ) : (
                  <div className="notes-list">
                    {notes.map((note) => (
                      <div className="note-card" key={note.id}>
                        {editingNoteId === note.id ? (
                          <>
                            <textarea
                              className="form-control note-textarea"
                              rows="3"
                              value={editingContent}
                              onChange={(event) =>
                                setEditingContent(event.target.value)
                              }
                            ></textarea>

                            <div className="d-flex justify-content-end gap-2 mt-3">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={cancelEditingNote}
                              >
                                <X size={16} className="me-1" />
                                Cancel
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-brand"
                                onClick={() => handleUpdateNote(note.id)}
                                disabled={updatingNote}
                              >
                                <Save size={16} className="me-1" />
                                {updatingNote ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between gap-3">
                              <p className="note-content">{note.noteContent}</p>

                              <div className="note-actions">
                                <button
                                  type="button"
                                  className="note-action-btn edit"
                                  onClick={() => startEditingNote(note)}
                                  title="Edit note"
                                >
                                  <Edit3 size={16} />
                                </button>

                                <button
                                  type="button"
                                  className="note-action-btn delete"
                                  onClick={() => handleDeleteNote(note.id)}
                                  title="Delete note"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="note-meta">
                              <span>Created by {note.createdBy}</span>
                              <span>{formatDate(note.createdDate)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                <h5 className="fw-bold mb-3">Note Summary</h5>

                <div className="detail-box">
                  <span>Total Notes</span>
                  <p>{notes.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default LeadDetails;