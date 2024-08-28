import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TooltipOverlay from "../TooltipOverlay";
import "@testing-library/jest-dom";
import { width } from "@mui/system";

describe("TooltipOverlay Component", () => {
  let targetElement;
  let offset = 5; // same offset as in actual TooltipOverlay

  beforeEach(() => {
    // Create a mock target element in the document
    targetElement = document.createElement("div");
    targetElement.style.position = "absolute";
    targetElement.style.top = "100px";
    targetElement.style.left = "100px";
    targetElement.style.width = "200px";
    targetElement.style.height = "150px";
    document.body.appendChild(targetElement);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(targetElement);
  });

  test("renders with correct default overlay background", () => {
    render(<TooltipOverlay targetAreaEl="div" />);
    expect(screen.getByRole("tooltip-overlay")).toHaveStyle({
      backgroundColor: "transparent",
    });
  });

  test("renders and finds target element correctly", () => {
    render(<TooltipOverlay targetAreaEl="div" />);
    expect(screen.getByTestId("topRect")).toBeInTheDocument();
    expect(screen.getByTestId("leftRect")).toBeInTheDocument();
    expect(screen.getByTestId("rightRect")).toBeInTheDocument();
    expect(screen.getByTestId("bottomRect")).toBeInTheDocument();
  });

  test("sets pointer-events to none when areaClickable is true", () => {
    render(<TooltipOverlay targetAreaEl="div" areaClickable={true} />);
    expect(screen.getByRole("tooltip-overlay")).toHaveStyle({
      pointerEvents: "none",
    });
  });

  test("sets pointer-events to all when areaClickable is false", () => {
    render(<TooltipOverlay targetAreaEl="div" areaClickable={false} />);
    expect(screen.getByRole("tooltip-overlay")).toHaveStyle({
      pointerEvents: "all",
    });
  });

  test("applies transitions correctly when willScroll is false", () => {
    render(<TooltipOverlay targetAreaEl="div" willScroll={false} />);
    expect(screen.getByTestId("topRect")).toHaveStyle({
      transition:
        "width 0.5s ease-in-out,height 0.5s ease-in-out,left 0.5s ease-in-out,top 0.5s ease-in-out",
    });
  });

  test("does not apply transitions when willScroll is true", () => {
    render(<TooltipOverlay targetAreaEl="div" willScroll={true} />);
    expect(screen.getByTestId("topRect")).toHaveStyle({
      transition: "none",
    });
  });
});
