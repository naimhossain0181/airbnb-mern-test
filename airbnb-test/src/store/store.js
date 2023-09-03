import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import minMaxSlice from "./minMaxSlice";


const store = configureStore({
  reducer: {
    products:productSlice,
    minmax:minMaxSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store
