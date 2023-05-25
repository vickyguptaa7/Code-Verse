import { Dispatch } from "react";
import { getAndUpdateViews } from "../../library/firebase/firebase.lib";
import { setViews } from "../reducres/Editor/Editor.reducer";

export const fetchAndUpdateViewsAction = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const data = await getAndUpdateViews();
      if (!data) {
        throw new Error("Something went wrong!");
      }
      dispatch(setViews(data));
    } catch (err) {
      console.error("error : ", err);
    }
  };
};
