import { Navigate } from "react-router-dom";
import PrivateLayout from "../components/layout/PrivateLayout";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;
  if (!accessToken) return <Navigate to="/login" replace />;

  return <PrivateLayout>{children}</PrivateLayout>;
}
