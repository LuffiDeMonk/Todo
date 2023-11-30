import * as yup from "yup";

export const validationSchema = yup.object().shape({
  todo: yup.string().required("Empty form cannot be submitted"),
});
