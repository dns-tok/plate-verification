import React from "react";
import MainContent from "../../components/layout/MainContent";

const Blogs = () => {
  return (
    <div className="w-full h-[calc(100dvh-190px)] lg:h-[calc(100dvh-235px)] rounded-lg overflow-hidden drop-shadow-2xl">
      <iframe
        src="https://www.placaverificada.com.br/blog/"
        title="Embedded Page"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Blogs;
