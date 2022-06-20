import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Cart from "./Cart";

test("renders a button", () => {
  preloadedRender(<Cart />, { cart: { isOpen: true, itemsInCart: 0 } });
  expect(screen.getByRole("button")).toBeInTheDocument();
});
