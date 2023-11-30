import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { IconButton, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { validationSchema } from "./TodoValidation";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../../utils/FetchApi";
import Loading from "../Loading";
import { variants } from "./variants";

const AddTodos = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: addTodo, //this is the function which sends todo to the JSON server

    //onSuccess is a method that is called after the successful completion of the API call. Here it is called so that updated data can be shown in the screen
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
  });

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      todo: "", //initial form values
    },
    onSubmit: (values, actions) => {
      let temp = {
        id: nanoid(), //adding unique id to each of the todo
        todo: values.todo,
        isCompleted: false,
        progress: 0,
      };
      mutate(temp); //send the todo data to the local JSON server
      actions.resetForm(); //resetForm is an action provided by the Formik to clear the form after submission
    },
    validationSchema,
  });

  //to handle the loading state when the data is being fetched from the local JSON server
  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 w-full bottom-0 z-10 h-20 py-2.5 bg-white dark:bg-[#2F2F34] transition-colors duration-300"
    >
      <form
        className="h-full rounded-lg container flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="todo"
          value={values.todo}
          onChange={handleChange}
          placeholder={
            errors.todo && touched.todo ? errors.todo : "Add a task" //if empty form is submitted by user, error is shown in the input placeholder
          }
          labelProps={{
            className: "hidden",
          }}
          className={`text-black !bg-transparent dark:text-white !font-Montserat border ring-transparent focus:ring-transparent focus:border-none ${
            errors.todo && touched.todo //if the input field is touched and error is present then the specific style is applied to the input field
              ? "placeholder:text-red-600"
              : ""
          }`}
        />
        <IconButton type="submit" className="bg-[#6D7FFF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </form>
    </motion.div>
  );
};

export default AddTodos;
