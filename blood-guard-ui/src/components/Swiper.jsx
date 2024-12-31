import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import { ServiceData } from "../utilities/constants";
import GroupIcon from "../assests/group_profiles.png";
import Location from "../assests/Frame.png";
import { FaArrowRightLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const SwiperScroll = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full h-[450px] ">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[100%]"
      >
        {ServiceData?.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[300px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center" />
              <p className="text-[#434F7A] text-base font-bold font-poppins hover:text-white">
                Wed, Nov 24, 20121 ・6:00 CEST
              </p>
              <h3 className="text-primary font-semibold text-2xl font-poppins hover:text-white">
                Sustainability in Product Design
              </h3>
              <div className="flex">
                <img src={Location} alt="location" className="w-7 h-7" />
                <p className="text-black pl-2 hover:text-white font-poppins text-sm">
                  456 Red Cross Lane,Building B, Floor
                  3,Chicago,IL,USA,Pin:60607
                </p>
              </div>

              <div className="absolute inset-0 bg-primary opacity-10 group-hover:opacity-20" />
              <div className="relative flex justify-between gap-3">
                <div className="flex items-center">
                  <img src={GroupIcon} alt="Group" className="w-14" />
                  <p className="text-sm text-gray-600 pl-3">+24</p>
                </div>
                <button className="text-black font-poppins text-base font-bold flex items-center hover:translate-x-[5px] transition-all duration-500">
                  View Details{" "}
                  <span className="pl-1">
                    <FaArrowRightLong />
                  </span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperScroll;
