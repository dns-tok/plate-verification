import React, { useEffect } from "react";
import Layout from "../components/Layout";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg drop-shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We collect information you provide directly to us, such as
                  when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account or profile</li>
                  <li>Request quotes or services</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>
                  This may include your name, email address, phone number,
                  vehicle information, and other details you choose to provide.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Communicate about products, services, and promotions</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    To trusted service providers who assist us in operating our
                    website
                  </li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission
                  over the internet is 100% secure.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Cookies and Tracking
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. You can control cookie
                  settings through your browser preferences.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Third-Party Links
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices of these external
                  sites.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Changes to This Policy
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Contact Us
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  If you have any questions about this privacy policy, please
                  contact us at:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>
                    <strong>Email:</strong> privacy@carwebsite.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Car Street, Auto City, AC
                    12345
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">*Dummy Content</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
