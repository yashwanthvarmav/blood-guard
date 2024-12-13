import React from "react";
import CsrImage1 from "../../assests/csr-1-1.png";
import CsrImage2 from "../../assests/csr-2-2.png";
import CsrImage3 from "../../assests/csr-3-3.png";
import Footer from "../../components/Footer";

const CsrImpact = () => {
  return (
    <div>
      {/* Section 1: Corporate Responsibility */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={CsrImage1}
            alt="Corporate Responsibility"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Make an Impact Through CSR
            </h2>
            <p className="text-gray-600 mb-6">
              Partner with Blood Guard to make a difference in your community.
              Organize blood donation camps as part of your CSR initiatives and
              help save lives. Together, we can create a healthier society while
              building a culture of social responsibility within your organization.
            </p>
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Partner with Us
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: How We Support You */}
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Our End-to-End Support
            </h2>
            <p className="text-gray-600 mb-6">
              Blood Guard provides complete support for planning and executing
              your blood donation camps. From venue setup to donor registration
              and post-camp reporting, we handle it all. Focus on creating an
              impact while we manage the logistics.
            </p>
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Learn More
            </button>
          </div>
          <img
            src={CsrImage2}
            alt="Support Process"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      {/* Section 3: Join the Change */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={CsrImage3}
            alt="Join the Movement"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              Join the Movement Today
            </h2>
            <p className="text-gray-600 mb-6">
              Every drop counts. By organizing a blood donation camp, your
              organization not only fulfills its CSR but also strengthens
              community ties. Take the first step toward saving lives and
              promoting health.
            </p>
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
              Start Planning Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CsrImpact;
