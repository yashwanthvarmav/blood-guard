import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../context/apis";
import OtpInput from "../../components/OtpInput";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_pin: "",
    role: "DONOR",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      // const payload = {
      //   email: "monkollasandeep000999@gmail.com",
      //   password: "admin123",
      //   user_pin: 551389,
      // };
      const { role, otp, ...rest } = formData;
      rest.user_pin = Number(otp.join(""));
      let url = "/login-user";
      if (role === "ORGANIZATION") {
        url = "/login-organization";
        rest.organization_pin = Number(otp.join(""));
        delete rest.user_pin;
      }
      const userData = await loginApi(url, rest);
      localStorage.setItem("authToken", userData.token);
      const updatedUser = { ...userData };
      if (!userData?.user) {
        updatedUser.user = { ...userData.organization };
      }
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Login successfull");
      login();
      navigate("/");
    } catch (error) {
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

        <div className="flex space-x-5 mb-4">
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

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p className="text-xs mt-3">
          Create an account for here{" "}
          <NavLink to="/Signup" className="underline">
            <span style={{ color: "blue" }}>Donor Register</span>
          </NavLink>
          ,{"     "}
          <NavLink to="/organization-register" className="underline">
            <span style={{ color: "blue" }}> Organization Register</span>
          </NavLink>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
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
