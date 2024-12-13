import { createChatBotMessage } from "react-chatbot-kit";

const chatbotConfig = {
  botName: "BloodDonorBot",
  initialMessages: [
    createChatBotMessage(
      "Hello! I'm here to help with blood donation. How can I assist you?"
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#e63946",
    },
    chatButton: {
      backgroundColor: "#1d3557",
    },
  },
};

export default chatbotConfig;
