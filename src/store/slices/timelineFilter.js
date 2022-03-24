import { createSlice } from "@reduxjs/toolkit";
import { LAST_1_DAY, LAST_1_MONTH } from "../../utils/constants";

export const timelineFilterSlice = createSlice({
  name: "timelineFilter",
  initialState: {
    selectedFilter: LAST_1_MONTH,
  },
  reducers: {
    setSelectedTimeLineFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    clearTimelineFilter: (state) => {
      state.selectedFilter = LAST_1_MONTH;
    },
  },
});

export const { setSelectedTimeLineFilter, clearTimelineFilter } =
  timelineFilterSlice.actions;

export default timelineFilterSlice.reducer;
