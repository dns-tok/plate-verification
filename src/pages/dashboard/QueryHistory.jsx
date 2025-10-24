import React from "react";
import MainContent from "../../components/layout/MainContent";
import History from "../../components/dashboard/QueryHistory/QueryHistory";

const QueryHistoryPage = () => {
  return (
    <MainContent showMenu={false}>
      <History />
    </MainContent>
  );
};

export default QueryHistoryPage;
