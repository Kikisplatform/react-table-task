import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "tableData",
  initialState: {
    data: [],
    filteredData: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    addData: (state, action) => {
      state.data.push(action.payload);
      state.filteredData.push(action.payload);
    },
  },
});

export const { setData, setFilteredData, addData } = tableSlice.actions;
export default tableSlice.reducer;
