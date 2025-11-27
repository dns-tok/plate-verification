import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { WalletProvider } from "./context/WalletContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routing/AppRoutes";
import CartOverlay from "./components/dashboard/Cart/CartOverlay";

function AppContent() {
  useEffect(() => {
    // Meta Pixel - ViewContent event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Página Principal',
        content_category: 'Website'
      });
    }

    // Função para detectar browser e versão
    const getBrowserInfo = () => {
      const ua = navigator.userAgent;
      let browserName = 'Unknown';
      let browserVersion = 'Unknown';
      let osName = 'Unknown';
      let osVersion = 'Unknown';

      // Detectar Browser
      if (ua.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
        browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
      } else if (ua.indexOf('Edg') > -1) {
        browserName = 'Edge';
        browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
      } else if (ua.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
        browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
      } else if (ua.indexOf('Safari') > -1) {
        browserName = 'Safari';
        browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
      } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
        browserName = 'Internet Explorer';
        browserVersion = ua.match(/(?:MSIE |rv:)(\d+\.\d+)/)?.[1] || 'Unknown';
      }

      // Detectar OS
      if (ua.indexOf('Windows NT 10.0') > -1) osName = 'Windows 10/11';
      else if (ua.indexOf('Windows NT 6.3') > -1) osName = 'Windows 8.1';
      else if (ua.indexOf('Windows NT 6.2') > -1) osName = 'Windows 8';
      else if (ua.indexOf('Windows NT 6.1') > -1) osName = 'Windows 7';
      else if (ua.indexOf('Mac OS X') > -1) {
        osName = 'macOS';
        osVersion = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/)?.[1].replace(/_/g, '.') || 'Unknown';
      } else if (ua.indexOf('Android') > -1) {
        osName = 'Android';
        osVersion = ua.match(/Android (\d+\.\d+)/)?.[1] || 'Unknown';
      } else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
        osName = ua.indexOf('iPhone') > -1 ? 'iOS (iPhone)' : 'iOS (iPad)';
        osVersion = ua.match(/OS (\d+_\d+)/)?.[1].replace(/_/g, '.') || 'Unknown';
      } else if (ua.indexOf('Linux') > -1) osName = 'Linux';

      return { browserName, browserVersion, osName, osVersion };
    };

    // Função para enviar dados do visitante
    const sendVisitorInfo = () => {
      try {
        const browserInfo = getBrowserInfo();
        
        const visitorData = {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent,
          browser: browserInfo.browserName,
          browserVersion: browserInfo.browserVersion,
          os: browserInfo.osName,
          osVersion: browserInfo.osVersion,
          language: navigator.language,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          screenResolution: `${screen.width}x${screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          online: navigator.onLine,
          connection: navigator.connection ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
          } : null,
          sessionId: sessionStorage.getItem('sessionId') || 
            (() => {
              const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
              sessionStorage.setItem('sessionId', id);
              return id;
            })(),
          pageLoadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0,
          source: 'placaverificada'
        };

        // Usar sendBeacon para evitar CORS
        const data = JSON.stringify(visitorData);
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            'https://primary-production-5b6d1.up.railway.app/webhook/20e1b7f7-ead1-4aac-926c-8bdae48eb42f',
            data
          );
        }
      } catch (error) {
        console.log('Erro ao enviar dados do visitante:', error);
      }
    };

    // Executar após 2 segundos para não impactar performance
    const timer = setTimeout(sendVisitorInfo, 2000);
    return () => clearTimeout(timer);
  }, []);

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
            <Analytics />
            <SpeedInsights />
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
