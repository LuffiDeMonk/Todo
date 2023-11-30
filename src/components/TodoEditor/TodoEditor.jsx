import { useMutation, useQueryClient } from "react-query";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../../redux-store/DialogSlice";
import { clearTodo } from "../../redux-store/TodoSlice";

import CustomInput from "./CustomInput";

import { validationSchema } from "./ValidationSchema";
import { updateTodoStatus } from "../../utils/FetchApi";

const TodoEditor = () => {
  const open = useSelector((state) => state.dialogBox?.openEditBox); //redux state to control the opening and closing of editor panel
  const selectedData = useSelector((state) => state.todo?.selectedTodo); //redux state to store the information of the selected todo

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodoStatus, //this is the function that makes API call to edit the todo information
    onSuccess: () => {
      queryClient.invalidateQueries(["todo"]);
    },
  });

  const handleSubmit = (values) => {
    let temp = { ...values };
    if (temp.progress === 100) {
      temp.isCompleted = true; //checks if the user sets the progress to 100, then the task is automatically completed
    } else {
      temp.isCompleted = false; //if the progress is less than 100 then the task is incompleted
    }
    mutate({ id: selectedData?.id, ...temp });
    dispatch(toggleDialog());
  };

  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleDialog());
    dispatch(clearTodo());
  };
  return (
    <>
      <Dialog open={open} handler={handler} className="focus:outline-none">
        <DialogHeader className="font-Montserat">Task Info</DialogHeader>
        <Formik
          initialValues={{
            todo: selectedData?.todo,
            description: selectedData?.description,
            duration: selectedData?.duration,
            progress: selectedData?.progress,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form>
                <DialogBody className="flex flex-col gap-2">
                  <CustomInput
                    {...props}
                    type="text"
                    title="Enter your task title"
                    name="todo"
                  />
                  <CustomInput
                    {...props}
                    isTextArea={true}
                    type="textArea"
                    title="Describe your task"
                    name="description"
                  />
                  <CustomInput
                    {...props}
                    type="date"
                    title="Enter your deadline"
                    name="duration"
                  />
                  <CustomInput
                    {...props}
                    title="Enter your progress (in percentage)"
                    type="number"
                    name="progress"
                  />

                  <Button
                    ripple={false}
                    type="submit"
                    className="!w-full mt-4 !bg-[#6D7FFF]"
                  >
                    Submit
                  </Button>
                </DialogBody>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default TodoEditor;
