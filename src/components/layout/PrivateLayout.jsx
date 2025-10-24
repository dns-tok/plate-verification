import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <SideBar />
      <div className="h-full w-full p-8 space-y-7 bg-[#F2F8FF] relative z-20">
        <div className="relative max-w-[980px] mx-auto">
          <TopBar />
          {/* //topbar shadow div */}
          <div className="absolute -bottom-4 left-0 right-0 mx-auto w-[98%] h-[30%] bg-black/50 z-10 rounded-3xl blur-xl  " />
        </div>
        <div className="relative z-20 max-w-[980px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
