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
      name: "Jonathan Santos",
      text: "Ever since I discovered this service, I never buy a car without checking it first. For something of such high value, it's not worth taking risks",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Maria Silva",
      text: "This service saved me from buying a car with hidden damage. The detailed report was incredibly thorough and helped me make an informed decision.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      text: "As a first-time car buyer, I was nervous about the process. This service gave me confidence and peace of mind. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 3.5,
    },
    {
      id: 4,
      name: "Ana Costa",
      text: "The customer service is exceptional and the reports are detailed. I've used this service multiple times and it never disappoints.",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      rating: 5,
    },
    {
      id: 5,
      name: "Roberto Lima",
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
        Our Testimonials
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
