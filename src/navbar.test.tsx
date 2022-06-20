import { preloadedRender, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("checks if logo text renders", () => {
  test("renders logo text", () => {
    preloadedRender(<Navbar />);
    expect(
      screen.getByText("Your and Your Mamas Favourite Cookie Shop")
    ).toBeInTheDocument();
  });
});
