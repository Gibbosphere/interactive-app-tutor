import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tooltip from "../../Tooltip";

// Mock TooltipOverlay since it is an external component
jest.mock("../../TooltipOverlay", () => () => <div data-testid="tooltip-overlay"></div>);

describe("Tooltip Component", () => {
  const defaultProps = {
    targetEl: "#target-area-element",
    targetAreaEl: "#target-area-element",
    title: "Test Tooltip",
    content: "This is a tooltip content.",
    onNext: jest.fn(),
    canGoBack: true,
    onBack: jest.fn(),
    canExit: true,
    onExit: jest.fn(),
    tooltipNo: 2,
    totalTooltips: 3,
  };
  global.HTMLElement.prototype.scrollIntoView = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="target-area-element" style="width: 200px; height: 200px; position: absolute; top: 50px; left: 50px;">Hey</div>
    `;
  });

  test("renders tooltip with the correct title and content", async () => {
    render(<Tooltip {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Test Tooltip")).toBeInTheDocument();
      expect(screen.getByText("This is a tooltip content.")).toBeInTheDocument();
    });
  });

  //   test("positions the tooltip correctly relative to the target element", async () => {
  //     render(<Tooltip {...defaultProps} />);

  //     // Wait for the tooltip to be rendered
  //     await waitFor(
  //       () => {
  //         const tooltipElement = screen.getByText("Test Tooltip").parentElement.parentElement;
  //         const targetElement = document.querySelector("#target-area-element");

  //         if (!tooltipElement || !targetElement) {
  //           throw new Error("Tooltip or target element not found");
  //         }

  //         console.log("Target Element ID:", targetElement.id);
  //         console.log("Target Element offsetTop:", targetElement.offsetTop);

  //         const targetRect = targetElement.getBoundingClientRect();
  //         const tooltipRect = tooltipElement.getBoundingClientRect();

  //         expect(tooltipRect.top).toBeGreaterThan(targetRect.top);
  //         expect(tooltipRect.left).toBeGreaterThan(targetRect.left + targetRect.width);
  //       },
  //       { timeout: 3000 },
  //     );
  //   });

  test("calls onBack when the back button is clicked", () => {
    render(<Tooltip {...defaultProps} />);

    const backButton = screen.getByTestId("tooltip-back-button");
    fireEvent.click(backButton);

    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  test("calls onExit when the exit button is clicked", () => {
    render(<Tooltip {...defaultProps} />);

    const exitButton = screen.getByTestId("tooltip-exit-button");
    fireEvent.click(exitButton);

    expect(defaultProps.onExit).toHaveBeenCalledTimes(1);
  });

  test("fades in the tooltip", () => {
    render(<Tooltip {...defaultProps} />);

    const tooltipElement = screen.getByText("Test Tooltip").parentElement.parentElement;

    expect(tooltipElement).toHaveStyle("opacity: 0");

    setTimeout(() => {
      expect(tooltipElement).toHaveStyle("opacity: 1");
    }, 500); // matches the fade-in duration
  });

  //   test("handles target element not found scenario", () => {
  //     const props = {
  //       ...defaultProps,
  //       targetEl: "#non-existent-element",
  //       targetAreaEl: "#non-existent-area",
  //     };

  //     render(<Tooltip {...props} />);

  //     const tooltipElement = screen.getByText("Test Tooltip").parentElement.parentElement;
  //     expect(tooltipElement.style.top).toContain("calc");
  //     expect(tooltipElement.style.left).toContain("calc");
  //   });
});
