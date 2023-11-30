import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openEditBox: false,
  alert: {
    type: "", //defines the type of alert box to be displayed
    status: false,
  },
};

const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state) => {
      state.openEditBox = !state.openEditBox;
    },
    toggleAlert: (state, { payload = "danger" }) => {
      state.alert.status = !state.alert.status;
      state.alert.type = payload;
    },
  },
});

export const { toggleDialog, toggleAlert } = DialogSlice.actions;
export default DialogSlice.reducer;
