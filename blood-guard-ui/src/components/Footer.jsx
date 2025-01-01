import { Divider } from "antd";
import React from "react";

const Footer = () => {
  return (
    <>
    <Divider/>
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  text-sm">
        <div>
          <p className="text-xl font-medium mb-5 w-40">Blood Guard</p>
          <p>
            Your trusted platform for saving lives. Blood Guard connects donors
            and organizations seamlessly, making blood donation simple and
            impactful. Join us in building a healthier, stronger community by
            donating blood and spreading awareness. Together, we can save lives,
            one drop at a time.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col  gap-2  text-gray-600">
            <li>Home</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 12334567890</li>
            <li>bloodguardinfo@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ Body Gaurd</p>
      </div>
    </div>
    </>
  );
};

export default Footer;
