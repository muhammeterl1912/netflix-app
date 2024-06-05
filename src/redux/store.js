import { configureStore } from "@reduxjs/toolkit";
import wizardSlice from "@/redux/reducers/wizardSlice";
import cartSlice from "@/redux/reducers/cartSlice";
import brandSlice from "@/redux/reducers/brandSlice";
import componentSlice from "@/redux/reducers/componentSlice";
import productSlice from "@/redux/reducers/productSlice";
import sliderSlice from "@/redux/reducers/sliderSlice";

export const store = configureStore({
  reducer: {
    wizard: wizardSlice,
    cart: cartSlice,
    brand: brandSlice,
    component: componentSlice,
    product: productSlice,
    slider: sliderSlice,
  },
});