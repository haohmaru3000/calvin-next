import "@testing-library/jest-dom";

import Home from "../pages/index";
import { render } from "@testing-library/react";

describe("Test home page", () => {
  it("Test the title of Home page", () => {
    const { getByText } = render(<Home products={[]} />);
    const result = getByText("Get Doggy Stickers!");
    expect(result).toBeInTheDocument(); // return instance containing the struct master
  });
});
