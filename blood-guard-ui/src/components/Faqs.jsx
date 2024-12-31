import React, { useState } from "react";
import { faqs } from "../utilities/constants";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState({});

  const handleToggle = (e, index) => {
    const openState = e.currentTarget ? e.currentTarget.open : false;
    setIsOpen((prev) => ({ ...prev, [index]: openState })); // Update the state based on "open" property
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-center font-semibold text-3xl font-poppins mb-8 mt-12">
          Frequently asked questions
        </h2>
        <div className="w-[70%] items-center">
          {faqs?.map((item, index) => (
            <>
              <details
                className="p-4  rounded shadow"
                onToggle={(e) => {
                  console.log(
                    "e.currentTarget.open->",
                    e.currentTarget.open,
                    index
                  );
                  handleToggle(e, index);
                }}
                id={index}
              >
                <summary className="font-semibold cursor-pointer flex justify-between items-center">
                  {item?.question}
                  <span className="ml-2">{isOpen?.[index] ? "-" : "+"}</span>
                </summary>
                <p className="mt-2 text-gray-700">{item?.answer}</p>
              </details>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
