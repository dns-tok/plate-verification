import React from 'react'

const Footer = () => {
  return (
    <div>
       <div className="py-10 text-white" style={{ background: 'linear-gradient(to top right, rgba(0, 0, 0, 87), rgba(25, 77, 154, 89))' }}>
    <div className="flex justify-evenly items-center">
      
      {/* <!-- Logo and Description --> */}
      <div className="md:col-span-2 w-[19rem] ">
        <div className="">
          <img src="/whiteLogo.png" alt="Logo" className="w-30 h-30 text-white color-white" />
        </div>
        <p className="text-lg leading-tight font-normal">
          Protect your purchase before closing <br /> the deal. Check, confirm, trust.
          Verified Plate, security that goes beyond the plate.
        </p>
        <div className="flex space-x-3 mt-8">
          <a href="#" className="bg-white text-blue-600 rounded-xl p-2 hover:bg-blue-200">
            {/* <i className="fab fa-facebook-f"></i> */}
            <img src="/facebookicon.png" alt="" />
          </a>
          <a href="#" className="bg-white text-blue-600 rounded-xl p-2 hover:bg-blue-200">
            {/* <i className="fab fa-instagram"></i> */}
            <img src="/instaicon.png" alt="" />
          </a>
        </div>
      </div>

      {/* <!-- Company --> */}
      <div className="border-l border-white/20 pl-6">
        <h2 className="font-semibold text-2xl mb-3">Company</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Solution</a></li>
        </ul>
      </div>

      {/* <!-- Resources --> */}
      <div className="border-l border-white/20 pl-6">
        <h2 className="font-semibold text-lg mb-3">Resources</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:underline">Help Center</a></li>
          <li><a href="#" className="hover:underline">Insights</a></li>
          <li><a href="#" className="hover:underline">Blog</a></li>
        </ul>
      </div>

      {/* <!-- Legal --> */}
      <div className="border-l border-white/20 pl-6">
        <h2 className="font-semibold text-2xl mb-3">Legal</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="hover:underline">Terms of Use</a></li>
          <li><a href="#" className="hover:underline">Compliance – LGPD (General Data Protection Law)</a></li>
        </ul>
      </div>

       {/* <!-- Contact Info --> */}
    <div className="border-l border-white/20">
      <div className="flex flex-col gap-2 justify-start items-start">
    <h2 className="font-semibold text-2xl mb-3 pl-4">Contact</h2>
        <div className="space-y-2 text-sm px-[1rem]">
          <div className="flex items-center gap-2">
          <a href="#" className="bg-white text-blue-600 rounded-lg p-1 hover:bg-blue-200">
            {/* <i className="fab fa-facebook-f"></i> */}
            <img src="/locationicon.png" alt="" />
          </a>
          <p><span className="font-semibold">Address:</span> Avenida Paulista 1471, São Paulo – SP</p>
          </div>
          <div className="flex items-center gap-2">
          <a href="#" className="bg-white text-blue-600 rounded-lg p-1 hover:bg-blue-200">
            {/* <i className="fab fa-facebook-f"></i> */}
            <img src="/buildingicon.png" alt="" />
          </a>
          <p><span className="font-semibold">CNPJ:</span>62.718.731/0001–24</p>
          </div>
          <div className="flex items-center gap-2">
          <a href="#" className="bg-white text-blue-600 rounded-lg p-1 hover:bg-blue-200">
            {/* <i className="fab fa-facebook-f"></i> */}
            <img src="/mail.png" alt="" />
          </a>
          <p><span className="font-semibold">Email:</span> contato@placaverificada.com.br</p>
          </div>
        </div>
      </div>
    </div>

    </div>

   

  </div>
    {/* <!-- Footer Bottom --> */}
    <div className="text-center text-xs text-black flex justify-around items-center py-2 bg-[#D9D9D9]">
      <p>Verified Plate. All rights reserved.</p>
      <p>Security first – protecting your dream</p>
    </div>
    </div>
  )
}

export default Footer