import { Checkbox, Typography } from "@material-tailwind/react";
import { updateTodoStatus } from "../../utils/FetchApi";
import { useMutation, useQueryClient } from "react-query";
import IconContainer from "./IconContainer";

const Todo = ({ todo }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
  });

  const onCheck = (event) => {
    event.stopPropagation();
    mutate({
      ...todo,
      isCompleted: !todo.isCompleted,
      progress: todo.isCompleted ? 0 : 100,
    });
  };

  return (
    <>
      <div className="p-4 bg-white dark:bg-[#2F2F34] shadow-md hover:shadow-black/20 dark:hover:shadow-gray-700/20 rounded-md flex items-center justify-between relative overflow-hidden">
        <Checkbox
          defaultChecked={todo?.isCompleted}
          onClick={(event) => onCheck(event)}
          color="green"
          ripple={false}
          label={
            <Typography
              variant="paragraph"
              className={`font-Montserat dark:text-white transition-colors duration-300 ${
                todo?.isCompleted
                  ? "text-green-500 line-through dark:text-green-500"
                  : ""
              }`}
            >
              {todo?.todo}
            </Typography>
          }
          className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-transparent hover:before:opacity-0"
        />
        <div className="flex items-center justify-between gap-10">
          {/* this code will be shown for pending task component only */}
          {!todo?.isCompleted && (
            <Typography
              variant="small"
              className="text-xs dark:text-white text-gray-500 font-Montserat hidden md:block"
            >
              {todo?.progress}% completed
            </Typography>
          )}
          <IconContainer todo={todo} />
        </div>
        {!todo?.isCompleted && (
          <div
            className={`absolute bottom-0 left-0 h-1 bg-[#248de3] dark:bg-light-green-700 rounded-md`}
            style={{
              width: `${todo?.progress}%`, //set the width of the progress indicator based on progress percentage
            }}
          />
        )}
      </div>
    </>
  );
};

export default Todo;
