import React from "react";
import { multiPlans, singlePlans } from "./plansData";
import PlanCard from "./PlanCard";

const Consultation = ({ activeMenu }) => {
  return (
    <div className="py-4">
      <p className="text-2xl font-semibold mb-2">Our Plans</p>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
          activeMenu === "multiple" ? "gap-4" : "gap-2"
        } max-w-[860px] mx-auto`}
      >
        {(activeMenu === "single" ? singlePlans : multiPlans).map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isMultiple={activeMenu === "multiple"}
          />
        ))}
      </div>
    </div>
  );
};

export default Consultation;
