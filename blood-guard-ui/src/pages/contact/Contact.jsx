import React, { useState } from "react";
import Footer from "../../components/Footer";
import { createContactRequest } from "../../context/apis";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData,setFormData]=useState({});

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}))
  }

  const handleContact=async()=>{
    try{
      const response=await createContactRequest(formData);
      toast.success(response?.message);
      setFormData({});
    }catch(e){console.log(e)}
  }
  return (
    <div>
      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-8">
            We'd love to hear from you! Reach out to us with any questions,
            feedback, or to join our mission of saving lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-4">
                Have a question or need assistance? Contact us using the details
                below:
              </p>
              <ul className="text-gray-600 space-y-3">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:bloodguardinfo@gmail.com"
                    className="text-red-500 hover:underline"
                  >
                    bloodguardinfo@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+18001234567"
                    className="text-red-500 hover:underline"
                  >
                    +1 800-123-4567
                  </a>
                </li>
                <li>
                  <strong>Address:</strong>
                  <p className="ml-4">
                    123 Lifeline Street, Health City, HC 12345
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Send Us a Message
              </h3>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name='contact_name'
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Name"
                    value={formData?.contact_name||''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name='contact_email'
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Email"
                    value={formData?.contact_email||''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="email"
                    name='contact_phone_number'
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Phone Number"
                    value={formData?.contact_phone_number||''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Subject"
                    name='contact_subject'
                    value={formData?.contact_subject||''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    name="contact_message"
                    value={formData?.contact_message||''}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleContact}
                  className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
const styles = {
  contactimage: {
    width: "560px",
    height: " 560px",
    top: "278px",
    left: "364px",
    gap: "0px",
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
  contactrectangle: {
    width: "171px",
    height: "62px",
    border: "1px solid black",
    paddingTop: "20px",
    paddingLeft: "30px",
  },
};
export default Contact;
