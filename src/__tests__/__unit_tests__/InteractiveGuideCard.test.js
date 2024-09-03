import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import InteractiveGuideCard from "../../InteractiveGuideCard";

describe("InteractiveGuideCard", () => {
  const guideNo = 1;
  const guideName = "Getting Started";
  const progress = 75;

  it("renders the guide number, guide name, and progress correctly", () => {
    render(<InteractiveGuideCard guideNo={guideNo} guideName={guideName} progress={progress} />);

    // Check if the guide number is rendered
    expect(screen.getByText(guideNo)).toBeInTheDocument();

    // Check if the guide name is rendered
    expect(screen.getByText(guideName)).toBeInTheDocument();

    // Check if the progress percentage is rendered
    expect(screen.getByText(`${progress}%`)).toBeInTheDocument();
  });

  it("renders the arrow icon with the correct initial styles", () => {
    render(<InteractiveGuideCard guideNo={guideNo} guideName={guideName} progress={progress} />);

    const arrowIcon = screen.getByTestId("ArrowForwardIcon");

    // Check the initial styles of the arrow icon
    expect(arrowIcon).toHaveStyle({
      right: "9px",
      opacity: "0",
    });
  });

  it("changes the arrow icon's position and opacity on hover", async () => {
    const user = userEvent.setup();
    render(<InteractiveGuideCard guideNo={guideNo} guideName={guideName} progress={progress} />);

    const card = screen.getByText(guideName).closest("div");
    const arrowIcon = screen.getByTestId("ArrowForwardIcon");

    // Simulate mouse hover
    await user.hover(card);

    // Check the styles of the arrow icon after hover
    expect(arrowIcon).toHaveStyle({
      right: "5px",
      opacity: "1",
    });

    // Simulate mouse out
    await user.unhover(card);

    // Check the styles of the arrow icon after unhover
    expect(arrowIcon).toHaveStyle({
      right: "9px",
      opacity: "0",
    });
  });

  it("renders the progress bar with the correct width based on progress prop", () => {
    render(<InteractiveGuideCard guideNo={guideNo} guideName={guideName} progress={progress} />);

    const progressBar = screen.getByTestId("guide-progressbar");

    // Check if the progress bar has the correct width
    expect(progressBar).toHaveStyle({ width: `${progress}%` });
  });
});
