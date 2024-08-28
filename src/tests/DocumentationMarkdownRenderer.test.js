import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DocumentationMarkdownRenderer from "../DocumentationMarkdownRenderer"; // Adjust path as needed

describe("DocumentationMarkdownRenderer", () => {
  it("renders a heading1 correctly", () => {
    render(<DocumentationMarkdownRenderer text="$heading1{heading1-id}{Heading 1}" />);

    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByText("Heading 1")).toHaveAttribute("id", "heading1-id");
    expect(screen.getByText("Heading 1")).toHaveClass("MuiTypography-h4");
  });

  it("renders a heading2 correctly", () => {
    render(<DocumentationMarkdownRenderer text="$heading2{heading2-id}{Heading 2}" />);

    expect(screen.getByText("Heading 2")).toBeInTheDocument();
    expect(screen.getByText("Heading 2")).toHaveAttribute("id", "heading2-id");
    expect(screen.getByText("Heading 2")).toHaveClass("MuiTypography-h5");
  });

  it("renders a body1 correctly", () => {
    render(<DocumentationMarkdownRenderer text="$body1{body1-id}{Body text}" />);

    expect(screen.getByText("Body text")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toHaveAttribute("id", "body1-id");
    expect(screen.getByText("Body text")).toHaveClass("MuiTypography-body1");
  });

  it("renders a link correctly", () => {
    render(<DocumentationMarkdownRenderer text="$link{https://example.com}{Example Link}" />);

    expect(screen.getByText("Example Link")).toBeInTheDocument();
    expect(screen.getByText("Example Link")).toHaveAttribute("href", "https://example.com");
  });

  it("renders a video correctly", () => {
    render(<DocumentationMarkdownRenderer text="$video{video-id}{Video Title}{videoURL123}" />);

    expect(screen.getByText("Video Title")).toBeInTheDocument();
    expect(screen.getByRole("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/videoURL123",
    );
  });

  it("renders multiple types of elements correctly", () => {
    render(
      <DocumentationMarkdownRenderer
        text={`$heading1{heading1-id}{Heading 1}
               $body1{body1-id}{Body text}
               $link{https://example.com}{Example Link}
               $video{video-id}{Video Title}{videoId123}`}
      />,
    );

    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toBeInTheDocument();
    expect(screen.getByText("Example Link")).toBeInTheDocument();
    expect(screen.getByText("Video Title")).toBeInTheDocument();
  });
});
