import React from "react";

const footerLinks = [
  {
    name: "Company",
    border: "border-r border-white/50",
    links: [
      {
        name: "About Us",
        href: "#",
      },
      {
        name: "Solution",
        href: "#",
      },
    ],
  },
  {
    name: "Resources",
    border: "border-r border-white/50",
    links: [
      {
        name: "Help Center",
        href: "#",
      },
      {
        name: "Insights",
        href: "#",
      },
      {
        name: "Blog",
        href: "#",
      },
    ],
  },
  {
    name: "Legal",
    border: "border-r border-white/50",
    links: [
      {
        name: "Privacy Policy",
        href: "#",
      },
      {
        name: "Terms of Use",
        href: "#",
      },
      {
        name: "Compliance – LGPD (General Data Protection Law)",
        href: "#",
      },
    ],
  },
];
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative lg:h-[32rem] lg:max-h-[36rem] bg-[url('/footerBg.svg')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className=" mx-auto z-[100] w-full h-full flex flex-col">
        <div className="text-white w-full h-full commonPadding flex flex-col gap-6  lg:flex-row justify-between items-center">
          <div className=" space-y-6 w-full md:w-auto me-auto ">
            <div
              className="w-[30%] lg:w-[40%] cursor-pointer"
              onClick={scrollToTop}
            >
              <img src="/whiteLogo.svg" alt="Logo" className="" />
            </div>
            <p className="text-lg font-normal max-w-[22rem]">
              Protect your purchase before closing the deal. Check, confirm,
              trust. Verified Plate, security that goes beyond the plate.
            </p>
            <div className="flex space-x-3  ">
              <a
                href="#"
                className="bg-white text-blue-600 rounded-md p-2 my-auto hover:bg-blue-200"
              >
                <img src="/facebookicon.png" alt="" className="size-5" />
              </a>
              <a
                href="#"
                className="bg-white text-blue-600 rounded-md p-2 my-auto hover:bg-blue-200"
              >
                <img src="/instaicon.png" alt="" className="size-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-evenly gap-6 lg:gap-0 w-full md:w-auto me-auto">
            {footerLinks.map((link) => (
              <div className={`flex`} key={link.name}>
                <div key={link.name}>
                  <h2 className="text-xl lg:text-2xl mb-3">{link.name}</h2>
                  <ul className="space-y-3">
                    {link.links.map((link) => (
                      <li key={link.name} className=" max-w-[15rem]">
                        <a
                          href="#"
                          className="lg:text-[1rem] font-light hover:border-b-2 hover:border-[#1AABFE] transition-colors duration-300 !max-w-[2rem]  "
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* //divider */}
                <div className="border-l-[1.6px] border-white/40 h-[85%] mt-2.5 mx-5" />
              </div>
            ))}

            <div className="  ">
              <h2 className="text-xl lg:text-2xl mb-3">Contact</h2>
              <div className="space-y-4  ">
                <div className="flex items-center gap-2">
                  <a href="#" className="bg-white text-blue-600 rounded p-1.5">
                    <img src="/locationicon.png" alt="" />
                  </a>
                  <p>Avenida Paulista 1471, São Paulo – SP</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="bg-white text-blue-600 rounded p-1.5">
                    <img src="/buildingicon.png" alt="" />
                  </a>
                  <p>
                    <span className="font-semibold">CNPJ:</span>
                    62.718.731/0001–24
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="bg-white text-blue-600 rounded p-1.5">
                    <img src="/mail.png" alt="" />
                  </a>
                  <p>contato@placaverificada.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-[0.4rem] text-black flex justify-around items-center py-1 bg-[#D9D9D9]">
          <p>Verified Plate. All rights reserved.</p>
          <p>Security first – protecting your dream</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
