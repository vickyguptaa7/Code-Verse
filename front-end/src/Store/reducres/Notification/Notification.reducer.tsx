import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const notificationInitialState = {
  notifications: [] as Array<{
    id: string;
    description: string;
    isWaitUntilComplete: boolean;
  }>,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addNotification(
      state,
      action: PayloadAction<{
        id: string;
        description: string;
        isWaitUntilComplete: boolean;
      }>
    ) {
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
