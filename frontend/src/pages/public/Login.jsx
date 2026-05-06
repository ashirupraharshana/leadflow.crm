import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-large shadow-lg">
        <div className="auth-logo">
          <LogIn size={28} />
        </div>

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Welcome Back</h2>
          <p className="auth-subtitle mb-0">
            Sign in to continue to your LeadFlow CRM workspace.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger auth-alert" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
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
                placeholder="Enter your password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn auth-btn w-100" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0 auth-link-text">
          Do not have an account?{" "}
          <Link to="/register" className="auth-link">
            Register
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

export default Login;