import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://airbnb-api-ea20.onrender.com/v1/";
// get productt list
export const getProducts = createAsyncThunk("getAllData", async () => {
  const response = await axios.get(baseUrl + "find");
  return response;
});


// search by category
export const SearchProductsByCategory = createAsyncThunk(
  "SearchByCategory",
  async (query) => {
    const response = await axios.get(baseUrl + "findbycategory", {
      params: {name:query},
    });
    return response;

  }
);

// Search Date and Person
export const SearchProductsByDate = createAsyncThunk(
  "SearchByDate",
  async (query) => {
    const response = await axios.get(baseUrl + "findbydate", { params: query });
    return response;
  }
);

export const filters = createAsyncThunk(
    "filters",
    async (query) => {
      const response = await axios.get(baseUrl + "filters", { params: query });
      return response;
    }
  );
  


const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: true,
    error: null,
  },

  reducers: {
    filter(state, action) {},
  },

  extraReducers: (builder) => {

    // producs
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // search by category
    builder.addCase(SearchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SearchProductsByCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SearchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Search By Date and Person
    builder.addCase(SearchProductsByDate.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SearchProductsByDate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SearchProductsByDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // minmax

    // filter
    builder.addCase(filters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });

  },
  // {
  //     [getProducts.pending]:(state,action) =>{
  //         state.loading=true

  //     },
  //     [getProducts.fulfilled]:(state,action)=>{
  //         state.loading=false
  //         state.data=action.payload
  //     },
  //     [getProducts.rejected]:(state,action)=>{
  //         state.loading=false
  //         state.error=(action.payload)
  //     }
  // }
});

export const { add } = productSlice.actions;
export default productSlice.reducer;
