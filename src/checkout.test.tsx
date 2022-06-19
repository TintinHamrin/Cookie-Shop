import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Checkout from "./Checkout";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./store/store";
import { getByRole } from "@testing-library/react";

test("renders a in checkout", async () => {
  preloadedRender(<Checkout />, {
    checkout: {
      isOpen: true,
    },
  });
  expect(screen.getByText("Your cart")).toBeInTheDocument();
});
