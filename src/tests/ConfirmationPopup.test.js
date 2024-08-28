import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For custom matchers
import ConfirmationPopup from "../ConfirmationPopup"; // Adjust path as needed

describe("ConfirmationPopup", () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct title and description", () => {
    render(
      <ConfirmationPopup
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  it("renders buttons with the correct text", () => {
    render(
      <ConfirmationPopup
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onCancel when the Cancel button is clicked", () => {
    render(
      <ConfirmationPopup
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the Confirm button is clicked", () => {
    render(
      <ConfirmationPopup
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Confirm"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
