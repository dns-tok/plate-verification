import React, { useEffect } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import { useScrollToTop } from "../../utils/scrollUtils";

const TermsOfUse = () => {
  const scrollToTopOnMount = useScrollToTop();

  useEffect(() => {
    scrollToTopOnMount();
  }, [scrollToTopOnMount]);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Terms and Conditions of Use of the Service
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Definitions
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <strong>Electronic acceptance:</strong> Digital confirmation
                    that the CONTRACTOR agrees to the terms of this contract.
                  </li>
                  <li>
                    <strong>Database:</strong> Structured set of information,
                    personal or otherwise, stored in physical or electronic
                    format.
                  </li>
                  <li>
                    <strong>Personal data:</strong> Information that identifies
                    or can identify a natural person.
                  </li>
                  <li>
                    <strong>Electronic address:</strong> Email provided by the
                    CONTRACTOR at the time of registration.
                  </li>
                  <li>
                    <strong>Verified Plate System:</strong> Technological
                    platform developed by the CONTRACTOR, which allows vehicle
                    queries through a software usage license.
                  </li>
                  <li>
                    <strong>Electronic verification:</strong> Digital way for
                    the CONTRACTOR to access information about vehicles.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Premises
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>2.1.</strong> The CONTRACTOR developed the Verified
                    License Plate System, which allows users to perform vehicle
                    searches based on data obtained from public and private
                    sources.
                  </p>
                  <p>
                    <strong>2.2.</strong> The CONTRACTOR expresses interest in
                    accessing the data made available by the platform.
                  </p>
                  <p>
                    <strong>2.3.</strong> The PARTIES wish to formalize this
                    SERVICE PROVISION AGREEMENT, which will be governed by the
                    following clauses.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Of the Parties
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>3.1.</strong> The following are parties to this
                    instrument:
                  </p>
                  <p>
                    Prototyp3 Computer Services LTDA, registered with the
                    CNPJ/ME under no. 62,718,731/0001-24, with registered office
                    at AVENIDA PAULISTA, 1471 - CONJ 511, CEP 01311-927, BELA
                    VISTA, SÃO PAULO – SP, hereinafter referred to as
                    CONTRACTOR; and the individual identified as CONTRACTING
                    PARTY, referred to individually as PARTY and jointly as
                    PARTIES.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Declarations
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    The CONTRACTOR declares, under legal responsibility, that:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      You are over 18 years of age and are eligible to hire and
                      use the CONTRACTOR's services.
                    </li>
                    <li>
                      Electronic acceptance will be carried out at the time of
                      registration and will be considered valid and binding.
                    </li>
                    <li>
                      You are solely responsible for your login and password and
                      must keep them safe.
                    </li>
                    <li>
                      You will use the services in accordance with the terms of
                      this contract, the platform guidelines and current
                      legislation.
                    </li>
                    <li>
                      You will provide true and up-to-date registration data,
                      assuming responsibility for its veracity.
                    </li>
                    <li>
                      Is financially responsible for the contracted services.
                    </li>
                    <li>
                      Acknowledges that the CONTRACTOR provides information
                      about vehicles and is not responsible for decisions made
                      based on this data.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Object
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>5.1.</strong> The purpose of this contract is to
                    grant the CONTRACTOR a license to use the software to access
                    the Verified Plate System.
                  </p>
                  <p>
                    <strong>5.1.1.</strong> Vehicle inquiries present data such
                    as registration information, debts and various records,
                    depending on the type of inquiry contracted.
                  </p>
                  <p>
                    <strong>5.1.2.</strong> THE CONTRACTOR offers different
                    consultation methods, with specific data and prices,
                    available for viewing on the platform.
                  </p>
                  <p>
                    <strong>5.1.3.</strong> THE CONTRACTOR may create, modify or
                    discontinue consultation types and their respective prices,
                    without prior notice.
                  </p>
                  <p>
                    <strong>5.2.</strong> THE CONTRACTOR has the right to use
                    and distribute data obtained from third parties and is not
                    responsible for its content or updates.
                  </p>
                  <p>
                    <strong>5.2.1.</strong> Not all data is available for all
                    vehicles. The lack of specific information does not
                    guarantee a refund, except in the cases provided for.
                  </p>
                  <p>
                    <strong>5.2.2.</strong> In case of temporary unavailability,
                    the CONTRACTOR may request reprocessing of the information
                    within 24 hours.
                  </p>
                  <p>
                    <strong>5.2.3.</strong> Refund requests must be made through
                    the CONTRACTOR's official channels.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Registration
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>6.1.</strong> The CONTRACTOR must register on the
                    platform, providing mandatory data and creating a login and
                    password.
                  </p>
                  <p>
                    <strong>6.2.</strong> The password will be sent to the
                    registered email address and can be changed in the logged-in
                    area.
                  </p>
                  <p>
                    <strong>6.3.</strong> Registration implies full acceptance
                    of the terms of this agreement.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Consultation Booking
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>7.1.</strong> Consultations may be free or paid.
                  </p>
                  <p>
                    <strong>7.2.</strong> Paid consultations require prior
                    purchase of credits.
                  </p>
                  <p>
                    <strong>7.2.1.</strong> Credits will be released after
                    payment confirmation.
                  </p>
                  <p>
                    <strong>7.2.2.</strong> Validity of credits: 12 months.
                  </p>
                  <p>
                    <strong>7.2.3.</strong> Remaining credits can be used for
                    new consultations or topped up.
                  </p>
                  <p>
                    <strong>7.2.4.</strong> THE CONTRACTOR may request a refund
                    within 7 days, provided that the credits have not been used.
                  </p>
                  <p>
                    <strong>7.3.</strong> THE CONTRACTOR is responsible for the
                    accuracy of the vehicle data provided.
                  </p>
                  <p>
                    <strong>7.3.1.</strong> THE CONTRACTOR is not responsible
                    for errors in the information provided.
                  </p>
                  <p>
                    <strong>7.4.</strong> After sending the data, queries will
                    be processed and cannot be canceled.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Prices
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>8.1.</strong> Service prices are available on the
                    platform.
                  </p>
                  <p>
                    <strong>8.2.</strong> THE CONTRACTOR may purchase credits
                    according to the value of the consultations or through
                    packages.
                  </p>
                  <p>
                    <strong>8.2.1.</strong> The conversion will be made based on
                    the current price of the consultation.
                  </p>
                  <p>
                    <strong>8.3.</strong> THE CONTRACTOR may change prices at
                    any time, without prior notice.
                  </p>
                  <p>
                    <strong>8.4.</strong> Promotions may be advertised on the
                    website, and by participating, the CONTRACTOR accepts their
                    rules.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Responsibilities
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>9.1.</strong> Consultations are for personal use,
                    focused on buying and selling vehicles.
                  </p>
                  <p>
                    <strong>9.1.1.</strong> It is prohibited to commercialize or
                    pass on information obtained, under penalty of liability for
                    damages to third parties.
                  </p>
                  <p>
                    <strong>9.1.2.</strong> THE CONTRACTOR may suspend access in
                    case of improper use.
                  </p>
                  <p>
                    <strong>9.2.</strong> THE CONTRACTOR does not control the
                    data in the databases used and is not responsible for errors
                    or outdated information.
                  </p>
                  <p>
                    <strong>9.3.</strong> The CONTRACTOR must acquire and use
                    the credits within the stipulated period.
                  </p>
                  <p>
                    <strong>9.4.</strong> THE CONTRACTOR does not guarantee
                    continuous availability of the platform, and technical or
                    connection failures may occur. THE CONTRACTOR acknowledges
                    that there is no right to compensation for such failures.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Cancellation
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>10.1.</strong> The CONTRACTOR may delete his/her
                    account at any time, losing access to the contracted
                    services.
                  </p>
                  <p>
                    <strong>10.1.1.</strong> Remaining credits will only be
                    refunded in accordance with clause 7.2.4.
                  </p>
                  <p>
                    <strong>10.1.2.</strong> It is possible to cancel only one
                    service, keeping the account active.
                  </p>
                  <p>
                    <strong>10.2.</strong> Credits can be cancelled within 7
                    days, provided they have not been used.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. General Provisions
                </h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    <strong>11.1.</strong> THE CONTRACTOR may change, suspend or
                    terminate platform features as required or as required by
                    law.
                  </p>
                  <p>
                    <strong>11.2.</strong> In case of violation of the terms or
                    legislation, the CONTRACTOR may apply sanctions, including
                    suspension or deletion of the account.
                  </p>
                  <p>
                    <strong>11.3.</strong> Customer service is available via
                    WhatsApp (11 5555-5555), website www.placaverificada.com.br
                    or email contato@placaverificada.com.br.
                  </p>
                  <p>
                    <strong>11.4.</strong> THE CONTRACTOR is responsible for the
                    personal data provided, which will be processed in
                    accordance with the LGPD (Law No. 13,709/2018).
                  </p>
                  <p>
                    <strong>11.5.</strong> THE CONTRACTOR holds the intellectual
                    property rights over the platform and its contents.
                  </p>
                  <p>
                    <strong>11.5.1.</strong> This agreement does not transfer
                    rights to trademarks, software, patents or trade secrets.
                  </p>
                  <p>
                    <strong>11.5.2.</strong> THE CONTRACTOR authorizes the free
                    use of his/her image and testimonials related to the
                    platform.
                  </p>
                  <p>
                    <strong>11.6.</strong> If any clause is considered invalid,
                    the others will remain in force.
                  </p>
                  <p>
                    <strong>11.7.</strong> The CONTRACTOR's tolerance does not
                    imply waiver of rights.
                  </p>
                  <p>
                    <strong>11.8.</strong> THE CONTRACTOR may transfer its
                    rights in the event of technology transfer, without the need
                    for authorization from the CONTRACTOR.
                  </p>
                  <p>
                    <strong>11.9.</strong> This agreement is governed by
                    Brazilian laws, including the Internet Civil Rights
                    Framework, LGPD, Consumer Protection Code and Civil Code.
                  </p>
                  <p>
                    <strong>11.10.</strong> The jurisdiction of the District of
                    the Capital of the State of São Paulo is elected for the
                    resolution of conflicts.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TermsOfUse;
