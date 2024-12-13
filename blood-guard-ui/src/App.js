import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import NavBar from "./pages/navbar/NavBar";
import LoginPage from "./pages/login/Login";
import SignupForm from "./pages/Signup/Signup";
import About from "./pages/About/About";
import CsrImpact from "./pages/Csrimpact/CsrImpact";
import Contact from "./pages/contact/Contact";
import UserLayout from "./components/UserLayoyt";
import UserDashboard from "./pages/user/UserDashboard";
import Donars from "./pages/user/Donars";
import BloodCamps from "./pages/user/BloodCamps";
import PublicRoute from "./context/PublicRoute";
import PrivateRoute from "./context/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import UserProfile from "./components/Profile";
import DonationHistory from "./pages/user/DonationHistory";
import OrganizationDashboard from "./pages/organization/Dashboard";
import BloodCenters from "./pages/user/BloodCenters";
import BloodRequests from "./pages/organization/BloodRequests";
import GroupIcon from "./assests/bloodbot.png";
import CloseIcon from "./assests/closeb.png"
import ChatBot from "react-chatbotify";
import "react-chatbot-kit/build/main.css";
import OrganizationReister from "./pages/Signup/OrganizationRegister";
import AdminDashboard from "./pages/admin/Admin";
import AdminOrganizationList from "./pages/admin/Organization";
import OrganizationCamps from "./pages/organization/OrganizationCamps";
import OrganizationCenters from "./pages/organization/OrganizationCenters";
import CampDetails from "./pages/organization/ViewCampDetails";
import axiosInstance from "./context/apiInstance";
import { ThreeCircles } from "react-loader-spinner";
import EligibilityGuide from "./pages/EligibityGuide/EligibilityGuide";
import MotivationHub from "./pages/MotivationHub/MotivationHub";

function App() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = React.useState({});
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const settings = {
    tooltip: {
      mode: "NEVER",
      text: "",
    },
    chatButton: {
      icon: GroupIcon,
    },
    header: {
      avatar: GroupIcon,
      closeChatIcon: CloseIcon,
    },
  };

  const styles = {
    headerStyle: {
      background: "#fee2e2",
      color: "#DC2626",
      padding: "10px",
    },
    chatWindowStyle: {
      backgroundColor: "",
    },
    notificationBadgeStyle: {
      display: "none",
    },
    botBubbleStyle: {
      textAlign: "left",
      border: 0,
      backgroundColor: "#fee2e2",
      color: "red",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      marginBottom: "5px",
      fontSize: "14px",
    },
    userBubbleStyle: {
      textAlign: "left",
      border: 0,
      backgroundColor: "red",
      color: "rgba(255, 255, 255, 0.87)",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      fontSize: "14px",
    },
    botOptionStyle: {
      color: "red",
      backgroundColor: "#fee2e2",

      border: 0,
      fontSize: "14px",
      padding: "5px",
    },
    botOptionHoveredStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      textDecoration: "underline",
      backgroundColor: "#070707",
      padding: "5px",
      border: 0,
      transition: "none",
      fontSize: "14px",
    },
    chatInputContainerStyle: {
      borderTop: 0,
      backgroundColor: "transparent",
    },
    chatInputAreaStyle: {
      minHeight: 0,
      border: 0,
      padding: "8px 15px",
      backgroundColor: "black",
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: "14px",
    },
    sendButtonStyle: {
      display: "none",
    },
    chatWindowStyle: {
      height: "490px",
      paddingBottom: "10px",
      backgroundColor: "white",
      border: "1px solid grey",
    },
    bodyStyle: {
      paddingBottom: 0,
      backgroundColor: "white",
    },
    tooltipStyle: {
      padding: "8px 12px",
      borderRadius: "15px",
      background: "geen",
      color: "rgba(255, 255, 255, 0.87)",
    },
    chatHistoryLineBreakStyle: {
      color: "rgba(255, 255, 255, 0.87)",
    },
    chatHistoryButtonStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      backgroundColor: "#070707",
      border: 0,
    },
    chatHistoryButtonHoveredStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      backgroundColor: "#070707",
      border: 0,
      textDecoration: "underline",
    },

    // ...other styles
  };

  const themes = [
    { id: "solid_purple_haze", version: "0.1.0" },
    { id: "simple_blue", version: "0.1.0" },
  ];

  const flow = {
    start: {
      message: "Welcome to Blood Guard Bot! How may I assist you today?",
      options: ["Donor", "Organization"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Donor") return "donor_help";
        if (params.userInput === "Organization") return "organization_help";
      },
    },
    donor_help: {
      message: "What do you need help with?",
      options: [
        "Eligibility Check",
        "Find Donation Centers",
        "Find Donation Camps",
        "FAQ",
        "Create Support Ticket",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Eligibility Check")
          return "donor_eligibility_check";
        if (params.userInput === "Find Donation Centers")
          return "donor_find_centers";
        if (params.userInput === "Find Donation Camps")
          return "donor_find_camps";
        if (params.userInput === "FAQ") return "donor_faq";
        if (params.userInput === "Create Support Ticket")
          return "support_ticket";
      },
    },
    organization_help: {
      message: "What do you need help with?",
      options: [
        "Register Organization",
        "Create Donation Centers",
        "Create Donation Camps",
        "FAQ",
        "Create Support Ticket",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Register Organization")
          return "organization_register";
        if (params.userInput === "Create Donation Centers")
          return "organization_create_centers";
        if (params.userInput === "Create Donation Camps")
          return "organization_create_camps";
        if (params.userInput === "FAQ") return "organization_faq";
        if (params.userInput === "Create Support Ticket")
          return "support_ticket";
      },
    },
    // Donor-specific flows
    donor_eligibility_check: {
      message:
        "Please visit the Eligibility Checker under your Donor Dashboard for detailed eligibility verification.",
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    donor_find_centers: {
      message:
        "To find nearby donation centers, search under 'Donation Centers' in the main menu or visit the Knowledge Hub.",
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    donor_find_camps: {
      message:
        "For upcoming donation camps, check the 'Donation Camps' section on our website.",
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    donor_faq: {
      message:
        "You can view FAQs for Donors on the Knowledge Hub or ask a specific question here.",
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    // Organization-specific flows
    organization_register: {
      message:
        "To register your organization, go to the 'Organization Registration' section on the Blood Guard platform.",
      options: ["Back to Organization Options"],
      chatDisabled: true,
      path: "organization_help",
    },
    organization_create_centers: {
      message:
        "You can create new donation centers under the 'Donation Centers' section after logging in as an Organization Admin.",
      options: ["Back to Organization Options"],
      chatDisabled: true,
      path: "organization_help",
    },
    organization_create_camps: {
      message:
        "To create donation camps, visit the 'Donation Camps' section in your admin dashboard.",
      options: ["Back to Organization Options"],
      chatDisabled: true,
      path: "organization_help",
    },
    organization_faq: {
      message:
        "Find FAQs for Organizations in the Knowledge Hub or ask your question here.",
      options: ["Back to Organization Options"],
      chatDisabled: true,
      path: "organization_help",
    },
    // Support Ticket
    support_ticket: {
      message:
        "It seems your question needs further assistance. Let's create a support ticket. What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "support_email",
    },
    support_email: {
      message: "What is your email address?",
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: "support_question",
    },
    support_question: {
      message: "What is your question or concern?",
      function: (params) => setForm({ ...form, question: params.userInput }),
      path: "support_category",
    },
    support_category: {
      message: "Are you a Donor or Organization?",
      options: ["Donor", "Organization"],
      chatDisabled: true,
      function: (params) => setForm({ ...form, category: params.userInput }),
      path: "support_submission",
    },
    support_submission: {
      message:
        "Thank you! Your ticket has been submitted. Our team will get back to you shortly.",
      function: async () => {
        const response = await fetch("/helpdesk/ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        return response.ok;
      },
      options: ["Back to Start"],
      chatDisabled: true,
      path: "start",
    },
  };

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axiosInstance.interceptors.request.use(
      function (config) {
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    console.log("loading->", loading);

    axiosInstance.interceptors.response.use(
      function (response) {
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        console.log("intercept", error);
        return Promise.reject(error);
      }
    );
  }, []);

  const CustomToggleButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#e63946", // Blood red
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      🩸 {/* Custom blood drop icon */}
    </button>
  );

  return (
    <div className={`${isAuthenticated ? "sm:mx-[1%]" : "sm:mx-[10%]"} `}>
      {/* {loading && (
        <div className="loader-wrapper">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#7a6ad8"
          />
        </div>
      )} */}
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/csr-impact"
          element={
            <PublicRoute>
              <CsrImpact />
            </PublicRoute>
          }
        />
        <Route
          path="/eligibility-guide"
          element={
            <PublicRoute>
              <EligibilityGuide />
            </PublicRoute>
          }
        />
        <Route
          path="/motivation-hub"
          element={
            <PublicRoute>
              <MotivationHub />
            </PublicRoute>
          }
        />
        <Route
          path="/About"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <PublicRoute>
              <Contact />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          exact
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          exact
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
        <Route
          path="/organization-register"
          exact
          element={
            <PublicRoute>
              <OrganizationReister />
            </PublicRoute>
          }
        />
        {/* Donor Routes */}
        <Route
          path="/user-dashboard"
          exact
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route
            path="/user-dashboard/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/donors"
            exact
            element={
              <PrivateRoute>
                <Donars />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/camps"
            exact
            element={
              <PrivateRoute>
                <BloodCamps />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/centers"
            exact
            element={
              <PrivateRoute>
                <BloodCenters />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/donation-history"
            exact
            element={
              <PrivateRoute>
                <div>Donation History</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/profile"
            exact
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/history"
            exact
            element={
              <PrivateRoute>
                <DonationHistory />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Organization routes */}
        <Route
          path="/organization-dashboard"
          exact
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route
            path="/organization-dashboard/dashboard"
            element={
              <PrivateRoute>
                <OrganizationDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/donors"
            exact
            element={
              <PrivateRoute>
                <Donars type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/camps"
            exact
            element={
              <PrivateRoute>
                <OrganizationCamps type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/centers"
            exact
            element={
              <PrivateRoute>
                <OrganizationCenters type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/camp-details"
            exact
            element={
              <PrivateRoute>
                <CampDetails type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/donation-history"
            exact
            element={
              <PrivateRoute>
                <div>Donation History</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/profile"
            exact
            element={
              <PrivateRoute>
                <UserProfile type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/history"
            exact
            element={
              <PrivateRoute>
                <BloodRequests type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin-dashboard"
          exact
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route
            path="/admin-dashboard/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/organizations"
            exact
            element={
              <PrivateRoute>
                <AdminOrganizationList type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/donors"
            exact
            element={
              <PrivateRoute>
                <Donars />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/organization-dashboard/camps"
            exact
            element={
              <PrivateRoute>
                <BloodCamps type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/centers"
            exact
            element={
              <PrivateRoute>
                <BloodCenters type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/donation-history"
            exact
            element={
              <PrivateRoute>
                <div>Donation History</div>
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/organization-dashboard/profile"
            exact
            element={
              <PrivateRoute>
                <UserProfile type="ORGANIZATION" />
              </PrivateRoute>
            }
          />
          <Route
            path="/organization-dashboard/history"
            exact
            element={
              <PrivateRoute>
                <BloodRequests type="ORGANIZATION" />
              </PrivateRoute>
            }
          /> */}
        </Route>
      </Routes>

      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <ChatBot
          // settings={{
          //   // general: { embedded: true },
          //   chatHistory: { storageKey: "example_basic_form" },
          // }}
          flow={flow}
          themes={themes}
          styles={styles}
          settings={settings}
        />
      </div>
    </div>
  );
}

export default App;
