import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTodo: {},
};
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    selectTodo: (state, { payload }) => {
      state.selectedTodo = payload;
    },
    clearTodo: (state) => {
      state.selectedTodo = {};
    },
  },
});

export const { selectTodo, clearTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
