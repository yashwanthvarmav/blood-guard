import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchUserProfile, loginApi, recoveryPassword, recoveryPin } from "../../context/apis";
import OtpInput from "../../components/OtpInput";
import { toast } from "react-toastify";
import { Modal, Select } from "antd";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pin: "",
    role: "DONOR",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);


  const [pinFormData, setPinFormData] = useState({});
  const [passFormData, setPassFormData] = useState({});



  const handlePin = async () => {
    try {
      let url = "";
    
      if (pinFormData?.role === "DONOR") {
        url = "/recover-pin-user";
      } else if (pinFormData?.role === "ORGANIZATION") {
        url = "/recover-pin-organization";
      } 
      const response = await recoveryPin(url, pinFormData);
      console.log(response);

      toast.success(response?.message || "Updated successfully");
      setPinFormData({});
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePass = async () => {
    try {
      let url = "";
      const payload={...passFormData};
      if (passFormData?.role === "DONOR") {
        url = "/recover-password-user";
        payload.user_pin=passFormData?.pin;
        delete payload?.pin;
      } else if (passFormData?.role === "ORGANIZATION") {
        url = "/recover-password-organization";
        payload.organization_pin=passFormData?.pin;
        delete payload?.pin;
        // organization_pin
      } 
      const response = await recoveryPassword(url, payload);
      console.log(response);

      toast.success(response?.message || "Updated successfully");
      setPassFormData({});
      setOpenPassword(false);
    } catch (e) {
      console.log(e);
    }
  };

  const showModal = (type) => {
    setOpen({ isOpen: true, type });
  };
  const handleOk = () => {
    handlePin();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setOpenPassword(false);
    setPassFormData({});
    setPinFormData({});
  };



  const handleChangePin = (e) => {
    const { name, value } = e.target;
    setPinFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPassFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      const { role, otp, ...rest } = formData;
      rest.pin = Number(otp.join(""));
      let url = "/login-user";
      if (role === "ORGANIZATION") {
        url = "/login-organization";
        rest.pin = Number(otp.join(""));
        // delete rest.pin;
      }
      if (role === "ADMIN") {
        url = "/admin-login";
        rest.pin = Number(otp.join(""));
        // delete rest.pin;
      }
      const userData = await loginApi(url, { ...rest, role });
      localStorage.setItem("authToken", userData.token);

      const updatedUser = { ...userData };
      if (userData?.organization) {
        updatedUser.user = { ...userData.organization };
      }
      if (userData?.admin) {
        updatedUser.user = { ...userData.admin };
      }

      const userProfileData = await fetchUserProfile({
        id: updatedUser?.user?.id,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...(userProfileData?.users?.[0] || {}),
          ...updatedUser,
        })
      );

      toast.success("Login successfull");
      login();

      navigate("/");
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div style={styles.container} className="rounded-full">
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        className="rounded-full"
      >
        <h2 style={styles.heading} className="mb-1">
          Login
        </h2>
        <p className="text-xs mb-3">Please login to donate blood</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            // placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            // placeholder="Enter your password"
          />
        </div>

        <OtpInput setFormData={setFormData} />

        <div className="flex space-x-5 ">
          <label
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
              formData?.role === "DONOR"
                ? "bg-red-100 border-red-500 text-red-600"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-red-100 border-red-500 text-red-600`}
          >
            <input
              type="radio"
              name="role"
              value="DONOR"
              className="hidden"
              checked={formData?.role === "DONOR"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            />
            <span style={{ marginLeft: "0px" }}>Donor</span>
          </label>

          <label
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
              formData?.role === "ORGANIZATION"
                ? "bg-red-100 border-red-500 text-red-600"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-red-100 border-red-500 text-red-600`}
          >
            <input
              type="radio"
              name="role"
              value="ORGANIZATION"
              className="hidden ml-0"
              checked={formData?.role === "ORGANIZATION"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            />
            <span style={{ marginLeft: "0px" }}>Organization</span>
          </label>
          <label
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer ${
              formData?.role === "ADMIN"
                ? "bg-red-100 border-red-500 text-red-600"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-red-100 border-red-500 text-red-600`}
          >
            <input
              type="radio"
              name="role"
              value="ADMIN"
              className="hidden ml-0"
              checked={formData?.role === "ADMIN"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            />
            <span style={{ marginLeft: "0px" }}>Admin</span>
          </label>
        </div>
        <div className="flex justify-between mb-3">
            <span
              onClick={() => {
                showModal("Pin");
              }}
              className="text-xs text-gray-500 hover:text-gray-900 text-left w-full mt-2"
            >
              Forget Pin?
            </span>
            <span
              onClick={() => {
                setOpenPassword({ isOpen: true, type: "Password" });
              }}
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </span>
          </div>
        <button type="submit" style={styles.button}>
          Login
        </button>

        <p className="text-xs mt-3">

          <span className="text-md" style={{fontSize:"13px",fontWeight: 600}}>Join Blood Guard  -  Register as</span> {"  "}
          <NavLink to="/Signup" className="underline">
            <span style={{ color: "blue",fontSize:"13px" }}>Donor</span>
          </NavLink>
          ,{"   or  "}
          <NavLink to="/organization-register" className="underline">
            <span style={{ color: "blue" ,fontSize:"13px"}}> Organization</span>
          </NavLink>
        </p>
      </form>
      {openPassword?.isOpen && openPassword?.type === "Password" && (
        <>
          <Modal
            title="Forgot Password"
            open={openPassword?.isOpen}
            onOk={handlePass}
            onCancel={handleCancel}
            footer={[
              <button key="back" onClick={handleCancel}
              className="bg-gray-400 mr-2 px-10 py-3 rounded-md text-white"
              >
                Cancel
              </button>,

              <button
                key="submit"
                onClick={handlePass}
                className="bg-[#E63946] px-10 py-3 rounded-md text-white"

              >
                Send
              </button>,
            ]}
          >
            <div className="w-full p-8 ">
              <div className="mt-4 text-left" style={styles.inputGroup}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="email"
                  required
                  onChange={handleChangePass}
                  value={passFormData?.email || ""}
                  name="email"
            style={styles.input}

                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="password"
                  onChange={handleChangePass}
                  value={passFormData?.new_password || ""}
                  name="new_password"
            style={styles.input}

                />
              </div>
              <div className="flex gap-4">
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pin
                  </label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                    type="otp"
                    required
                    onChange={handleChangePass}
                    value={passFormData?.pin || ""}
                    name="pin"
            style={styles.input}
                  />
                </div>
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <Select
                    className={`rounded-lg  font-medium border-gray-300  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                    style={{
                      width: "100%",
                      height: 49,
                    }}
                    placeholder="Select role"
                    optionFilterProp="label"
                    onChange={(value) => {
                      console.log("value->", value);
                      setPassFormData((prev) => ({ ...prev, role: value }));
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "DONOR",
                        label: "Donor",
                      },
                      {
                        value: "ORGANIZATION",
                        label: "Organization",
                      },
                   
                    ]}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}

      {open?.isOpen && open?.type === "Pin" && (
        <>
          <Modal
            title="Forgot Pin"
            open={open?.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
            <div className="w-full p-8 ">
              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="email"
                  required
                  onChange={handleChangePin}
                  value={pinFormData?.email || ""}
                  name="email"
            style={styles.input}

                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="password"
                  onChange={handleChangePin}
                  value={pinFormData?.password || ""}
                  name="password"
            style={styles.input}

                />
              </div>
              <div className="flex gap-4">
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <Select
                    className={`rounded-lg  font-medium border-gray-300  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    placeholder="Select role"
                    optionFilterProp="label"
                    onChange={(value) => {
                      console.log("value->", value);
                      setPinFormData((prev) => ({ ...prev, role: value }));
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "DONOR",
                        label: "Donor",
                      },
                      {
                        value: "ORGANIZATION",
                        label: "Organization",
                      },
                   
                    ]}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:'50px'
    // height: "80vh",
    // backgroundColor: "#f4f4f4",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "408px",
  },
  heading: {
    color: "#333",
    fontWeight: 700,
    fontSize: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#E63946",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default LoginPage;
