import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the hash from the current URL
    const hash = location.hash;

    // Navigate to home with the hash preserved
    if (hash) {
      navigate(`/${hash}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [location.hash, navigate]);

  return null;
};

export default ResetPasswordRedirect;
