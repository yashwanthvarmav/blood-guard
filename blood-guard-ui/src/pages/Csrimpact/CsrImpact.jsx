import React, { useEffect, useState } from "react";
import CsrImage1 from "../../assests/csr-1-1.png";
import CsrImage2 from "../../assests/csr-2-2.png";
import CsrImage3 from "../../assests/csr-3-3.png";
import Footer from "../../components/Footer";
import { Modal, Select } from "antd";
import { createOrgRequest, getAdminOrgs } from "../../context/apis";
import { toast } from "react-toastify";

const CsrImpact = () => {

    const [open, setOpen] = useState(false);
    const [orgList,setOrgList]=useState([])
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handlePin();
  };

  const getBloodCampsList = async () => {
      try {

  
        const response = await getAdminOrgs();
        setOrgList(response?.organizations);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(()=>{getBloodCampsList()},[])

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setFormData({});
  };

    const handlePin = async () => {
      try {
  
        const response = await createOrgRequest(formData);
        console.log(response);
  
        toast.success(response?.message || "Sent successfully");
        setFormData({});
        setOpen(false);
      } catch (e) {
        console.log(e);
      }
    };


  const [formData, setFormData] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
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
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                showModal("Pin");
              }}>
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
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                showModal("Pin");
              }}
            >
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
            <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                showModal("Pin");
              }}
            >
              Start Planning Now
            </button>
          </div>
        </div>
      </section>
      {open && (
        <>
          <Modal
            title="CSR Blood Donation Camp Request"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            width='1000px'
            footer={[
              <button key="back" onClick={handleCancel}
              className="bg-gray-400 mr-2 px-10 py-3 rounded-md text-white"
              >
                Cancel
              </button>,

              <button
                key="submit"
                onClick={handleOk}
                className="bg-[#E63946] px-10 py-3 rounded-md text-white"

              >
                Send
              </button>,
            ]}
          >
            <div className="bg-white p-6 rounded-md shadow-md input-wrapper">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="font-medium text-sm">Organization</label>
                 <Select
                                  className={`rounded-lg  font-medium border-gray-300 mt-1  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                                  style={{
                                    width: "100%",
                                    height: 45,
                                  }}
                                  placeholder="Select role"
                                  optionFilterProp="label"
                                  onChange={(value) => {
                                    console.log("value->", value);
                                    setFormData((prev) => ({ ...prev, organization_id: value }));
                                  }}
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                      .toLowerCase()
                                      .localeCompare((optionB?.label ?? "").toLowerCase())
                                  }
                                  options={orgList?.length ? orgList?.map(item=>({value:item?.id,label:item?.organization_name})):[]}
                                />
              </div>
                  <div className="w-full">
                    <label className="font-medium text-sm">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      name="corporate_company_name"
                      onChange={handleChange}
                      value={formData?.corporate_company_name}
                      className="input-field p-3 w-full"
                    />
                    
                  </div>
                  <div>
                    <label className="font-medium text-sm">Company Branch</label>

                    <input
                      type="text"
                      name="corporate_company_branch"
                      placeholder="Company Branch"
                      onChange={handleChange}
                      value={formData?.corporate_company_branch}
                      className="input-field p-3 w-full"
                    />
              
                  </div>
             
                  <div className="flex flex-col">
                    <label className="font-medium text-sm">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="corporate_camp_name"
                      placeholder="Company Name"
                      onChange={handleChange}
                      value={formData?.corporate_camp_name}
                      className="input-field p-3 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-sm">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="corporate_spoc_name"
                      placeholder="Contact Name"
                      onChange={handleChange}
                      value={formData?.corporate_spoc_name}
                      className="input-field p-3 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-sm">
                        Designation
                    </label>
                    <input
                      type="text"
                      name="corporate_spoc_designation"
                      placeholder="Designation"
                      onChange={handleChange}
                      value={formData?.corporate_spoc_designation}
                      className="input-field p-3 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-sm">
                        Email
                    </label>
                    <input
                      type="email"
                      name="corporate_email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={formData?.corporate_email}
                      className="input-field p-3 w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-sm">
                        Phone Number
                    </label>
                    <input
                      type="tel"
                      name="corporate_phone_number"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      value={formData?.corporate_phone_number}
                      className="input-field p-3 w-full"
                    />
                  </div>

                  <div></div>
                  <div>
                <label className="font-medium text-sm">Address Line 1</label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="input-field p-3 w-full "
                  name="corporate_address_line_one"
                  onChange={handleChange}
                  value={formData?.corporate_address_line_one}
                />
              </div>
              <div>
                <label className="font-medium text-sm">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="input-field p-3 w-full"
                  name="corporate_address_line_two"
                  onChange={handleChange}
                  value={formData?.corporate_address_line_two}
                />
              </div>
              <div>
                <label className="font-medium text-sm">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="input-field p-3 w-full"
                  name="corporate_city"
                  onChange={handleChange}
                  value={formData?.corporate_city}
                />
              </div>

              <div>
                <label className="font-medium text-sm">State</label>
                <input
                  type="text"
                  placeholder="State"
                  className="input-field p-3 w-full"
                  name="corporate_state"
                  onChange={handleChange}
                  value={formData?.corporate_state}
                />
              </div>
              <div>
                <label className="font-medium text-sm">Zip code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="input-field p-3 w-full"
                  name="corporate_zip_code"
                  onChange={handleChange}
                  value={formData?.corporate_zip_code}
                />
              </div>
              <div>
                <label className="font-medium text-sm">Message</label>
                <input
                  type="text"
                  placeholder="Message"
                  className="input-field p-3 w-full"
                  name="corporate_message"
                  onChange={handleChange}
                  value={formData?.corporate_message}
                />
              </div>

                <div>
          </div>

             
             
                </div>
            </div>
          </Modal>
        </>
      )}
      <Footer />
    </div>
  );
};

export default CsrImpact;
