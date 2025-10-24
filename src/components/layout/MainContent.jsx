import React from "react";
import Menu from "../common/Menu";

const MainContent = ({
  children,
  showMenu,
  menuItems,
  activeItem,
  setActiveItem,
  bgImage,
}) => {
  return (
    <div
      className={`h-[calc(100vh-250px)] relative bg-white rounded-xl p-6 drop-shadow-2xl overflow-hidden ${
        bgImage
          ? `bg-[url('${bgImage}')] bg-cover bg-center bg-no-repeat`
          : "bg-white"
      }`}
    >
      {showMenu && (
        <Menu
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
      <div className="h-full w-full overflow-y-auto ">{children}</div>
    </div>
  );
};

export default MainContent;
