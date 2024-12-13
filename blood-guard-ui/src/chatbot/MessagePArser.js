class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("donate")) {
      this.actionProvider.handleDonationInquiry();
    } else if (
      lowerCaseMessage.includes("blood") ||
      lowerCaseMessage.includes("need")
    ) {
      this.actionProvider.handleBloodRequirement();
    } else if (
      lowerCaseMessage.includes("thanks") ||
      lowerCaseMessage.includes("thank you")
    ) {
      this.actionProvider.handleThanks();
    } else {
      this.actionProvider.handleDefault();
    }
  };
}

export default MessageParser;
