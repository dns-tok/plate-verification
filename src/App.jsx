import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { WalletProvider } from "./context/WalletContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routing/AppRoutes";
import CartOverlay from "./components/dashboard/Cart/CartOverlay";

function AppContent() {
  return (
    <>
      <AppRoutes />
      <CartOverlay />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WalletProvider>
            <AppContent />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </WalletProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
