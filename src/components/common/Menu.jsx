import React, { useCallback, useRef, useEffect, useState } from "react";

const Menu = ({ menuItems = [], activeItem, setActiveItem }) => {
  const itemRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const setRef = useCallback(
    (value) => (ref) => {
      if (ref) {
        itemRefs.current[value] = ref;
      }
    },
    []
  );

  useEffect(() => {
    const activeRef = itemRefs.current[activeItem];
    if (activeRef) {
      setIndicatorStyle({
        width: activeRef.offsetWidth,
        left: activeRef.offsetLeft,
      });
    }
  }, [activeItem, menuItems]);

  return (
    <div className="border-b-[1.4px] border-black flex items-center gap-8 relative">
      {menuItems.map((item) => (
        <div
          key={item.value}
          className="flex flex-col items-center gap-2"
          ref={setRef(item.value)}
        >
          <span
            className={`text-sm cursor-pointer hover:text-[#1AABFE] transition-all duration-500 ease-in-out py-1 ${
              activeItem === item.value ? "font-semibold" : "font-medium"
            }`}
            onClick={() => setActiveItem(item.value)}
          >
            {item.label}
          </span>
        </div>
      ))}

      {/* Sliding indicator */}
      <span
        className="absolute bottom-0 h-[1.5px] bg-[#1AABFE] transition-all duration-300 ease-in-out"
        style={{
          width: `${indicatorStyle.width}px`,
          left: `${indicatorStyle.left}px`,
        }}
      />
    </div>
  );
};

export default Menu;
