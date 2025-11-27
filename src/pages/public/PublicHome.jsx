import React, { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import HeroSection from "../../components/public/HeroSection";
import PriceSection from "../../components/public/PriceSection";
import InfoSection from "../../components/public/InfoSection";
import FaqSection from "../../components/public/FaqSection";
import ContactSection from "../../components/public/ContactSection";
import TestimonialSection from "../../components/public/TestimonialSection";
import { useHashNavigation } from "../../utils/scrollUtils";
import LoginModal from "../../components/auth/LoginModal";
import SignupModal from "../../components/auth/SignupModal";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import ResetPasswordModal from "../../components/auth/ResetPasswordModal";

const PublicHome = () => {
  const handleHashNavigation = useHashNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    // If there's a section hash, scroll once, then clear it to prevent future auto-scrolls
    if (
      window.location.hash &&
      !window.location.hash.includes("showLogin") &&
      !window.location.hash.includes("access_token")
    ) {
      handleHashNavigation();
      // Clear the hash without reloading the page
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, [handleHashNavigation]);

  // Check for reset password token in URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const hashParams = hash.substring(1);
      const params = {};
      hashParams.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        if (key && value) {
          params[key] = decodeURIComponent(value);
        }
      });

      if (params.access_token) {
        setResetToken(params.access_token);
        setShowResetPasswordModal(true);
        // Clean up URL - remove hash but keep pathname
        const cleanPath = window.location.pathname;
        window.history.replaceState(null, "", cleanPath);
      }
    }
  }, []);

  // Listen for login button click from Navbar and hash trigger
  useEffect(() => {
    const handleShowLogin = () => {
      setShowLoginModal(true);
    };

    const handleShowSignup = () => {
      setShowSignupModal(true);
    };

    const checkHashForLogin = () => {
      if (window.location.hash === "#showLogin") {
        setShowLoginModal(true);
        window.history.replaceState(null, "", "/");
      }
    };

    const checkHashForSignup = () => {
      if (window.location.hash === "#showSignup") {
        setShowSignupModal(true);
        window.history.replaceState(null, "", "/");
      }
    };

    window.addEventListener("showLoginModal", handleShowLogin);
    window.addEventListener("showSignupModal", handleShowSignup);
    window.addEventListener("hashchange", checkHashForLogin);
    window.addEventListener("hashchange", checkHashForSignup);

    // Check on mount
    checkHashForLogin();
    checkHashForSignup();

    return () => {
      window.removeEventListener("showLoginModal", handleShowLogin);
      window.removeEventListener("showSignupModal", handleShowSignup);
      window.removeEventListener("hashchange", checkHashForLogin);
      window.removeEventListener("hashchange", checkHashForSignup);
    };
  }, []);

  return (
    <PublicLayout>
      <HeroSection />
      <section id="plans" className="scroll-mt-[3.7rem]">
        <PriceSection />
      </section>
      <section id="advantages" className="scroll-mt-[3.7rem]">
        <InfoSection />
      </section>
      <section id="questions" className="scroll-mt-[3.7rem]">
        <FaqSection />
      </section>
      <section id="contact" className="scroll-mt-[3.7rem]">
        <ContactSection />
      </section>
      <section id="testimonials" className="scroll-mt-[3.7rem]">
        <TestimonialSection />
      </section>

      {/* Auth Modals - Only render when open to properly destroy state */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onNavigateToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onNavigateToForgotPassword={() => {
            setShowLoginModal(false);
            setShowForgotPasswordModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onNavigateToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showForgotPasswordModal && (
        <ForgotPasswordModal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
          onNavigateToLogin={() => {
            setShowForgotPasswordModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showResetPasswordModal && (
        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          onClose={() => setShowResetPasswordModal(false)}
          resetToken={resetToken}
        />
      )}
    </PublicLayout>
  );
};

export default PublicHome;
