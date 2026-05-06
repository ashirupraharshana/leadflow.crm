import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, LockKeyhole, UserPlus, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);

      setSuccess("Registration successful. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-large shadow-lg">
        <div className="auth-logo">
          <UserPlus size={28} />
        </div>

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Create Account</h2>
          <p className="auth-subtitle mb-0">
            Register your account to access LeadFlow CRM.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger auth-alert" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success auth-alert" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-icon-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="name"
                className="form-control auth-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                className="form-control auth-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-icon-wrapper">
              <LockKeyhole className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                className="form-control auth-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn auth-btn w-100" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0 auth-link-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>

        <p className="text-center mt-3 mb-0">
          <Link to="/" className="back-home-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;