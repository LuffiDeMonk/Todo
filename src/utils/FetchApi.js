import Axios from "axios";

export const fetchAllTodo = async () => {
  const response = await Axios.get(`http://localhost:3000/todo`);
  return response.data;
};

export const addTodo = async (todo) => {
  return await Axios.post("http://localhost:3000/todo", todo);
};

export const deleteTodo = async (id) => {
  return await Axios.delete(`http://localhost:3000/todo/${id}`);
};

export const updateTodoStatus = async (updatedPost) => {
  return await Axios.patch(
    `http://localhost:3000/todo/${updatedPost.id}`,
    updatedPost
  );
};
