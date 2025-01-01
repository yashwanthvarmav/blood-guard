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
              Blood Guard is a revolutionary platform committed to transforming 
              the landscape of blood donation by fostering a seamless connection 
              between donors and organizations. Our vision is to build a world where 
              no one suffers due to the unavailability of blood, and our mission is 
              to create a sustainable, reliable, and compassionate blood donation ecosystem.
              </p>
              <ul className="text-gray-600 mb-4 text-left list-disc list-inside">
                <li>Raise awareness about the importance of blood donation.</li>
                <li>
                  Simplify the process for donors and organizations to connect effectively.
                </li>
                <li>
                  Build an inclusive platform that fosters trust, collaboration, and a shared commitment to saving lives.
                </li>
              </ul>
              <p className="text-gray-600">
                Whether you're here to donate, organize a blood donation camp, or 
                seek help in an emergency, Blood Guard stands as a beacon of hope, 
                ensuring every effort is made to save lives. Together, 
                we can make a lasting impact on global health and create a future 
                where everyone has access to life-saving blood when they need it
              </p>
              <p className="text-gray-800 font-semibold mt-6">
                Join the movement. Save lives. Make a difference today!
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
    height: "603px",
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
