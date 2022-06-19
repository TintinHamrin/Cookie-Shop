import { customRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Cart from "./Cart";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./store/store";

test("renders a button", () => {
  const store = configureStore({
    reducer: rootReducers,
    preloadedState: { cart: { isOpen: true, itemsInCart: 0 } },
  });
  customRender(<Cart />, store);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
