import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://airbnb-mern-1ucq06b8v-naimhossain0181.vercel.app/v1/";

export const minmax = createAsyncThunk(
    "minmax",
    async () => {
      const response = await axios.get(baseUrl + "findminmax", );
    //   console.log( response.data)
      return response.data;
    }
  );

const MinMaxSlice = createSlice({
    name: "minmax",
    initialState: {
      data: [],
      loading: true,
      error: null,
    },
  
    reducers: {
      filter(state, action) {},
    },
    extraReducers: (builder) => {
        builder.addCase(minmax.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loading = false;
        });
        builder.addCase(minmax.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(minmax.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }


})

export const { add } = MinMaxSlice.actions;
export default MinMaxSlice.reducer;
