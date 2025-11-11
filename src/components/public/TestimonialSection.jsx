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
      name: "João da Silva",
      text: "Desde que descobri este serviço, nunca mais compro um carro sem antes efetuar uma verificação profunda. Para algo de tão alto valor, não vale a pena correr riscos.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      text: "Este serviço me impediu de comprar um carro com danos estruturais ocultos. O relatório detalhado foi incrivelmente completo e me ajudou a tomar uma decisão informada. ",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Pedro Santos",
      text: "Como comprador de carro pela primeira vez, eu estava nervoso e com muito medo de todo o processo. Este Serviço me deu confiança e tranquilidade, sendo realmente um parceiro na compra de um carro semi-novo. Altamente recomendo.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 3.5,
    },
    {
      id: 4,
      name: "Ana Paula",
      text: "O atendimento ao cliente é excepcional e os relatórios são detalhados. Já utilizei este serviço diversas vezes e nunca me decepcionei.",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      rating: 5,
    },
    {
      id: 5,
      name: "Lucas Oliveira",
      text: "Descobri um recall importante que o vendedor não mencionou, o que poderia ter me causado um risco de vida. Este serviço se paga sozinho, evitando erros e riscos.",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Fernanda Rocha",
      text: "A plataforma é fácil de usar e os relatórios são completos. Tornou-se uma ferramenta essencial no meu processo de compra de carro.",
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
