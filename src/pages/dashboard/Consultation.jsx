import React, { useState } from "react";
import MainContent from "../../components/layout/MainContent";
import Consultation from "../../components/dashboard/Consultation/Consultation";

const ConsultationPage = () => {
  return (
    <MainContent>
      <Consultation showSearchPlateInput={true} />
    </MainContent>
  );
};

export default ConsultationPage;
