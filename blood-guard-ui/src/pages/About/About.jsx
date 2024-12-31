import React from "react";
import Aboute from "../../assests/about_image.png";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div>
      <div>
        <center></center>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <img src={Aboute} alt="About" style={styles.aboutimage} />
          <section className="bg-gray-100 py-10 px-5 md:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Blood Guard
              </h2>
              <p className="text-gray-600 mb-4">
                Blood Guard is a dedicated platform designed to bridge the gap
                between blood donors and recipients, ensuring that life-saving
                blood reaches those in need quickly and efficiently. Our mission
                is to make blood donation accessible, easy, and impactful by
                connecting willing donors with those in urgent need.
              </p>
              <ul className="text-gray-600 mb-4 text-left list-disc list-inside">
                <li>Raise awareness about the importance of blood donation.</li>
                <li>
                  Simplify the process of finding and connecting with donors.
                </li>
                <li>
                  Build a compassionate community united in the cause of saving
                  lives.
                </li>
              </ul>
              <p className="text-gray-600">
                Whether you're here to donate or seek help, Blood Guard is
                committed to supporting you every step of the way. Together, we
                can create a healthier world, one donation at a time.
              </p>
              <p className="text-gray-800 font-semibold mt-6">
                Join us in our mission to save lives and make a difference
                today!
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};
const styles = {
  aboutimage: {
    width: "438px",
    height: "445px",
    top: "259px",
    left: "196px",
    gap: " 0px",
    opacity: "0px",
  },
  abouttext: {
    fontFamily: "Outfit",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "32.4px",
    textalign: "left",
    textunderlineposition: "from-font",
    textdecorationkipnk: "none",
    paddingLeft: "30px",
  },
  aboutrectangle: {
    width: "400px",
    height: "200px",
    border: "1px solid black",
  },
};
export default About;
