import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Desde que descobri este serviço, nunca mais compro um carro sem antes efetuar uma verificação profunda. Para algo de tão alto valor, não vale a pena correr riscos.",
      text: "Ever since I discovered this service, I never buy a car without checking it first. For something of such high value, it's not worth taking risks",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Este serviço me impediu de comprar um carro com danos estruturais ocultos. O relatório detalhado foi incrivelmente completo e me ajudou a tomar uma decisão informada. ",
      text: "This service saved me from buying a car with hidden damage. The detailed report was incredibly thorough and helped me make an informed decision.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Como comprador de carro pela primeira vez, eu estava nervoso e com muito medo de todo o processo. Este Serviço me deu confiança e tranquilidade, sendo realmente um parceiro na compra de um carro semi-novo. Altamente recomendo. ",
      text: "As a first-time car buyer, I was nervous about the process. This service gave me confidence and peace of mind. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 3.5,
    },
    {
      id: 4,
      name: "O atendimento ao cliente é excepcional e os relatórios são detalhados. Já utilizei este serviço diversas vezes e nunca me decepcionei. ",
      text: "The customer service is exceptional and the reports are detailed. I've used this service multiple times and it never disappoints.",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      rating: 5,
    },
    {
      id: 5,
      name: "Descobri um recall importante que o vendedor não mencionou, o que poderia ter me causado um risco de vida. Este serviço se paga sozinho, evitando erros e riscos. ",
      text: "Found out about a major recall that the seller didn't mention. This service pays for itself by preventing costly mistakes.",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Fernanda Rocha",
      text: "The platform is user-friendly and the reports are comprehensive. It's become an essential tool in my car buying process.",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 3,
    },
  ];

  return (
    <div className="commonPadding text-center bg-[#194D9A]">
      <h1 className="text-white text-[1.5rem] md:text-[2rem] font-bold mb-[1.5rem] md:mb-[1.5rem] lg:mb-[3rem]">
        Nossos depoimentos
      </h1>

      {/* Swiper Carousel */}
      <div className="mx-auto relative">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={80}
          pagination={{ clickable: true }}
          breakpoints={{
            1280: { slidesPerView: 2, spaceBetween: 50 },
          }}
          className="swiper-custom"
          autoHeight={false}
          loop={true}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <TestimonialCard testimonial={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
