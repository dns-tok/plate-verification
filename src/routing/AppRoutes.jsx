import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Public pages (from frontend)
import PublicHome from "../pages/public/PublicHome";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsOfUse from "../pages/public/TermsOfUse";

// Auth pages (from user-panel)
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ConfirmEmail from "../pages/auth/ConfirmEmail";

// Dashboard pages (from user-panel)
import { Home as DashboardHome } from "../pages/dashboard/Home";
import Consultation from "../pages/dashboard/Consultation";
import Recommend from "../pages/dashboard/Recommend";
import Profile from "../pages/dashboard/Profile";
import Connected from "../pages/dashboard/Connected";
import DeleteAccount from "../pages/dashboard/DeleteAccount";
import Blogs from "../pages/dashboard/Blogs";
import Contact from "../pages/dashboard/Contact";
import QueryHistoryPage from "../pages/dashboard/QueryHistory";
import PurchaseHistoryPage from "../pages/dashboard/PurchaseHistory";

// Layout components
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "../pages/dashboard/PageNotFound";

// Auth route wrapper to redirect authenticated users
function AuthRoute({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;
  if (accessToken) return <Navigate to="/dashboard" replace />;

  return children;
}

// Public route wrapper to redirect authenticated users to dashboard
function PublicRoute({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;
  if (accessToken) return <Navigate to="/dashboard" replace />;

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <PublicHome />
          </PublicRoute>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <PublicRoute>
            <PrivacyPolicy />
          </PublicRoute>
        }
      />
      <Route
        path="/terms-of-use"
        element={
          <PublicRoute>
            <TermsOfUse />
          </PublicRoute>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        }
      />
      <Route
        path="/confirm-email"
        element={
          <AuthRoute>
            <ConfirmEmail />
          </AuthRoute>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Consultation />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-consultation"
        element={
          <PrivateRoute>
            <Consultation />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <QueryHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-recommendations"
        element={
          <PrivateRoute>
            <Recommend />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/purchases"
        element={
          <PrivateRoute>
            <PurchaseHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/always-connected"
        element={
          <PrivateRoute>
            <Connected />
          </PrivateRoute>
        }
      />
      <Route
        path="/delete-account"
        element={
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
