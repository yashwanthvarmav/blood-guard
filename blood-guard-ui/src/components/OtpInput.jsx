import React, { useState } from "react";

const OtpInput = ({ setFormData }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // Ensure only numbers

    const values = [...otp.map((d, i) => (i === index ? value : d))];
    setOtp(values);
    setFormData((prev) => ({
      ...prev,
      otp: values,
    }));
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    console.log("index,otp->", index, otp);
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prev = event.target.previousSibling;

      if (prev) {
        prev.focus();
        prev.select();
      }
    }
  };

  return (
    <div>
      <label htmlFor="email" style={styles.label}>
        OTP
      </label>

      <div className="flex items-center space-x-2 mb-5">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;

const styles = {
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
};
