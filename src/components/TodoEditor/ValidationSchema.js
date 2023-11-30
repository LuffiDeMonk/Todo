import * as yup from "yup";

export const validationSchema = yup.object().shape({
  todo: yup.string().required("This is a required field"),
  description: yup.string().required("This is a required field"),
  duration: yup.string().required("Please enter a valid date"),
  progress: yup
    .number()
    .integer("Please enter integer values only")
    .required("This is a required field")
    .min(0, "Enter a number between 0-100")
    .max(100, "Enter a number between 0-100"),
});
