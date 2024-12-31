class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleDonationInquiry = () => {
    const message = this.createChatBotMessage(
      "You can donate blood if you're between 18-65 years old, weigh over 50kg, and are healthy. Would you like to find nearby donation camps?"
    );
    this.updateChatbotState(message);
  };

  handleBloodRequirement = () => {
    const message = this.createChatBotMessage(
      "To find blood donors or banks, please provide your location. Example: 'I need blood in New York.'"
    );
    this.updateChatbotState(message);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "Sorry, I didn't understand. Can you rephrase your question?"
    );
    this.updateChatbotState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage(
      "You're welcome! Feel free to ask if you need any help."
    );
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
