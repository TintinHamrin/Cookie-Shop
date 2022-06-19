import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Cart from "./Cart";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./store/store";

test("renders a button", () => {
  preloadedRender(<Cart />, { cart: { isOpen: true, itemsInCart: 0 } });
  expect(screen.getByRole("button")).toBeInTheDocument();
});
