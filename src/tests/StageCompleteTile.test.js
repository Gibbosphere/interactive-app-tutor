import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import StageCompleteTile from "../StageCompleteTile";

describe("StageCompleteTile", () => {
  const stageNo = 2;
  const stageName = "Understanding Basics";
  const onContinue = jest.fn();

  it("renders the component with the correct content", () => {
    render(<StageCompleteTile stageNo={stageNo} stageName={stageName} onContinue={onContinue} />);

    expect(screen.getByText("Stage Complete !!")).toBeInTheDocument();
    expect(screen.getByText(`Stage ${stageNo} - ${stageName}`)).toBeInTheDocument();
    expect(screen.getByText("You've succesfully completed")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue/i })).toBeInTheDocument();
  });

  it("fades the component in on mount", async () => {
    render(<StageCompleteTile stageNo={stageNo} stageName={stageName} onContinue={onContinue} />);

    const paper = screen.getByText("Stage Complete !!").closest("div");
    expect(paper).toHaveStyle("opacity: 0");

    await waitFor(() => {
      expect(paper).toHaveStyle("opacity: 1");
    });
  });

  it("displays the correct stage number and name", () => {
    render(<StageCompleteTile stageNo={stageNo} stageName={stageName} onContinue={onContinue} />);

    expect(screen.getByText(`Stage ${stageNo} - ${stageName}`)).toBeInTheDocument();
  });

  it("calls onContinue when the Continue button is clicked", async () => {
    render(<StageCompleteTile stageNo={stageNo} stageName={stageName} onContinue={onContinue} />);

    const button = screen.getByRole("button", { name: /Continue/i });
    await userEvent.click(button);

    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("renders the images correctly", () => {
    render(<StageCompleteTile stageNo={stageNo} stageName={stageName} onContinue={onContinue} />);

    const tickImage = screen.getByAltText("Well done tick");
    const confettiImage = screen.getByAltText("Confetti");

    expect(tickImage).toBeInTheDocument();
    expect(confettiImage).toBeInTheDocument();
  });
});
