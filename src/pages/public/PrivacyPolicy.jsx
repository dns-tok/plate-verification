import React, { useEffect } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import { useScrollToTop } from "../../utils/scrollUtils";

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Prototyp3 IT Services LTDA
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Platform: Placa Verificada
              </p>
              <p className="text-lg text-gray-600">
                Effective Date: September 24, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Commitment to Privacy
                </h2>
                <p className="text-gray-600 mb-4">
                  Prototyp3 Serviços de Informática LTDA ("Prototyp3") takes
                  privacy seriously. This Privacy Policy ("Policy") describes
                  how we collect, use, share, and protect personal data obtained
                  through the use of our services and the Placa Verificada
                  platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Definitions
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <strong>User:</strong> Individual over 18 years of age or
                    legally emancipated who accesses our website or application.
                  </li>
                  <li>
                    <strong>Personal Data:</strong> Information that identifies
                    or may identify a natural person, alone or in conjunction
                    with other information.
                  </li>
                  <li>
                    <strong>Holder:</strong> Individual to whom the Personal
                    Data refers.
                  </li>
                  <li>
                    <strong>Treatment:</strong> Any operation performed with
                    Personal Data, such as collection, storage, modification,
                    consultation, use, sharing or deletion, whether by automated
                    means or not.
                  </li>
                  <li>
                    <strong>LGPD:</strong> Law No. 13,709/2018 — General
                    Personal Data Protection Law.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Purposes of Personal Data Processing
                </h2>
                <p className="text-gray-600 mb-4">
                  Prototyp3's collection and use of your personal data varies
                  depending on your interaction with our services. Below are the
                  main purposes:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Purpose
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Personal Data Collected
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Registration and access to the platform
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, date of birth, email, cell phone, zip code, CPF,
                          IP and access records
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Carrying out consultations (free or paid)
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email and vehicle data (license plate,
                          restrictions, recall, chassis, FIPE table, state
                          registration, price, occurrences, technical
                          specifications, parts and values, debts, fines,
                          owner's opinion, etc.)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Purchases on the platform
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, CPF, card details (number, name,
                          expiration date, security code) and/or discount coupon
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Marketing actions
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, cell phone, zip code, consumption
                          history, vehicle data consulted (fines, auction,
                          accident, maintenance)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Database enrichment
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Vehicle data such as license plate, chassis, RENAVAM,
                          engine, color and other characteristics
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Contact and feedback
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, phone number and consultation rating
                          (grade from 1 to 10)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Platform improvements and development
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, cell phone, zip code, CPF, IP, access
                          records, comments and feedback
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          "Owner's Opinion" Section
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, car details (make, model, license plate,
                          mileage) and comments about the vehicle
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          "Refer and Earn" Program
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email and referral link
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Debt installment service
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Name, email, CPF and vehicle data (license plate,
                          chassis, RENAVAM, version, model year, fines)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Cookies and Tags
                </h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that store personal data and are
                  sent to the device's browser while the User browses our
                  website. They help remember preferences, facilitate
                  navigation, personalize content, maintain active sessions, and
                  collect information about online behavior.
                </p>
                <p className="text-gray-600 mb-4">
                  In our mobile apps, we use tags, which function similarly to
                  cookies. They allow us to identify which features are most
                  used, understand usage patterns, and enhance the user
                  experience with personalized suggestions and continuous
                  improvements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Personal Data Retention Period
                </h2>
                <p className="text-gray-600 mb-4">
                  Personal data is retained for the period necessary to fulfill
                  the purposes for which it was collected. In certain
                  circumstances, we may retain this information for an
                  additional period, such as to comply with legal, regulatory,
                  or contractual obligations. All retention will be supported by
                  a legal basis, and the data subject may request the deletion
                  of their data as described in item 9.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Security Measures
                </h2>
                <p className="text-gray-600 mb-4">
                  Prototyp3 and its partners adopt several security practices to
                  prevent harm resulting from the processing of personal data.
                  These measures include: physical and digital protection of
                  systems, access control, use of secure software, and internal
                  compliance and data governance policies throughout the
                  lifecycle of the services provided.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Sharing of Personal Data
                </h2>
                <p className="text-gray-600 mb-4">
                  Prototyp3 may share personal data with third parties that
                  respect our security standards in the following situations:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Legal obligation</li>
                  <li>Companies of the same economic group</li>
                  <li>Suppliers and partners</li>
                  <li>Protection of rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Storage and International Transfer
                </h2>
                <p className="text-gray-600 mb-4">
                  Personal data is stored on servers located in Brazil and the
                  United States. All international transfers are made with
                  partners who demonstrate compliance with data protection laws.
                  By using our services, the user acknowledges this transfer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Rights of the Holder
                </h2>
                <p className="text-gray-600 mb-4">
                  The LGPD grants data subjects several rights over their
                  personal data. Below, we explain each of them and how to
                  exercise them:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Right
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Usage Information
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Request confirmation of use, access to data, details
                          about sharing and copies of records.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Correction
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Request adjustments to incomplete, incorrect, or
                          outdated data. Changes can also be made in "Profile"
                          &gt; "My Profile"
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Anonymization, blocking or deletion
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Request anonymization, temporary blocking, or
                          permanent deletion of your data. Your account can be
                          deleted by going to "Profile" &gt; "Always Connected"
                          &gt; "Delete Account."
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Portability
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Request data in a structured format for transfer to
                          third parties.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Consent information
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Receive clear explanations about the necessity and
                          consequences of not providing consent.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Revocation of consent
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Withdraw previously given consent. Revocation may
                          limit access to certain services.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Opposition
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Object to data processing carried out based on
                          legitimate interest.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Review of automated decisions
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Request review of decisions made exclusively by
                          automated systems.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 mt-4">
                  To ensure security, we may request additional information to
                  confirm the requester's identity. In some cases, we may not be
                  able to comply with the request, such as when there is a legal
                  obligation to maintain the data or a risk of violating trade
                  secrets.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Contact
                </h2>
                <p className="text-gray-600 mb-4">
                  To exercise your rights or clarify any doubts about this
                  Policy, please contact our data officer:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold">Alexandre Souza</p>
                  <p className="text-gray-600">
                    E-mail:{" "}
                    <a
                      href="mailto:dpo@placaverificada.com.br"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      dpo@placaverificada.com.br
                    </a>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Policy Updates
                </h2>
                <p className="text-gray-600 mb-4">
                  Always seeking to improve our services, this Policy may be
                  updated periodically.
                </p>
                <p className="text-gray-600 mb-4">
                  We recommend that you check this page regularly for any
                  changes.
                </p>
                <p className="text-gray-600 font-semibold">
                  This document is valid from September 24, 2025.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PrivacyPolicy;
