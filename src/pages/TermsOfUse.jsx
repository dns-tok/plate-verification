import React, { useEffect } from "react";
import Layout from "../components/Layout";

const TermsOfUse = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms of Use
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provision of this agreement. If you
                  do not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Use License
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials on our website for personal, non-commercial
                  transitory viewing only. This is the grant of a license, not a
                  transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    Attempt to reverse engineer any software contained on the
                    website
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Service Description
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Our website provides information about car insurance services,
                  quotes, and related automotive services. We strive to provide
                  accurate and up-to-date information, but we cannot guarantee
                  the completeness or accuracy of all content.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. User Accounts
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Safeguarding the password and all activities under your
                    account
                  </li>
                  <li>
                    Notifying us immediately of any unauthorized use of your
                    account
                  </li>
                  <li>
                    Ensuring your account information remains accurate and
                    up-to-date
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Prohibited Uses
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>You may not use our website:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    For any unlawful purpose or to solicit others to perform
                    unlawful acts
                  </li>
                  <li>
                    To violate any international, federal, provincial, or state
                    regulations, rules, laws, or local ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights
                    or the intellectual property rights of others
                  </li>
                  <li>
                    To harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate
                  </li>
                  <li>To submit false or misleading information</li>
                  <li>
                    To upload or transmit viruses or any other type of malicious
                    code
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Disclaimer
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  The materials on our website are provided on an 'as is' basis.
                  We make no warranties, expressed or implied, and hereby
                  disclaim and negate all other warranties including without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Limitations
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  In no event shall our company or its suppliers be liable for
                  any damages (including, without limitation, damages for loss
                  of data or profit, or due to business interruption) arising
                  out of the use or inability to use the materials on our
                  website, even if we or our authorized representative has been
                  notified orally or in writing of the possibility of such
                  damage.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Accuracy of Materials
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  The materials appearing on our website could include
                  technical, typographical, or photographic errors. We do not
                  warrant that any of the materials on its website are accurate,
                  complete, or current. We may make changes to the materials
                  contained on its website at any time without notice.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Links
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We have not reviewed all of the sites linked to our website
                  and are not responsible for the contents of any such linked
                  site. The inclusion of any link does not imply endorsement by
                  us of the site. Use of any such linked website is at the
                  user's own risk.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Modifications
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may revise these terms of service for its website at any
                  time without notice. By using this website, you are agreeing
                  to be bound by the then current version of these terms of
                  service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Governing Law
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  These terms and conditions are governed by and construed in
                  accordance with the laws of [Your Country/State] and you
                  irrevocably submit to the exclusive jurisdiction of the courts
                  in that state or location.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Contact Information
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  If you have any questions about these Terms and Conditions,
                  please contact us at:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p>
                    <strong>Email:</strong> legal@carwebsite.com
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

export default TermsOfUse;
