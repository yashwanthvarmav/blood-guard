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
import GroupIcon from "./assests/bloodbot2.png";
import CloseIcon from "./assests/close_bot.png"
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
import ContactRequests from "./pages/admin/ContactRequests";
import SupportRequests from "./pages/admin/SupportRequests";
import CorprorateRequests from "./pages/admin/CorprateRequests";

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
      background: "rgb(183 28 28 / var(--tw-bg-opacity, 1))",
      color: "#DC2626",
      // padding: "10px",
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
      backgroundColor: "#D32F2F",
      color: "#FFFFFF",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      marginBottom: "5px",
      fontSize: "14px",
    },
    userBubbleStyle: {
      textAlign: "left",
      border: 0,
      backgroundColor: "#FFEBEE",
      color: "black",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      fontSize: "14px",
         
    },
    botOptionStyle: {
      color: "#333333",
      backgroundColor: "#F5F5F5",
      border: 0,
      fontSize: "14px",
      padding: "5px 15px",
    },
    botOptionHoveredStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      textDecoration: "underline",
      backgroundColor: "#070707",
      padding: "5px 15px",
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
      // padding: "10px",
      backgroundColor: "white",
      // border: "1px solid grey",
    },
    bodyStyle: {
      paddingBottom: 0,
      backgroundColor: "white",
      padding: "10px",
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
      options: ["DONOR", "ORGANIZATION", "CORPORATE"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "DONOR") return "donor_help";
        if (params.userInput === "ORGANIZATION") return "organization_help";
        if (params.userInput === "CORPORATE") return "corporate_help";
      },
    },
    donor_help: {
      message: "What do you need help with?",
      options: ["Eligibility Check", "Find Donation Centers", "Find Donation Camps", "Donor FAQs", "Help Desk"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Eligibility Check") return "donor_eligibility_check";
        if (params.userInput === "Find Donation Centers") return "donor_find_centers";
        if (params.userInput === "Find Donation Camps") return "donor_find_camps";
        if (params.userInput === "Donor FAQs") return "donor_faq_topics";
        if (params.userInput === "Help Desk") return "support_helpdesk";
      },
    },
    donor_faq_topics: {
      message: "Please choose a topic to find information.",
      options: [
        "Eligibility and Restrictions",
        "Preparation and Process",
        "Health and Safety",
        "Post-Donation and Usage",
        "Finding Donation Opportunities",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Eligibility and Restrictions") return "faq_eligibility_restrictions";
        if (params.userInput === "Preparation and Process") return "faq_preparation_process";
        if (params.userInput === "Health and Safety") return "faq_health_safety";
        if (params.userInput === "Post-Donation and Usage") return "faq_post_donation";
        if (params.userInput === "Finding Donation Opportunities") return "faq_finding_opportunities";
      },
    },
    faq_eligibility_restrictions: {
      message: "Please choose a question:",
      options: [
        "Who can donate blood?",
        "Can I donate blood if I am taking medication?",
        "Can I donate if I recently traveled abroad?",
        "Can I donate blood if I have a tattoo or piercing?",
        "Is there a weight limit for donating blood?",
        "Can I donate if I have diabetes?",
        "Can I donate blood during pregnancy?",
        "Can I donate blood if I had COVID-19?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Who can donate blood?": "faq_answer_who_can_donate",
          "Can I donate blood if I am taking medication?": "faq_answer_medication",
          "Can I donate if I recently traveled abroad?": "faq_answer_travel",
          "Can I donate blood if I have a tattoo or piercing?": "faq_answer_tattoo",
          "Is there a weight limit for donating blood?": "faq_answer_weight",
          "Can I donate if I have diabetes?": "faq_answer_diabetes",
          "Can I donate blood during pregnancy?": "faq_answer_pregnancy",
          "Can I donate blood if I had COVID-19?": "faq_answer_covid",
          "Back to Main Topics": "donor_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_who_can_donate: {
      message: "Anyone who is healthy, between 18 and 65 years, weighs at least 50 kg, and meets eligibility criteria can donate blood.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_eligibility_restrictions";
        if (params.userInput === "Back to Donor Options") return "donor_help";
      },
    },
    faq_answer_medication: {
      message: "It depends on the type of medication. Use the Blood Guard app to check eligibility based on your medical history.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_travel: {
      message: "Traveling to certain regions may temporarily disqualify you due to potential exposure to infectious diseases. Check your eligibility in the Blood Guard app.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_tattoo: {
      message: "Yes, but you must wait at least 6 months after getting a tattoo or piercing to ensure safety.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_weight: {
      message: "Yes, donors must weigh at least 50 kg (110 lbs) to ensure safe blood donation.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_diabetes: {
      message: "Yes, if your diabetes is well-controlled with diet or medication and you are otherwise healthy.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_pregnancy: {
      message: "No, blood donation is not allowed during pregnancy. Wait at least 6 months after delivery before donating blood.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },
    faq_answer_covid: {
      message: "Yes, but you must wait at least 14 days after recovery and being symptom-free before donating blood.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_eligibility_restrictions",
    },    
    faq_preparation_process: {
      message: "Please choose a question:",
      options: [
        "How often can I donate blood?",
        "What should I do before donating blood?",
        "How long does the blood donation process take?",
        "How do I prepare for blood donation?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How often can I donate blood?": "faq_answer_frequency",
          "What should I do before donating blood?": "faq_answer_preparation",
          "How long does the blood donation process take?": "faq_answer_duration",
          "How do I prepare for blood donation?": "faq_answer_prep_tips",
          "Back to Main Topics": "donor_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_frequency: {
      message: "You can donate whole blood every 12 weeks for men and every 16 weeks for women.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_preparation_process";
        if (params.userInput === "Back to Donor Options") return "donor_help";
      },
    },
    faq_answer_preparation: {
      message: "Stay hydrated, eat a healthy meal (avoid fatty foods), and get enough sleep the night before. Bring a valid ID and use the Blood Guard app to complete your eligibility check.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_preparation_process",
    },
    faq_answer_duration: {
      message: "The entire process typically takes 45 minutes to an hour. The actual blood draw only takes about 10 minutes.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_preparation_process",
    },
    faq_answer_prep_tips: {
      message: "Eat iron-rich foods, stay hydrated, and avoid alcohol before donation. Use the Blood Guard app for detailed preparation tips.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_preparation_process",
    },    
    faq_health_safety: {
      message: "Please choose a question:",
      options: [
        "Is blood donation safe?",
        "What are the benefits of donating blood?",
        "Does donating blood make me weak?",
        "What if I feel unwell after donating blood?",
        "Are there any risks involved in donating blood?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Is blood donation safe?": "faq_answer_safety",
          "What are the benefits of donating blood?": "faq_answer_benefits",
          "Does donating blood make me weak?": "faq_answer_weakness",
          "What if I feel unwell after donating blood?": "faq_answer_unwell",
          "Are there any risks involved in donating blood?": "faq_answer_risks",
          "Back to Main Topics": "donor_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_safety: {
      message: "Yes, blood donation is completely safe. Sterile and disposable equipment is used for every donor.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_health_safety";
        if (params.userInput === "Back to Donor Options") return "donor_help";
      },
    },
    faq_answer_benefits: {
      message: "Blood donation saves lives, improves your cardiovascular health, and helps maintain healthy iron levels.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_health_safety",
    },
    faq_answer_weakness: {
      message: "No, donating blood does not make you weak. Your body replenishes the donated blood volume within a few hours.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_health_safety",
    },
    faq_answer_unwell: {
      message: "If you feel unwell, rest, stay hydrated, and avoid strenuous activities. Contact your nearest center for support.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_health_safety",
    },
    faq_answer_risks: {
      message: "Blood donation is safe. Mild dizziness or bruising may occur but resolves quickly.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_health_safety",
    },
    faq_post_donation: {
      message: "Please choose a question:",
      options: [
        "How is my blood used?",
        "What happens if my blood is not suitable for donation?",
        "How is my privacy maintained?",
        "How can I track my donation history?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How is my blood used?": "faq_answer_blood_usage",
          "What happens if my blood is not suitable for donation?": "faq_answer_unsuitable_blood",
          "How is my privacy maintained?": "faq_answer_privacy",
          "How can I track my donation history?": "faq_answer_donation_history",
          "Back to Main Topics": "donor_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_blood_usage: {
      message: "Your blood is tested, processed, and distributed to hospitals for emergencies, surgeries, and treatments.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_post_donation";
        if (params.userInput === "Back to Donor Options") return "donor_help";
      },
    },
    faq_answer_unsuitable_blood: {
      message: "If your blood doesn't meet the criteria, you will be notified and guided to improve eligibility.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_post_donation",
    },
    faq_answer_privacy: {
      message: "All donor information is securely stored and used only for medical purposes, adhering to data regulations.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_post_donation",
    },
    faq_answer_donation_history: {
      message: "Use the Blood Guard app's Donation History feature to view past donations and upcoming opportunities.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_post_donation",
    },
    faq_finding_opportunities: {
      message: "Please choose a question:",
      options: [
        "How do I find a nearby donation center?",
        "How do I find a nearby donation camp?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I find a nearby donation center?": "faq_answer_find_center",
          "How do I find a nearby donation camp?": "faq_answer_find_camp",
          "Back to Main Topics": "donor_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_find_center: {
      message: "You can locate nearby donation centers in the Donation Centers section of the Blood Guard app.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_finding_opportunities";
        if (params.userInput === "Back to Donor Options") return "donor_help";
      },
    },
    faq_answer_find_camp: {
      message: "Use the Donation Camps feature in the Blood Guard app to find and register for upcoming camps.",
      options: ["Back to Questions", "Back to Donor Options"],
      chatDisabled: true,
      path: "faq_finding_opportunities",
    },    
    organization_help: {
      message: "What do you need help with?",
      options: ["Register Organization", "Create Donation Centers", "Create Donation Camps", "Organization FAQs", "Help Desk"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Register Organization") return "organization_register";
        if (params.userInput === "Create Donation Centers") return "organization_create_centers";
        if (params.userInput === "Create Donation Camps") return "organization_create_camps";
        if (params.userInput === "Organization FAQs") return "organization_faq_topics";
        if (params.userInput === "Help Desk") return "support_helpdesk";
      },
    },
    organization_faq_topics: {
      message: "Please choose a topic to find information:",
      options: [
        "Registration and Verification",
        "Managing Donation Centers and Camps",
        "Tracking and Managing Donations",
        "Platform Usage and Account Management",
        "Collaboration and Awareness",
        "Compliance and Reporting",
        "Back to Organization Options",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Registration and Verification": "faq_registration_verification",
          "Managing Donation Centers and Camps": "faq_donation_centers_camps",
          "Tracking and Managing Donations": "faq_tracking_donations",
          "Platform Usage and Account Management": "faq_platform_account",
          "Collaboration and Awareness": "faq_collaboration_awareness",
          "Compliance and Reporting": "faq_compliance_reporting",
          "Back to Organization Options": "organization_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_registration_verification: {
      message: "Please choose a question:",
      options: [
        "Who can register as an organization?",
        "What documents are required for registration?",
        "How do I register my organization?",
        "How long does it take to verify my organization?",
        "What happens after registration approval?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Who can register as an organization?": "faq_answer_register_org",
          "What documents are required for registration?": "faq_answer_register_docs",
          "How do I register my organization?": "faq_answer_register_process",
          "How long does it take to verify my organization?": "faq_answer_register_time",
          "What happens after registration approval?": "faq_answer_register_approval",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_register_org: {
      message: "Any certified and authorized blood donation organization, including government, private, and NGOs, can register on Blood Guard.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_registration_verification";
        if (params.userInput === "Back to Organization Options") return "organization_help";
      },
    },
    faq_answer_register_docs: {
      message: "You will need your organization’s license number, establishment date, contact details, and valid identification for verification.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_registration_verification",
    },
    faq_answer_documents_required: {
      message: "You will need your organization’s license number, establishment date, contact details, and valid identification for verification.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_registration_verification",
    },
    faq_answer_register_organization: {
      message: "Go to the 'Register as Organization' section on the homepage, fill out the form with your organization's details, upload required documents, and submit for verification.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_registration_verification",
    },
    faq_answer_verification_duration: {
      message: "The verification process usually takes 24-48 hours. You will be notified via email once your account is approved.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_registration_verification",
    },
    faq_answer_post_approval: {
      message: "Once approved, you can log in to your dashboard to manage donation centers, donation camps, and track donations.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_registration_verification",
    },    
    faq_donation_centers_camps: {
      message: "Please choose a question:",
      options: [
        "How do I add a donation center?",
        "Can I edit or remove an existing donation center?",
        "How many donation centers can I add?",
        "How do I ensure my donation center information is up-to-date?",
        "What is a donation camp?",
        "How do I create a donation camp?",
        "Can I edit or cancel a donation camp?",
        "What details do I need to provide for a donation camp?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I add a donation center?": "faq_answer_add_center",
          "Can I edit or remove an existing donation center?": "faq_answer_edit_remove_center",
          "How many donation centers can I add?": "faq_answer_center_limit",
          "How do I ensure my donation center information is up-to-date?": "faq_answer_update_center",
          "What is a donation camp?": "faq_answer_donation_camp",
          "How do I create a donation camp?": "faq_answer_create_camp",
          "Can I edit or cancel a donation camp?": "faq_answer_edit_cancel_camp",
          "What details do I need to provide for a donation camp?": "faq_answer_camp_details",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_add_center: {
      message: "Log in to your dashboard, navigate to 'Donation Centers', click 'Add Center', and provide the required details such as name, address, timings, and contact information.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions") return "faq_donation_centers_camps";
        if (params.userInput === "Back to Organization Options") return "organization_help";
      },
    },
    faq_answer_edit_remove_center: {
      message: "Yes, you can edit or remove donation centers via the 'Manage Donation Centers' section in your dashboard.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_edit_donation_center: {
      message: "Yes, you can edit or remove donation centers via the 'Manage Donation Centers' section in your dashboard.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_center_limit: {
      message: "There is no limit. You can add as many donation centers as your organization requires.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_update_center_info: {
      message: "Regularly review and update your donation center details in the dashboard to ensure accuracy.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_donation_camp_definition: {
      message: "A donation camp is a temporary blood donation event organized by your organization at a specific location to collect donations.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_create_donation_camp: {
      message: "Log in to your dashboard, navigate to 'Donation Camps', click 'Create Camp', and provide details like location, date, time, and any collaboration information.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_edit_cancel_camp: {
      message: "Yes, you can edit or cancel upcoming donation camps from the 'Manage Donation Camps' section in your dashboard.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },
    faq_answer_camp_details_required: {
      message: "You will need the camp name, address, contact details, start and end date, timings, and any collaboration information.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_donation_centers_camps",
    },    
    faq_tracking_donations: {
      message: "Please choose a question:",
      options: [
        "How can I track blood donations?",
        "How do I update the status of a blood donation?",
        "Can I view a list of eligible donors?",
        "What if a donor doesn’t show up for their scheduled donation?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I track blood donations?": "faq_answer_track_donations",
          "How do I update the status of a blood donation?": "faq_answer_update_status",
          "Can I view a list of eligible donors?": "faq_answer_view_donors",
          "What if a donor doesn’t show up for their scheduled donation?": "faq_answer_no_show",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_track_donations: {
      message: "The 'Donations' section in your dashboard allows you to view, track, and manage all donations made at your centers or camps.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_tracking_donations",
    },
    faq_answer_update_status: {
      message: "You can update the status (e.g., completed, pending, canceled) for each donor directly in the 'Donations' section.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_tracking_donations",
    },
    faq_answer_view_donors: {
      message: "Yes, you can filter and view eligible donors in the 'Eligible Donors' section of your dashboard.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_tracking_donations",
    },
    faq_answer_no_show: {
      message: "You can mark the donor as a no-show and notify them using the system's email notification feature.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_tracking_donations",
    },    
    faq_platform_account: {
      message: "Please choose a question:",
      options: [
        "What should I do if I encounter issues with the platform?",
        "Can I assign multiple admins to manage the organization account?",
        "How do I update my organization’s details?",
        "What is the role of the organization dashboard?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "What should I do if I encounter issues with the platform?": "faq_answer_issues_platform",
          "Can I assign multiple admins to manage the organization account?": "faq_answer_multiple_admins",
          "How do I update my organization’s details?": "faq_answer_update_details",
          "What is the role of the organization dashboard?": "faq_answer_dashboard_role",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_issues_platform: {
      message: "Reach out to our support team via the 'Help & Support' section on the dashboard or email us at support@bloodguard.com.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_platform_account",
    },
    faq_answer_multiple_admins: {
      message: "Yes, you can assign multiple admins or coordinators from your organization to manage the account.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_platform_account",
    },
    faq_answer_update_details: {
      message: "Navigate to the 'Profile Settings' section to update your organization’s information, such as address, contact details, or admin information.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_platform_account",
    },
    faq_answer_dashboard_role: {
      message: "The dashboard is your central hub for managing donation centers, camps, donor data, and tracking overall blood donation activities.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_platform_account",
    },    
    faq_collaboration_awareness: {
      message: "Please choose a question:",
      options: [
        "Can I collaborate with other organizations for donation drives?",
        "How do I share updates or announcements about donation events?",
        "How can I create awareness about donation drives?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Can I collaborate with other organizations for donation drives?": "faq_answer_collaborate_orgs",
          "How do I share updates or announcements about donation events?": "faq_answer_share_updates",
          "How can I create awareness about donation drives?": "faq_answer_create_awareness",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_collaborate_orgs: {
      message: "Yes, the platform allows you to collaborate with other registered organizations for large-scale donation events.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_collaboration_awareness",
    },
    faq_answer_share_updates: {
      message: "Use the 'Announcements' feature in your dashboard to share updates with donors and collaborators.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_collaboration_awareness",
    },
    faq_answer_create_awareness: {
      message: "The platform provides tools to generate email campaigns and share event details with your network and donors.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_collaboration_awareness",
    },    
    faq_compliance_reporting: {
      message: "Please choose a question:",
      options: [
        "What compliance requirements should my organization follow?",
        "Can I upload compliance certificates?",
        "What happens if my organization violates platform policies?",
        "Can I integrate external tools or systems with the platform?",
        "Can I download reports of donations?",
        "How do I request donors for urgent donation requirements?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "What compliance requirements should my organization follow?": "faq_answer_compliance_requirements",
          "Can I upload compliance certificates?": "faq_answer_upload_certificates",
          "What happens if my organization violates platform policies?": "faq_answer_violate_policies",
          "Can I integrate external tools or systems with the platform?": "faq_answer_integrate_tools",
          "Can I download reports of donations?": "faq_answer_download_reports",
          "How do I request donors for urgent donation requirements?": "faq_answer_request_donors",
          "Back to Main Topics": "organization_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_compliance_requirements: {
      message: "All donation-related activities must comply with local and national blood donation laws. The platform will prompt you to verify compliance during setup.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },
    faq_answer_upload_certificates: {
      message: "Yes, you can upload compliance and authorization certificates in the 'Organization Profile' section.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },
    faq_answer_violate_policies: {
      message: "Non-compliance may result in suspension or termination of your account. Contact support for resolution.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },
    faq_answer_integrate_tools: {
      message: "Currently, integrations are limited. Contact support for custom integration requirements.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },
    faq_answer_download_reports: {
      message: "Yes, you can generate and download detailed reports from the 'Reports' section.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },
    faq_answer_request_donors: {
      message: "Use the Request feature in the Eligible Donors dashboard to send email notifications to donors.",
      options: ["Back to Questions", "Back to Organization Options"],
      chatDisabled: true,
      path: "faq_compliance_reporting",
    },                
    corporate_help: {
      message: "What do you need help with?",
      options: ["Corporate FAQs", "Check Camp Status"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Corporate FAQs") return "corporate_faq_topics";
        if (params.userInput === "Check Camp Status") return "corporate_check_status_email";
      },
    },
    corporate_faq_topics: {
      message: "Please choose a topic to find information:",
      options: [
        "Partnership and Inquiry Process",
        "Camp Support and Customization",
        "Troubleshooting and Assistance",
        "Back to Corporate Options",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Partnership and Inquiry Process": "faq_partnership_inquiry",
          "Camp Support and Customization": "faq_camp_support",
          "Troubleshooting and Assistance": "faq_troubleshooting",
          "Back to Corporate Options": "corporate_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_partnership_inquiry: {
      message: "Please choose a question:",
      options: [
        "What is Corporate Social Responsibility (CSR) in Blood Guard?",
        "How can my organization partner with Blood Guard?",
        "What happens after submitting a camp inquiry form?",
        "How can I check the status of my blood donation camp inquiry?",
        "Is there a fee for partnering with Blood Guard for blood donation camps?",
        "Who can I contact for additional queries about Corporate Impact?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "What is Corporate Social Responsibility (CSR) in Blood Guard?": "faq_answer_csr",
          "How can my organization partner with Blood Guard?": "faq_answer_partner",
          "What happens after submitting a camp inquiry form?": "faq_answer_inquiry_process",
          "How can I check the status of my blood donation camp inquiry?": "faq_answer_check_status",
          "Is there a fee for partnering with Blood Guard for blood donation camps?": "faq_answer_fee",
          "Who can I contact for additional queries about Corporate Impact?": "faq_answer_contact",
          "Back to Main Topics": "corporate_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_csr: {
      message: "CSR in Blood Guard allows organizations to contribute by organizing blood donation camps, promoting health, and saving lives.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_answer_partner: {
      message: "Partner by clicking 'Corporate Impact' > 'Partner with Us', filling the form, and receiving a registration ID.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_answer_inquiry_process: {
      message: "After submitting, you'll get a confirmation email. Our team will review and contact you for further coordination.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_answer_check_status: {
      message: "Go to 'Corporate Impact' > 'Check Camp Status', enter your email and Corporate ID to check your inquiry's status.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_answer_fee: {
      message: "Partnering with Blood Guard for blood donation camps is free of charge as part of our mission to save lives.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_answer_contact: {
      message: "For additional queries, visit the Help Desk under 'Corporate Impact' or submit a support ticket.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_partnership_inquiry",
    },
    faq_camp_support: {
      message: "Please choose a question:",
      options: [
        "What support does Blood Guard provide for organizing blood donation camps?",
        "Can Blood Guard assist with post-camp reporting?",
        "Can we customize the blood donation camp according to our CSR goals?",
        "How does Blood Guard ensure the safety and hygiene of blood donation camps?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "What support does Blood Guard provide for organizing blood donation camps?": "faq_answer_support",
          "Can Blood Guard assist with post-camp reporting?": "faq_answer_post_camp",
          "Can we customize the blood donation camp according to our CSR goals?": "faq_answer_customize",
          "How does Blood Guard ensure the safety and hygiene of blood donation camps?": "faq_answer_safety",
          "Back to Main Topics": "corporate_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_support: {
      message: "Blood Guard provides end-to-end support, including venue setup, donor registration, medical staff coordination, and reporting.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_camp_support",
    },
    faq_answer_post_camp: {
      message: "Blood Guard provides post-camp reporting, including donor count, units collected, and feedback for transparency.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_camp_support",
    },
    faq_answer_customize: {
      message: "Yes, camps can be tailored to meet your CSR objectives. Specify requirements during the form submission process.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_camp_support",
    },
    faq_answer_safety: {
      message: "Blood Guard ensures safety with certified staff, sanitized equipment, proper screening, and adherence to safety protocols.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_camp_support",
    },
    faq_troubleshooting: {
      message: "Please choose a question:",
      options: [
        "What should I do if I encounter an issue while submitting the partnership form?",
        "How will I know if my inquiry is approved or rejected?",
        "Back to Main Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "What should I do if I encounter an issue while submitting the partnership form?": "faq_answer_form_issue",
          "How will I know if my inquiry is approved or rejected?": "faq_answer_inquiry_status",
          "Back to Main Topics": "corporate_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_form_issue: {
      message: "Ensure all fields are filled, check your internet connection, or contact support via the Help Desk if the issue persists.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_troubleshooting",
    },
    faq_answer_inquiry_status: {
      message: "You will receive email updates. Approved inquiries will lead to further coordination; rejections include remarks for improvement.",
      options: ["Back to Questions", "Back to Corporate Options"],
      chatDisabled: true,
      path: "faq_troubleshooting",
    },
    donor_eligibility_check: {
      message: `Please visit the Eligibility Checker under your Donor Dashboard for detailed eligibility verification. <a href="http://localhost:3000/donor-eligibility" target="_blank">Check Eligibility</a>`,
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    donor_find_centers: {
      message: `To find nearby donation centers, visit the Donation Centers section. <a href="http://localhost:3000/donor-centers" target="_blank">Find Centers</a>`,
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    donor_find_camps: {
      message: `For upcoming donation camps, check the Donation Camps section. <a href="http://localhost:3000/donor-camps" target="_blank">Find Camps</a>`,
      options: ["Back to Donor Options"],
      chatDisabled: true,
      path: "donor_help",
    },
    support_helpdesk: {
      message: "What do you need help with?",
      options: ["Create Ticket", "Check Ticket Status"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Create Ticket") return "support_create_ticket";
        if (params.userInput === "Check Ticket Status") return "check_ticket_email";
      },
    },
    support_helpdesk: {
      message: "What do you need help with?",
      options: ["Create Ticket", "Check Ticket Status"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Create Ticket") return "support_create_ticket";
        if (params.userInput === "Check Ticket Status") return "check_ticket_email";
      },
    },
    support_helpdesk: {
      message: "What do you need help with?",
      options: ["Create Ticket", "Check Ticket Status"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Create Ticket") return "support_create_ticket";
        if (params.userInput === "Check Ticket Status") return "check_ticket_email";
      },
    },
    support_create_ticket: {
      message: "Let's create a support ticket. What is your name?",
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_name: params.userInput })),
      path: "support_ticket_email",
    },
    support_ticket_email: {
      message: "What is your email address?",
      validateInput: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return {
            success: false,
            promptContent: "Please enter a valid email address!",
            promptType: "error", // Ensures clear error type handling
          };
        }
        return { success: true };
      },
      function: (params) => {
        setForm((prevForm) => ({ ...prevForm, support_email: params.userInput }));
      },
      path: (params) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.userInput)) {
          return "support_ticket_email"; // Redirect to the same step on invalid input
        }
        return "support_ticket_phone";
      },
    },    
    support_ticket_phone: {
      message: "What is your phone number?",
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_phone_number: params.userInput })),
      path: "support_ticket_type",
    },
    support_ticket_type: {
      message: "Are you a Donor or Organization?",
      options: ["DONOR", "ORGANIZATION"],
      chatDisabled: true,
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_type: params.userInput })),
      path: "support_ticket_subject",
    },
    support_ticket_subject: {
      message: "What is the subject of your request?",
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_subject: params.userInput })),
      path: "support_ticket_message",
    },
    support_ticket_message: {
      message: "Please describe your issue or request.",
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_message: params.userInput })),
      path: "support_submission",
    },
    support_submission: {
      message: async () => {
        try {
          const response = await fetch("http://localhost:3001/api/support/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            return `Error: ${errorData.error}. Please try again.`;
          }
  
          const { support } = await response.json();
          return `
            Support ticket created successfully!
            - Ticket ID: ${support.support_id}
            - Name: ${support.support_name}
            - Email: ${support.support_email}
          `;
        } catch (err) {
          return `An error occurred while submitting your ticket. Please try again.`;
        }
      },
      options: ["Back to Start"],
      chatDisabled: true,
      path: "start",
    },
    check_ticket_email: {
      message: "What is your email address used to register Ticket?",
      validateInput: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return {
            success: false,
            promptContent: "Please enter a valid email address!",
            promptType: "error", // Ensure this matches your framework's expected error type
          };
        }
        return { success: true };
      },
      function: (params) => {
        setForm((prevForm) => ({ ...prevForm, support_email: params.userInput }));
      },
      path: (params) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.userInput)) {
          return "check_ticket_email"; // Retry the same step if validation fails
        }
        return "check_ticket_status";
      },
    },    
    check_ticket_status: {
      message: "Please enter your Ticket ID. If you don’t remember it, you can find it in the email you used to raise the ticket.",
      validateInput: (input) => {
        return !isNaN(input)
          ? { success: true }
          : { success: false, promptContent: "Ticket ID must be a number!", promptType: "error" };
      },
      function: (params) => setForm((prevForm) => ({ ...prevForm, support_id: params.userInput })),
      path: "ticket_status_response",
    },
    ticket_status_response: {
      message: async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/support/list?support_id=${form.support_id}&support_email=${form.support_email}`);
  
          if (!response.ok) {
            return "Unable to fetch ticket status. Please ensure the Ticket ID is correct.";
          }
  
          const data = await response.json();
          if (data.total === 0) {
            return "No ticket found with the provided ID and email.";
          }
  
          const ticket = data.supports[0];
          return `
            BloodGuard Support Ticket Details:
            - Ticket ID : ${ticket.support_id}
            - Name: ${ticket.support_name}
            - Email: ${ticket.support_email}
            - Subject: ${ticket.support_subject}
            - Status: ${ticket.support_status}
            - Remarks: ${ticket.support_remarks || "No remarks"}
          `;
        } catch (err) {
          return `An error occurred while fetching the ticket status. Please try again.`;
        }
      },
      options: ["Back to Start"],
      chatDisabled: true,
      path: "start",
    },
    corporate_check_status_email: {
      message: "Please enter your corporate email.",
      validateInput: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input)
          ? { success: true }
          : { success: false, promptContent: "Please enter a valid email address!", promptType: "error" };
      },
      function: (params) => setForm((prevForm) => ({ ...prevForm, corporate_email: params.userInput })),
      path: "corporate_check_status_id",
    },
    corporate_check_status_id: {
      message: "Please enter your Corporate ID.",
      validateInput: (input) => {
        return !isNaN(input)
          ? { success: true }
          : { success: false, promptContent: "Corporate ID must be a number!", promptType: "error" };
      },
      function: (params) => setForm((prevForm) => ({ ...prevForm, corporate_id: params.userInput })),
      path: "corporate_status_response",
    },
    corporate_status_response: {
      message: async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/corporate/list?corporate_email=${form.corporate_email}&corporate_id=${form.corporate_id}`
          );
  
          if (!response.ok) {
            return "Unable to fetch camp status. Please ensure the details are correct.";
          }
  
          const data = await response.json();
          if (data.total === 0) {
            return "No camp found with the provided details.";
          }
  
          const camp = data.records[0];
          return `
            Camp Details:
            - Company Name: ${camp.corporate_company_name}
            - Camp Name: ${camp.corporate_camp_name}
            - SPOC Name: ${camp.corporate_spoc_name}
            - Phone Number: ${camp.corporate_phone_number}
            - Email: ${camp.corporate_email}
            - Camp Status: ${camp.support_status}
            - Camp request Remarks: ${camp.support_remarks}
          `;
        } catch (err) {
          return "An error occurred while fetching the camp status. Please try again.";
        }
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


      console.log("loading->", loading);

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
      {loading && (
        <div className="loader-wrapper">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="rgba(183, 29, 28,0.8)"
          />
        </div>
      )}
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
                <AdminOrganizationList  />
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
           <Route
            path="/admin-dashboard/centers"
            exact
            element={
              <PrivateRoute>
                <OrganizationCenters type="ADMIN"/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/camps"
            exact
            element={
              <PrivateRoute>
               <OrganizationCamps type="ADMIN"  />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/details"
            exact
            element={
              <PrivateRoute>
                <CampDetails type="ADMIN" />
              </PrivateRoute>
            }
          />
           <Route
            path="/admin-dashboard/contact-requests"
            exact
            element={
              <PrivateRoute>
                <ContactRequests />
              </PrivateRoute>
            }
          />
            <Route
            path="/admin-dashboard/support-requests"
            exact
            element={
              <PrivateRoute>
                <SupportRequests  />
              </PrivateRoute>
            }
          />
            <Route
            path="/admin-dashboard/corprate-requests"
            exact
            element={
              <PrivateRoute>
                <CorprorateRequests  />
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
