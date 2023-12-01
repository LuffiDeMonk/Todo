import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../utils/FetchApi";
import { toggleDialog } from "../../redux-store/DialogSlice";
import { selectTodo } from "../../redux-store/TodoSlice";
import { IconButton } from "@material-tailwind/react";
import { DeleteIcon, EditIcon } from "../Icons";

const IconContainer = ({ todo }) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTodo, //this function calls the API to delete the todo based on its id. Notice the useMutation function directly passes the arguments to this function through mutate method
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      }); //this will trigger the API call to render updated data on the page
    },
  });

  //this function deals with the deletion of the selected todo
  const handleDelete = (event) => {
    event.stopPropagation(); //to avoid any event bubbling. Safety measure
    mutate(todo?.id);
  };

  //this function deals with the editing of selected todo
  const handleEdit = (event) => {
    event.stopPropagation();
    dispatch(selectTodo({ ...todo })); //dispatches the information of the selected todo in the state which is later fetched
    dispatch(toggleDialog()); //opens the editor panel
  };
  return (
    <div className="flex items-center gap-3">
      {/* delete todo icon */}
      <IconButton
        size="sm"
        onClick={handleDelete}
        ripple={false}
        className="bg-transparent shadow-none hover:shadow-none !w-6 !h-6 !md:w-8 !md:h-8 !focus:outline-none"
      >
        <DeleteIcon />
      </IconButton>

      {/* edit todo icon */}
      <IconButton
        size="sm"
        onClick={handleEdit}
        ripple={false}
        className="bg-transparent shadow-none hover:shadow-none !w-6 !h-6 !md:w-8 !md:h-8 !focus:outline-none"
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default IconContainer;
