import React from "react";
import MainContent from "../../components/layout/MainContent";
import { FaCheckCircle } from "react-icons/fa";

const DeleteAccountPage = () => {
  return (
    <MainContent showMenu={false}>
      <p className="text-2xl font-semibold mb-4">Delete Your Account</p>
      <div>
        <p className="text-red-600 text-[0.85rem] font-medium mb-2">
          Pay close attention at this time!!!
        </p>
        <ul className="list-decimal list-inside text-[0.65rem] font-[400] space-y-2">
          <li>
            If there is no record of purchases, queries or payments, the
            deletion will be completed within 30 days.
          </li>
          <li>
            If there is any activity recorded, your account will only be
            deactivated for up to 3 years, and can be reactivated at any Time
            through the “I forgot my password” option.
          </li>
          <li>
            After this period, the deletion will be final and irreversible. All
            information linked to the account—such as history, credits, Queries,
            and preferences—will be deleted, and access to our services will be
            terminated.
          </li>
        </ul>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-[0.7rem] font-[600]">
          If you are sure you want to proceed, enter your password and click
          “Delete Account” <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col gap-2.5">
          <input
            type="password"
            placeholder="Enter your password"
            className="bg-gray-200 rounded-md px-2 py-2 w-[70%] text-[0.6rem] font-[400] outline-none"
          />
          <button className="w-fit bg-red-500 hover:bg-red-700 text-white rounded-md px-3 py-1.5 text-[0.6rem] font-[400] outline-none cursor-pointer transition-all duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </MainContent>
  );
};

export default DeleteAccountPage;
