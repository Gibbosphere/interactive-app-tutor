import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import BasicBackgroundOverlay from "../../BasicBackgroundOverlay"; // Adjust the path as needed

describe("BasicBackgroundOverlay", () => {
  it("renders correctly and displays the focus element", () => {
    // Mock focus element
    const mockFocusElement = <div data-testid="focus-element">Focus Element</div>;

    // Render the component
    const { getByTestId } = render(<BasicBackgroundOverlay focusElement={mockFocusElement} />);

    // Check if the overlay is in the document
    const overlay = getByTestId("completion-screen-overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the focus element is inside the overlay
    const focusElement = getByTestId("focus-element");
    expect(focusElement).toBeInTheDocument();
  });
});
