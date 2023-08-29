import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import productSlice from "./productSlice";


const store = configureStore({
  reducer: {
    products:productSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store
