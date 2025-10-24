import React from "react";
import MainContent from "../../components/layout/MainContent";
import Purchases from "../../components/dashboard/PurchaseHistory/PurchaseHistory";

const PurchaseHistoryPage = () => {
  return (
    <MainContent showMenu={false}>
      <Purchases />
    </MainContent>
  );
};

export default PurchaseHistoryPage;
