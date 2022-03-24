import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import riskCateogrySlice from "./slices/riskCategory";
import timelineFilterSlice from "./slices/timelineFilter";

export default configureStore({
  reducer: {
    riskCategory: riskCateogrySlice,
    timelineFilter: timelineFilterSlice,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});
