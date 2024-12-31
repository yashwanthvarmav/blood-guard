export const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Anyone aged 18–65, weighing at least 50 kg, and in good health can donate blood. Specific eligibility may vary depending on your location or health conditions.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 12 weeks (for men) and every 16 weeks (for women). Plasma donations can be made more frequently.",
  },
  {
    question: "What should I do before donating blood?",
    answer:
      "Drink plenty of water, have a nutritious meal, avoid alcohol for 24 hours prior, and get enough sleep the night before.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes, it is completely safe. Sterile equipment is used for each donation, ensuring there is no risk of infection.",
  },
  {
    question: "What are the benefits of donating blood?",
    answer:
      "Helps save lives, stimulates the production of new blood cells, and provides a free mini-health checkup.",
  },
  {
    question: "How long does the blood donation process take?",
    answer:
      "The entire process, including registration, health check, and donation, takes about 45 minutes to an hour. The blood collection itself usually takes 10–15 minutes.",
  },
  {
    question: "Can I donate blood if I am taking medication?",
    answer:
      "It depends on the medication. Inform the donation center staff about your medications, and they will advise accordingly.",
  },
  {
    question: "What if I feel unwell after donating blood?",
    answer:
      "If you feel dizzy or lightheaded, lie down and rest. Contact the donation center if symptoms persist.",
  },
  {
    question: "Can I donate if I recently traveled abroad?",
    answer:
      "It depends on the region and potential exposure to diseases like malaria. Check with your local donation center.",
  },
  {
    question: "Does donating blood make me weak?",
    answer:
      "Most people feel fine after donating blood. Drinking fluids and eating after donation helps replenish your energy.",
  },
  {
    question: "How is my blood used?",
    answer:
      "Your blood is tested, processed, and stored. It can be used for trauma victims, surgeries, cancer patients, or individuals with blood disorders.",
  },
  {
    question: "Can I donate blood if I have a tattoo or piercing?",
    answer:
      "Yes, but you may need to wait 6–12 months depending on your location and the safety of the procedure.",
  },
  {
    question: "Is there a weight limit for donating blood?",
    answer: "Yes, donors must weigh at least 50 kg to ensure their safety.",
  },
  {
    question: "Can I donate if I have diabetes?",
    answer:
      "Yes, if your diabetes is well-controlled and you meet other eligibility criteria.",
  },
  {
    question: "How do I prepare for blood donation?",
    answer:
      "Stay hydrated, eat iron-rich foods, and avoid heavy exercise immediately before and after donating.",
  },
  {
    question: "How do I find a nearby donation center?",
    answer:
      'Use the "Where to Give Blood" feature on our website to locate a center near you.',
  },
];

export const ServiceData = [
  {
    title: "test1",
    content: "Hello1",
    backgroundImage:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
  },
  {
    title: "test2",
    content: "Hello2",
    backgroundImage:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
  },
  {
    title: "test3",
    content: "Hello3",
    backgroundImage:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
  },
  {
    title: "test4",
    content: "Hello4",
    backgroundImage:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
  },
];

export const createAcoountInitalData = {
  first_name: "",
  last_name: "",
  date_of_birth: "", // Format: YYYY-MM-DD
  gender: "", // Male, Female, Other
  blood_group: "", // Options: A+, A-, B+, B-, AB+, AB-, O+, O-
  primary_phone_number: "",
  secondary_phone_number: "",
  email: "",
  home_address_line_one: "",
  home_address_line_two: "",
  home_city: "",
  home_state: "",
  home_country: "",
  home_zip_code: "",
  work_address_line_one: "",
  work_address_line_two: "",
  work_city: "",
  work_state: "",
  work_country: "",
  work_zip_code: "",
  role: "",
  password: "",
  user_account_status: "ACTIVE",
  user_notifications: "",
};

export const createOrgAccountInitalData = {
  organization_code: "",
  organization_license_number: "",
  organization_name: "",
  organization_branch_name: "",
  organization_date_of_establishment: "",
  organization_primary_phone_number: "",
  organization_secondary_phone_number: "",
  organization_email: "",
  organization_address_line_one: "",
  organization_address_line_two: "",
  organization_city: "",
  organization_state: "",
  organization_country: "",
  organization_zip_code: "",
  password: "",
  role: "ORGANIZATION",
  organization_type: "",
  organization_account_status: "NEW",
};

export const ACCOUNT_ROLES = {
  DONOR: "/user-dashboard/dashboard",
  ORGANIZATION: "/organization-dashboard/dashboard",
  ADMIN: "/admin-dashboard/dashboard",
  "ORG-ADMIN": "/organization-dashboard/dashboard",
};

export const quotes = [
  "Donate blood, save a life.",
  "Be a hero—give the gift of life through blood donation.",
  "A drop of blood can bring a smile to someone’s face.",
  "You don’t have to be a doctor to save lives—just donate blood.",
  "Your blood donation is the lifeline someone desperately needs.",
  "A small act of kindness can make a big difference—donate blood.",
  "Share your precious blood, because someone’s life depends on it.",
  "Be the reason someone lives another day.",
  "Blood donation is the real act of humanity.",
  "Every drop you give can paint a brighter future for someone in need.",
  "Your blood is replaceable; a life is not.",
  "One pint of blood can save up to three lives—be that difference.",
  "Make blood donation your habit; it’s a habit that saves lives.",
  "The need for blood never stops—be a regular donor.",
  "You have the power to turn pain into hope—donate blood.",
  "A simple donation can change the destiny of a family.",
  "Donating blood is a small gesture but a huge impact.",
  "Be a part of the solution—donate blood today.",
  "Life flows through your veins—share it with someone in need.",
  "Be a silent angel—give your blood and save lives.",
  "Saving one life makes you a hero; saving many makes you a legend.",
  "Your blood is a priceless gift—share it generously.",
  "Heroes aren’t born; they are those who donate blood.",
  "Your blood donation today is someone’s heartbeat tomorrow.",
  "A single drop of blood can create a ripple of hope.",
  "Be the change you want to see in the world—start with blood donation.",
  "Donate blood. Be the miracle someone is waiting for.",
  "Your blood has the power to give someone another chance at life.",
  "Kindness is giving without expecting—blood donation embodies this.",
  "The greatest gift you can give is the gift of life. Donate blood.",
];
