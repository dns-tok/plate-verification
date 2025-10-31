import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Public pages (from frontend)
import PublicHome from "../pages/public/PublicHome";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsOfUse from "../pages/public/TermsOfUse";

import ResetPasswordRedirect from "../components/auth/ResetPasswordRedirect";
import AboutUs from "../pages/public/AboutUs";
import HowItWorks from "../pages/public/HowItWorks";

// Dashboard pages (from user-panel)
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
import Payment from "../pages/dashboard/Payment";
import DashboardPage from "../pages/dashboard/Dashboard";

// Auth route wrapper to redirect authenticated users
// function AuthRoute({ children }) {
//   const { accessToken, loading } = useAuth();

//   if (loading) return null;
//   if (accessToken) return <Navigate to="/" replace />;

//   return children;
// }

// Public route wrapper to redirect authenticated users to dashboard
function PublicRoute({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;
  if (accessToken) return <Navigate to="/buy-consultation" replace />;

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

      <Route
        path="/how-it-works"
        element={
          <PublicRoute>
            <HowItWorks />
          </PublicRoute>
        }
      />

      <Route
        path="/about-us"
        element={
          <PublicRoute>
            <AboutUs />
          </PublicRoute>
        }
      />
      {/* Auth Redirects */}
      <Route path="/reset-password" element={<ResetPasswordRedirect />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/buy-consultation"
        element={
          <PrivateRoute>
            <DashboardPage />
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
      <Route path="/payment" element={<Payment />} />

      {/* Catch all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
