import React, { useState } from "react";
import MainContent from "../../components/layout/MainContent";
import Consultation from "../../components/dashboard/Consultation/Consultation";

const ConsultationPage = () => {
  const menuItems = [
    { label: "Single Consultation", value: "single" },
    { label: "Multiple Consultation", value: "multiple" },
  ];

  const [activeMenu, setActiveMenu] = useState(menuItems[0]?.value);
  return (
    <MainContent
      menuItems={menuItems}
      activeItem={activeMenu}
      setActiveItem={setActiveMenu}
    >
      <Consultation activeMenu={activeMenu} showSearchPlateInput={true} />
    </MainContent>
  );
};

export default ConsultationPage;
