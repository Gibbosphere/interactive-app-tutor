import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WalkthroughCompleteTile from "../../WalkthroughCompleteTile";
import ConfirmationPopup from "../../ConfirmationPopup";

describe("WalkthroughCompleteTile", () => {
  const props = {
    stageNo: 2,
    onTakeTest: jest.fn(),
    onRedoWalkthrough: jest.fn(),
    onSkip: jest.fn(),
  };

  test("renders WalkthroughCompleteTile with correct information and stage number", () => {
    render(<WalkthroughCompleteTile {...props} />);

    expect(screen.getByText("You've completed the walkthrough !!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A test is ready for you to solidify the skills you've learned in the walkthrough.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Take the Stage 2 Test")).toBeInTheDocument();
  });

  test("calls onTakeTest when 'Take the Stage Test' button is clicked", () => {
    render(<WalkthroughCompleteTile {...props} />);
    fireEvent.click(screen.getByText("Take the Stage 2 Test"));

    expect(props.onTakeTest).toHaveBeenCalled();
  });

  test("opens confirmation popup when 'Redo walkthrough' button is clicked", () => {
    render(<WalkthroughCompleteTile {...props} />);
    fireEvent.click(screen.getByText("Redo walkthrough"));

    expect(screen.getByText("Confirm Redo")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to redo the Stage 2 walkthrough?"),
    ).toBeInTheDocument();
  });

  test("opens confirmation popup when 'Skip test' button is clicked", () => {
    render(<WalkthroughCompleteTile {...props} />);
    fireEvent.click(screen.getByText("Skip test"));

    expect(screen.getByText("Confirm Skip")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to skip the test and move to Stage 3?"),
    ).toBeInTheDocument();
  });

  test("tile fades in correctly", () => {
    render(<WalkthroughCompleteTile {...props} />);

    const tile = screen.getByText("You've completed the walkthrough !!").parentElement;
    expect(tile).toHaveStyle("opacity: 0");

    setTimeout(() => {
      expect(tile).toHaveStyle("opacity: 1");
    }, 10);
  });
});
