import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Register from "./Register";

describe("checks if logo text renders", () => {
  test("renders logo text", () => {
    preloadedRender(<Register />);
    screen.getByRole("button", { name: "Click to register" });
  });
});
