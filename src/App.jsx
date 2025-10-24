import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routing/AppRoutes";
import CartOverlay from "./components/dashboard/Cart/CartOverlay";
import { useCart } from "./context/CartContext";

function AppContent() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <AppRoutes />
      <CartOverlay isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
