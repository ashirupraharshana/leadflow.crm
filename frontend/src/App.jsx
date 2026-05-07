import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import Leads from "./pages/admin/Leads";
import LeadForm from "./pages/admin/LeadForm";
import LeadDetails from "./pages/admin/LeadDetails";

const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/user/dashboard" replace />;
};

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <DashboardRedirect /> : <Home />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? <DashboardRedirect /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <DashboardRedirect /> : <Register />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRoles={[1]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <RoleRoute allowedRoles={[0]}>
              <UserDashboard />
            </RoleRoute>
          }
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/leads"
  element={
    <ProtectedRoute>
      <Leads />
    </ProtectedRoute>
  }
/>

<Route
  path="/leads/new"
  element={
    <ProtectedRoute>
      <LeadForm />
    </ProtectedRoute>
  }
/>

<Route
  path="/leads/:id"
  element={
    <ProtectedRoute>
      <LeadDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/leads/:id/edit"
  element={
    <ProtectedRoute>
      <LeadForm />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;