import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop, smartScrollToSection } from "../../utils/scrollUtils";

const footerLinks = [
  {
    name: "Empresa",
    border: "border-r border-white/50",
    links: [
      {
        name: "Sobre nós",
        href: "/about-us",
      },
      {
        name: "Solução",
        href: "/how-it-works",
      },
    ],
  },
  {
    name: "Recursos",
    border: "border-r border-white/50",
    links: [
      {
        name: "Central de Ajuda",
        href: "#contact",
      },
      {
        name: "Percepções",
        href: "#testimonials",
      },
      {
        name: "Blog",
        href: "https://www.placaverificada.com.br/blog",
        isExternal: true,
      },
    ],
  },
  {
    name: "Jurídico",
    border: "border-r border-white/50",
    links: [
      {
        name: "Política de privacidade",
        href: "/privacy-policy",
      },
      {
        name: "Termos de Uso",
        href: "/terms-of-use",
      },
      {
        name: "Conformidade com a LGPD (Lei Geral de Proteção de Dados)",
        href: "#",
      },
    ],
  },
];
const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (linkItem, e) => {
    // Handle external links
    if (linkItem.isExternal) {
      return; // Let the anchor tag handle it
    }

    // Handle section links (starting with #)
    if (linkItem.href.startsWith("#") && linkItem.href !== "#") {
      e.preventDefault();
      const sectionId = linkItem.href.substring(1);
      smartScrollToSection(sectionId, navigate, null, 150);
    }
    // Internal routes are handled by Link component
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
              Proteja sua compra antes de fechar o negócio. Verifique, confirme,
              confie. Placa Verificada, segurança que vai além da placa.
            </p>
            <div className="flex space-x-3  ">
              <a
                href="https://www.facebook.com/placaverificada/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 rounded-md p-2 my-auto hover:bg-blue-200"
              >
                <img src="/facebookicon.png" alt="" className="size-5" />
              </a>
              <a
                href="https://www.instagram.com/placaverificada/"
                target="_blank"
                rel="noopener noreferrer"
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
                    {link.links.map((linkItem) => (
                      <li key={linkItem.name} className=" max-w-[15rem]">
                        {linkItem.isExternal ? (
                          <a
                            href={linkItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lg:text-[1rem] font-light hover:border-b-2 hover:border-[#1AABFE] transition-colors duration-300 !max-w-[2rem]  "
                          >
                            {linkItem.name}
                          </a>
                        ) : linkItem.href.startsWith("#") &&
                          linkItem.href !== "#" ? (
                          <a
                            href={linkItem.href}
                            onClick={(e) => handleLinkClick(linkItem, e)}
                            className="lg:text-[1rem] font-light hover:border-b-2 hover:border-[#1AABFE] transition-colors duration-300 !max-w-[2rem] cursor-pointer  "
                          >
                            {linkItem.name}
                          </a>
                        ) : (
                          <Link
                            to={linkItem.href}
                            className="lg:text-[1rem] font-light hover:border-b-2 hover:border-[#1AABFE] transition-colors duration-300 !max-w-[2rem]  "
                          >
                            {linkItem.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* //divider */}
                <div className="border-l-[1.6px] border-white/40 h-[85%] mt-2.5 mx-5" />
              </div>
            ))}

            <div className="  ">
              <h2 className="text-xl lg:text-2xl mb-3">Contato</h2>
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
          <p>Placa verificada. Todos os direitos reservados.</p>
          <p>Segurança em primeiro lugar – protegendo o seu sonho.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
