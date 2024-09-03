import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestProgressTile from "../../TestProgressTile";

const mockOnNext = jest.fn();
const mockOnSkipTest = jest.fn();

const defaultProps = {
  stageName: "Stage 1",
  stageNo: 0,
  taskNames: ["Task 1", "Task 2", "Task 3"],
  currentTaskNo: 1,
  currentTask: {
    clickElements: [{ elementId: "#element1", textInputElements: [] }],
  },
  onNext: mockOnNext,
  onSkipTest: mockOnSkipTest,
};

describe("TestProgressTile", () => {
  it("renders the component with given props", () => {
    render(<TestProgressTile {...defaultProps} />);
    expect(screen.getByText("Stage 1 Test")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("toggles the expanded state when the expand button is clicked", () => {
    render(<TestProgressTile {...defaultProps} />);

    // Initially expanded
    expect(screen.getByText("Stage 1 Test")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByRole("button", { name: /expand more/i }));
    expect(screen.queryByText("Stage 1 Test")).not.toBeInTheDocument();
    expect(screen.getByText("Next Task:")).toBeInTheDocument();

    // Click to expand again
    fireEvent.click(screen.getByRole("button", { name: /expand less/i }));
    expect(screen.getByText("Stage 1 Test")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("displays the correct task name in the header when collapsed", () => {
    render(<TestProgressTile {...defaultProps} />);

    // Collapse the tile
    fireEvent.click(screen.getByRole("button", { name: /expand more/i }));

    // Verify the task name in the collapsed state
    expect(screen.getByText("Next Task:")).toBeInTheDocument();
    const taskElements = screen.queryAllByText("Task 2");
    expect(taskElements.length).toBe(2); // Assert that there are two elements
  });

  it("calls onSkipTest when the skip button is clicked and confirmed", () => {
    render(<TestProgressTile {...defaultProps} />);

    // Click the skip button
    fireEvent.click(screen.getByText("Skip test"));

    // Confirm the action in the popup
    fireEvent.click(screen.getByText("Confirm"));

    // Check that the onSkipTest handler was called
    expect(mockOnSkipTest).toHaveBeenCalled();
  });

  it("does not call onSkipTest when the skip button is clicked and canceled", () => {
    render(<TestProgressTile {...defaultProps} />);

    // Click the skip button
    fireEvent.click(screen.getByText("Skip test"));

    // Cancel the action in the popup
    fireEvent.click(screen.getByText("Cancel"));

    // Check that the onSkipTest handler was not called
    expect(mockOnSkipTest).not.toHaveBeenCalled();
  });

  it("renders the progress bar with the correct width", () => {
    render(<TestProgressTile {...defaultProps} />);

    const progressBar = screen.getByTestId("progress-bar-inner");
    expect(progressBar).toHaveStyle("width: calc(33.33333333333333% - 4px)");
  });
});
