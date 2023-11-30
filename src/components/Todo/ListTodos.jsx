import { Typography } from "@material-tailwind/react";

import { useQuery } from "react-query";
import { fetchAllTodo } from "../../utils/FetchApi";

import TodoContainer from "../TodoContainer/TodoContainer";
import Loading from "../Loading";

const ListTodos = () => {
  const { data, isLoading } = useQuery(
    {
      queryKey: ["todo"],
      queryFn: fetchAllTodo,
    },
    {
      refetchOnWindowFocus: false, //this prohibits API call when we are not viewing the application
    }
  );

  //filtering the data so that both completed and pending todo data can be sent to its corresponding components
  const pendingData = data?.filter((item) => item.isCompleted === false);
  const completedData = data?.filter((item) => item.isCompleted === true);

  //this will show a loader when the data is being fetched
  if (isLoading) {
    return <Loading />;
  }

  //this is done to handle the state when there is no todo data to be shown in the server
  if (data?.length === 0) {
    return (
      <div className="h-[calc(100vh-65.25px-80px)] flex items-center justify-center">
        <Typography
          variant="paragraph"
          className="text-gray-400 font-Montserat text-lg"
        >
          You don't have any task right now.
        </Typography>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-65.25px-80px)] overflow-scroll flex flex-col gap-3 relative">
      <TodoContainer
        title={"Pending"}
        isPendingTask={true}
        data={pendingData}
      />
      <TodoContainer
        title={"Completed"}
        isPendingTask={false}
        data={completedData}
      />
    </div>
  );
};

export default ListTodos;
