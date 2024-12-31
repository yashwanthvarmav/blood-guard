import React from "react";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import Location from "../assests/Frame.png";
import GroupIcon from "../assests/group_profiles.png";
import { FaArrowRightLong } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import FeatureDetails from "../components/FeatureDetails";
import FAQ from "../components/Faqs";
import { ServiceData } from "../utilities/constants";
import FeatureDetailsNewOne from "../components/FeatureDetailsNewOne";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <FeatureDetailsNewOne />
      <FeatureDetails />
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
            delay: 2500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[100%]"
        >
          {ServiceData?.map((item, index) => (
            <SwiperSlide key={item.title}>
              <div
                key={index}
                className=" bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-20"
              >
                <div className="bg-red-100 text-center p-3">
                  <p className="text-sm font-semibold text-red-600">
                    Wed, Nov 24, 2024 • 6:00 PM
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-red-600 mb-3">
                    Blood Donation Camp
                  </h3>

                  <div className="flex items-start text-gray-500 text-sm mb-4">
                    <img src={Location} alt="location" className="w-5 h-5" />

                    <p className="ml-2">
                      123 Blood Drive Lane, City, State, ZIP
                    </p>
                  </div>

                  <div className=" text-gray-500 text-sm mb-4">
                    <p>Contact No: +91 7013810990</p>
                    <p>Email: sarabreddy1234@gmail.com</p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <img src={GroupIcon} alt="Group" className="w-10" />

                      <span>+24</span>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-700">
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FAQ />

      <Footer />
    </div>
  );
};

export default Landing;
