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
    handleHashNavigation();
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

  // Listen for login button click from Navbar
  useEffect(() => {
    const handleShowLogin = () => {
      setShowLoginModal(true);
    };

    window.addEventListener("showLoginModal", handleShowLogin);

    return () => {
      window.removeEventListener("showLoginModal", handleShowLogin);
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
      <TestimonialSection />

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
