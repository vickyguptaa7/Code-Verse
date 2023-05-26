import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../../@types/Notification.d";

const notificationInitialState = {
  notifications: [] as Array<INotification>,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<{ id: string }>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
