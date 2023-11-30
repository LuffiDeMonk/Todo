import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Header from "./components/Header/Header";
import AddTodos from "./components/AddTodo/AddTodos";
import ListTodos from "./components/Todo/ListTodos";
import TodoEditor from "./components/TodoEditor/TodoEditor";

const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <AddTodos />
        <ListTodos />
        <TodoEditor />
        <ReactQueryDevtools position="top-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;
