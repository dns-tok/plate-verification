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
      showMenu={true}
      menuItems={menuItems}
      activeItem={activeMenu}
      setActiveItem={setActiveMenu}
    >
      <Consultation activeMenu={activeMenu} />
    </MainContent>
  );
};

export default ConsultationPage;
