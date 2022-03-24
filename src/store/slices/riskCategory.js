import { createSlice } from "@reduxjs/toolkit";
import { RISK_CATEGORY_FILTERS } from "../../utils/constants";

export const riskCateogrySlice = createSlice({
  name: "riskCategory",
  initialState: {
    filters: RISK_CATEGORY_FILTERS,
  },
  reducers: {
    checkedCategoryFilter: (state, action) => {
      if (action.payload) {
        const filterCategory = state.filters.find(
          (item) => item.label === action.payload
        );
        if (filterCategory) {
          filterCategory.selected = !filterCategory.selected;
        }
        state.filters = [].concat(state.filters);
      }
    },
    clearCategoryFilters: (state) => {
      state.filters = RISK_CATEGORY_FILTERS;
    },
  },
});

export const { checkedCategoryFilter, clearCategoryFilters } =
  riskCateogrySlice.actions;

export default riskCateogrySlice.reducer;
