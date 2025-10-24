import { useNavigate } from "react-router-dom";

/**
 * Utility functions for scroll operations
 */

/**
 * Scrolls to a specific section on the page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Object} options - Scroll options
 * @param {boolean} options.closeMenu - Whether to close mobile menu (default: false)
 * @param {number} options.delay - Delay before scrolling in ms (default: 0)
 */
export const scrollToSection = (sectionId, options = {}) => {
  const { closeMenu = false, delay = 0 } = options;

  const performScroll = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    performScroll();
  }
};

/**
 * Scrolls to the top of the page
 * @param {boolean} smooth - Whether to use smooth scrolling (default: true)
 */
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

/**
 * Smart scroll function that handles navigation between pages
 * If not on home page, navigates to home with hash, otherwise scrolls directly
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Function} navigate - React Router navigate function
 * @param {Function} closeMenu - Optional function to close mobile menu
 * @param {number} delay - Delay before scrolling in ms (default: 0)
 */
export const smartScrollToSection = (
  sectionId,
  navigate,
  closeMenu = null,
  delay = 0
) => {
  if (window.location.pathname !== "/") {
    // If not on home page, navigate to home with hash
    navigate(`/#${sectionId}`);
  } else {
    // If on home page, scroll directly to section
    if (closeMenu) {
      closeMenu();
    }
    scrollToSection(sectionId, { delay });
  }
};

/**
 * Hook for handling hash navigation when component mounts
 * Use this in pages that need to handle hash navigation from other pages
 */
export const useHashNavigation = () => {
  const handleHashNavigation = () => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      scrollToSection(sectionId, { delay: 100 });
    }
  };

  return handleHashNavigation;
};

/**
 * Hook for scroll to top on component mount
 * Use this in pages that should start at the top when loaded
 */
export const useScrollToTop = () => {
  const scrollToTopOnMount = () => {
    scrollToTop(true);
  };

  return scrollToTopOnMount;
};
