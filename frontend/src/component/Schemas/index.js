import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Minimum 2 Charater")
    .max(25, "Maximum 25 Charater")
    .required("Please enter your First Name"),
  lastName: Yup.string()
    .min(2, "Minimum 2 Charater")
    .max(25, "Maximum 25 Charater")
    .required("Please enter your Last Name"),
  email: Yup.string()
    .email("Enter correct Email Address")
    .required("Please enter your Email"),
  gender: Yup.string()
    .required()
    .oneOf(
      ["male", "female", "other"],
      "Selecting the Gender field is required"
    ),
  password: Yup.string()
    .min(6, "Minimum 6 length")
    .required("Please enter your Password"),
  cpassword: Yup.string()
    .required("Please enter Confirm Password")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password must match"
    ),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter correct Email Address")
    .required("Please enter your Email"),
  password: Yup.string()
    .min(6, "Minimum 6 length")
    .required("Please enter your Password"),
});

export const userInputMessage = Yup.object({
  message: Yup.string().min(1).required(),
});
