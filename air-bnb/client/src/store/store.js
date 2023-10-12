import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import minMaxSlice from "./minMaxSlice";
import categorySlice from "./categorySlice";


const store = configureStore({
  reducer: {
    products:productSlice,
    minmax:minMaxSlice,
    category:categorySlice

  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store
