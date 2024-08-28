import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TutorialCompleteTile from "../TutorialCompleteTile";
import ConfirmationPopup from "../ConfirmationPopup";

// Mock ConfirmationPopup component
jest.mock("../ConfirmationPopup", () => ({ title, description, onCancel, onConfirm }) => (
  <div>
    <p>{title}</p>
    <p>{description}</p>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onConfirm}>Confirm</button>
  </div>
));

describe("TutorialCompleteTile", () => {
  const defaultProps = {
    tutorialName: "Test Tutorial",
    prevStageNo: 1,
    prevStageName: "Stage 1",
    onExit: jest.fn(),
    onRedoStage: jest.fn(),
    onRestartTutorial: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the tutorial complete message", () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    expect(screen.getByText("Test Tutorial Complete !!")).toBeInTheDocument();
  });

  test("calls onExit when 'Finish Tutorial' button is clicked", () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    fireEvent.click(screen.getByText("Finish Tutorial"));

    expect(defaultProps.onExit).toHaveBeenCalled();
  });

  test("opens confirmation popup when 'Restart tutorial' button is clicked", async () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    fireEvent.click(screen.getByText("Restart tutorial"));
    screen.debug();

    expect(await screen.findByText("Confirm Restart")).toBeInTheDocument();
    expect(await screen.findByText(/restart the tutorial\?/i)).toBeInTheDocument();
  });

  test("calls onRestartTutorial when confirmation popup confirms restart", () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    fireEvent.click(screen.getByText("Restart tutorial"));
    fireEvent.click(screen.getByText("Confirm"));

    expect(defaultProps.onRestartTutorial).toHaveBeenCalled();
  });

  test("calls onRedoStage when confirmation popup confirms redo", () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    fireEvent.click(screen.getByText("Redo stage"));
    fireEvent.click(screen.getByText("Confirm"));

    expect(defaultProps.onRedoStage).toHaveBeenCalled();
  });

  test("does not call any action when confirmation popup cancels", () => {
    render(<TutorialCompleteTile {...defaultProps} />);

    fireEvent.click(screen.getByText("Restart tutorial"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(defaultProps.onRestartTutorial).not.toHaveBeenCalled();
    expect(defaultProps.onRedoStage).not.toHaveBeenCalled();
  });
});
