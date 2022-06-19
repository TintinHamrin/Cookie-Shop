import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import our reducer
import { rootReducers } from "./store/store";
import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function testWrap(store: EnhancedStore): FC<{
  children: React.ReactNode;
}> {
  return ({ children }) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}

const customRender = (
  ui: ReactElement,
  store: EnhancedStore = configureStore({ reducer: rootReducers }),
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: testWrap(store), ...options });

export * from "@testing-library/react";
export { customRender };
