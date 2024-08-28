import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TutorialProgressTile from "../TutorialProgressTile";

// Mock ConfirmationPopup component
jest.mock("../ConfirmationPopup", () => ({ title, description, onCancel, onConfirm }) => (
  <div>
    <p>{title}</p>
    <p>{description}</p>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onConfirm}>Confirm</button>
  </div>
));

describe("InteractiveGuideCard", () => {
  const props = {
    tutorialName: "Test Tutorial",
    stages: ["Stage 1", "Stage 2", "Stage 3"],
    nextStageNo: 1,
    onExit: jest.fn(),
    onContinue: jest.fn(),
    onRedoStage: jest.fn(),
    onSkipStage: jest.fn(),
  };

  test("renders TutorialProgressTile with correct tutorial name and stages", () => {
    render(<TutorialProgressTile {...props} />);

    expect(screen.getByText("Test Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Start Stage 2")).toBeInTheDocument();
  });

  test("calls onContinue when 'Start Stage' button is clicked", () => {
    const props = {
      tutorialName: "Test Tutorial",
      stages: ["Stage 1", "Stage 2", "Stage 3"],
      nextStageNo: 1,
      onExit: jest.fn(),
      onContinue: jest.fn(),
      onRedoStage: jest.fn(),
      onSkipStage: jest.fn(),
    };

    render(<TutorialProgressTile {...props} />);
    fireEvent.click(screen.getByText("Start Stage 2"));

    expect(props.onContinue).toHaveBeenCalled();
  });

  test("opens confirmation popup when 'Redo stage' button is clicked", async () => {
    render(<TutorialProgressTile {...props} />);

    fireEvent.click(screen.getByText("Redo stage"));
    screen.debug();

    expect(await screen.findByText("Confirm Redo")).toBeInTheDocument();
  });
});
