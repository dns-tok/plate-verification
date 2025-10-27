import React, { useState } from "react";
import MainContent from "../../components/layout/MainContent";
import EditProfile from "../../components/dashboard/Profile/EditProfile";
import ChangePassword from "../../components/dashboard/Profile/ChangePassword";

const Profile = () => {
  const menuItems = [
    { label: "Edit Profile", value: "edit-profile" },
    { label: "Change Password", value: "change-password" },
  ];

  const [activeMenu, setActiveMenu] = useState(menuItems[0]?.value);
  return (
    <MainContent
      showMenu={true}
      menuItems={menuItems}
      activeItem={activeMenu}
      setActiveItem={setActiveMenu}
    >
      <div className="mt-4">
        {activeMenu === "edit-profile" && <EditProfile />}
        {activeMenu === "change-password" && <ChangePassword />}
      </div>
    </MainContent>
  );
};

export default Profile;
