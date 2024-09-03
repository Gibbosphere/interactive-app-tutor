import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import IntroTile1 from "../../IntroTile1";

describe("IntroTile1", () => {
  const logoSrc = "logo.png";
  const tutorialName = "React Tutorial";
  const description = "This is an interactive guide to help you get started with React.";
  const onNext = jest.fn();

  it("renders the component with the correct content", () => {
    render(
      <IntroTile1
        logoSrc={logoSrc}
        tutorialName={tutorialName}
        description={description}
        onNext={onNext}
      />,
    );

    expect(screen.getByText(`Welcome to the ${tutorialName}`)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("displays the logo when logoSrc is provided", () => {
    render(
      <IntroTile1
        logoSrc={logoSrc}
        tutorialName={tutorialName}
        description={description}
        onNext={onNext}
      />,
    );

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", logoSrc);
  });

  it("displays '?' when logoSrc is not provided", () => {
    render(<IntroTile1 tutorialName={tutorialName} description={description} onNext={onNext} />);

    const circle = screen.getByText("?");
    expect(circle).toBeInTheDocument();
  });

  it("fades the component in on mount", async () => {
    render(
      <IntroTile1
        logoSrc={logoSrc}
        tutorialName={tutorialName}
        description={description}
        onNext={onNext}
      />,
    );

    const box = screen.getByText(`Welcome to the ${tutorialName}`).closest("div");
    expect(box).toHaveStyle("opacity: 0");

    await waitFor(() => {
      expect(box).toHaveStyle("opacity: 1");
    });
  });

  it("calls onNext when the Next button is clicked", async () => {
    render(
      <IntroTile1
        logoSrc={logoSrc}
        tutorialName={tutorialName}
        description={description}
        onNext={onNext}
      />,
    );

    const button = screen.getByRole("button", { name: /Next/i });
    await userEvent.click(button);

    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
