import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Checkout from "./Checkout";

test("renders a in checkout", async () => {
  preloadedRender(<Checkout />, {
    checkout: {
      isOpen: true,
    },
  });
  expect(screen.getByText("Your cart")).toBeInTheDocument();
});
