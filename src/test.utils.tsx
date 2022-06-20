import {
  CombinedState,
  configureStore,
  EnhancedStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import our reducer
import { rootReducers, RootState } from "./store/store";
import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";

function testWrap(store: EnhancedStore): FC<{
  children: React.ReactNode;
}> {
  return ({ children }) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}

function preloadedRender(
  ui: ReactElement,
  //store: EnhancedStore = configureStore({ reducer: rootReducers }),
  //preloadedState?: ReturnType<typeof rootReducers>,
  preloadedState?: PreloadedState<CombinedState<RootState>>,
  options?: Omit<RenderOptions, "wrapper">
) {
  const store = configureStore({
    reducer: rootReducers,
    preloadedState,
  });
  return render(ui, { wrapper: testWrap(store), ...options });
}

export * from "@testing-library/react";
export { preloadedRender };
