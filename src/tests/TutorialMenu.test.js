import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import TutorialMenu from "../TutorialMenu";

// Mock the ConfirmationPopup component
jest.mock(
  "../ConfirmationPopup",
  () =>
    ({ onClose, open, title, description }) =>
      open ? (
        <div data-testid="confirmation-popup">
          <p>{title}</p>
          <p>{description}</p>
          <button onClick={() => onClose(true)}>Confirm</button>
          <button onClick={() => onClose(false)}>Cancel</button>
        </div>
      ) : null,
);

describe("TutorialMenu Component", () => {
  const defaultProps = {
    tutorialName: "Tutorial Mode",
    stages: ["Stage 1", "Stage 2", "Stage 3"],
    stageNo: 1,
    onExit: jest.fn(),
    onRedoStage: jest.fn(),
    onSkipStage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the TutorialMenu component", () => {
    render(<TutorialMenu {...defaultProps} />);
    expect(screen.getByText("Tutorial Mode")).toBeInTheDocument();
  });

  test("opens the menu when the circle is clicked", () => {
    render(<TutorialMenu {...defaultProps} />);
    const menuIcon = screen.getByTestId("menu-rectangle-header");
    fireEvent.click(menuIcon);
    expect(screen.getByTestId("popup-box-container")).toHaveStyle({ opacity: 1 });
  });

  test("closes the menu when the close icon is clicked", () => {
    render(<TutorialMenu {...defaultProps} />);
    const menuIcon = screen.getByTestId("menu-rectangle-header");

    // Click to open
    fireEvent.click(menuIcon);
    expect(screen.getByTestId("popup-box-container")).toHaveStyle({ opacity: 1 });

    // Click to close
    const closeIcon = screen.getByTestId("circle-exit-overlay");
    fireEvent.click(closeIcon);
    expect(screen.getByTestId("popup-box-container")).toHaveStyle({ opacity: 0 });
  });

  //   test("opens the confirmation popup when the exit button is clicked", async () => {
  //     render(<TutorialMenu {...defaultProps} />);
  //     const menuIcon = screen.getByTestId("menu-rectangle-header");
  //     fireEvent.click(menuIcon);

  //     const exitButton = screen.getByTestId("exit-button");
  //     fireEvent.click(exitButton);

  //     expect(await screen.findByText("Confirm Exit")).toBeInTheDocument();
  //     expect(await screen.findByText("Are you sure you want to exit?")).toBeInTheDocument();
  //   });

  //   test("calls onExit when exit is confirmed", () => {
  //     render(<TutorialMenu {...defaultProps} />);
  //     const menuIcon = screen.getByTestId("menu-rectangle-header");
  //     fireEvent.click(menuIcon);

  //     const exitButton = screen.getByTestId("exit-button");
  //     fireEvent.click(exitButton);

  //     fireEvent.click(screen.getByText("Confirm"));
  //     expect(defaultProps.onExit).toHaveBeenCalled();
  //   });

  //   test("calls onRedoStage when redo is confirmed", () => {
  //     render(<TutorialMenu {...defaultProps} />);
  //     const menuIcon = screen.getByTestId("menu-rectangle-header");
  //     fireEvent.click(menuIcon);

  //     const redoButton = screen.getByTestId("redo-button");
  //     fireEvent.click(redoButton);

  //     fireEvent.click(screen.getByText("Confirm"));
  //     expect(defaultProps.onRedoStage).toHaveBeenCalled();
  //   });

  //   test("closes the menu when clicking outside of it", () => {
  //     render(<TutorialMenu {...defaultProps} />);
  //     const menuIcon = screen.getByTestId("menu-rectangle-header");
  //     fireEvent.click(menuIcon);
  //     expect(screen.getByText("Stages")).toBeInTheDocument();

  //     // Simulate clicking outside the menu
  //     fireEvent.click(document.body);
  //     expect(screen.queryByText("Stages")).not.toBeInTheDocument();
  //   });

  //   test("scrolls to the focused stage when the menu is opened", () => {
  //     render(<TutorialMenu {...defaultProps} />);
  //     const menuIcon = screen.getByTestId("menu-rectangle-header");
  //     fireEvent.click(menuIcon);

  //     const focusedStage = screen.getByTestId("focused-stage");
  //     expect(focusedStage).toBeInTheDocument();

  //     // Check if the stage is scrolled into view
  //     // Note: This is just a basic check; it doesn't verify the actual scrolling behavior
  //     expect(focusedStage).toHaveClass("focused-stage");
  //   });
});
