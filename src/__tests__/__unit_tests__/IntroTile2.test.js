import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import IntroTile2 from "../../IntroTile2";

describe("IntroTile2", () => {
  const logoSrc = "logo.png";
  const stages = ["Stage 1", "Stage 2", "Stage 3"];
  const onNext = jest.fn();
  const onExit = jest.fn();

  it("renders the component with the correct content", () => {
    render(<IntroTile2 logoSrc={logoSrc} stages={stages} onNext={onNext} onExit={onExit} />);

    expect(screen.getByText("Tutorial Stages")).toBeInTheDocument();
    expect(
      screen.getByText(
        `There are ${stages.length} stages in the tutorial. Stages end with a test to help assess and solidify your new knowledge.`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /GET STARTED!/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Exit/i })).toBeInTheDocument();
  });

  it("displays the logo when logoSrc is provided", () => {
    render(<IntroTile2 logoSrc={logoSrc} stages={stages} onNext={onNext} onExit={onExit} />);

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", logoSrc);
  });

  it("displays '?' when logoSrc is not provided", () => {
    render(<IntroTile2 stages={stages} onNext={onNext} onExit={onExit} />);

    const circle = screen.getByText("?");
    expect(circle).toBeInTheDocument();
  });

  it("renders the correct number of stages", () => {
    render(<IntroTile2 stages={stages} onNext={onNext} onExit={onExit} />);

    stages.forEach((stage, index) => {
      expect(screen.getByText(stage)).toBeInTheDocument();
    });
  });

  it("fades the component in on mount", async () => {
    render(<IntroTile2 logoSrc={logoSrc} stages={stages} onNext={onNext} onExit={onExit} />);

    const box = screen.getByText("Tutorial Stages").closest("div");
    expect(box).toHaveStyle("opacity: 0");

    await waitFor(() => {
      expect(box).toHaveStyle("opacity: 1");
    });
  });

  it("calls onNext when the GET STARTED! button is clicked", async () => {
    render(<IntroTile2 logoSrc={logoSrc} stages={stages} onNext={onNext} onExit={onExit} />);

    const button = screen.getByRole("button", { name: /GET STARTED!/i });
    await userEvent.click(button);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onExit when the Exit button is clicked", async () => {
    render(<IntroTile2 logoSrc={logoSrc} stages={stages} onNext={onNext} onExit={onExit} />);

    const button = screen.getByRole("button", { name: /Exit/i });
    await userEvent.click(button);

    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
