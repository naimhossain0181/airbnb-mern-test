import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3000/v1/";

// get all category list
export const getProductsCategory = createAsyncThunk("getCategory", async () => {
    const response = await axios.get(baseUrl + "allcategory");
    return response;
  });


const CategorySlice=createSlice({
    name:"Category",
    initialState:{
        data:[],
        loading:true,
    },
  
    reducers:{
        
    },

    extraReducers:(builder)=>{
        builder.addCase(getProductsCategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
          });
          builder.addCase(getProductsCategory.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(getProductsCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})



export default CategorySlice.reducer