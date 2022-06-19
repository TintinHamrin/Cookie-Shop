import { customRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Checkout from "./Checkout";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./store/store";
import { getByRole } from "@testing-library/react";

test("renders a in checkout", async () => {
  const store = configureStore({
    reducer: rootReducers,
    preloadedState: {
      checkout: {
        isOpen: true,
      },
    },
  });

  customRender(<Checkout />, store);
  expect(screen.getByText("Your cart")).toBeInTheDocument();
});
