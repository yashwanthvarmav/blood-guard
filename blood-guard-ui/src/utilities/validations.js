import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "Password must contain one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const validate = (formData, setErrors) => {
  const newErrors = {};

  // First name validation
  if (!formData?.first_name?.trim()) {
    newErrors.first_name = "First name is required.";
  } else if (!/^[a-zA-Z]+$/.test(formData?.firstName)) {
    newErrors.first_name = "First name must contain only letters.";
  }

  // Last name validation
  if (!formData?.last_name?.trim()) {
    newErrors.last_name = "Last name is required.";
  } else if (!/^[a-zA-Z]+$/.test(formData?.last_name)) {
    newErrors.last_name = "Last name must contain only letters.";
  }

  // Email validation
  if (!formData?.email?.trim()) {
    newErrors.email = "Email is required.";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData?.email)
  ) {
    newErrors.email = "Please enter a valid email address.";
  }

  // Password validation
  if (!formData?.password) {
    newErrors.password = "Password is required.";
  } else if (formData?.password?.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
  } else if (
    !/\d/.test(formData?.password) ||
    !/[a-zA-Z]/.test(formData?.password)
  ) {
    newErrors.password = "Password must include letters and numbers.";
  }

  // Confirm password validation
  if (!formData?.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required.";
  } else if (formData?.password !== formData?.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Return true if no errors
};

export const validateOrg = (formData, setErrors) => {
  const newErrors = {};

  // First name validation
  if (!formData?.organization_name?.trim()) {
    newErrors.organization_name = "Organization name is required.";
  } else if (!/^[a-zA-Z]+$/.test(formData?.organization_name)) {
    newErrors.organization_name =
      "Organization name must contain only letters.";
  }

  // Last name validation
  if (!formData?.organization_branch_name?.trim()) {
    newErrors.organization_branch_name =
      "Organization branch name is required.";
  }

  // Email validation
  if (!formData?.organization_email?.trim()) {
    newErrors.organization_email = "Email is required.";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      formData?.organization_email
    )
  ) {
    newErrors.organization_email = "Please enter a valid email address.";
  }

  // Password validation
  if (!formData?.password) {
    newErrors.password = "Password is required.";
  } else if (formData?.password?.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
  } else if (
    !/\d/.test(formData?.password) ||
    !/[a-zA-Z]/.test(formData?.password)
  ) {
    newErrors.password = "Password must include letters and numbers.";
  }

  // Confirm password validation
  if (!formData?.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required.";
  } else if (formData?.password !== formData?.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Return true if no errors
};
