import { customRender, render, screen } from "./test.utils";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("checks if logo text renders", () => {
  test("renders logo text", () => {
    customRender(<Navbar />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(screen.getByText("Our Favourite Cookie Shop!!")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
  });
});
