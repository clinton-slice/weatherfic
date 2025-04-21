import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders Card with children", () => {
    render(<Card>Card Content</Card>);
    const cardContent = screen.getByText("Card Content");
    expect(cardContent).toBeInTheDocument();
    const cardElement = cardContent.closest("div");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).not.toHaveAttribute("role", "button");
    expect(cardElement).not.toHaveAttribute("tabindex");
  });

  it("renders Card with custom className", () => {
    render(<Card className="custom-card">Card Content</Card>);
    const cardElement = screen.getByText("Card Content").closest("div");
    expect(cardElement).toHaveClass("custom-card");
  });

  it("calls onClick handler when clicked if provided", () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    const cardElement = screen.getByRole("button", { name: /Clickable Card/i });
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveAttribute("tabindex", "0");
    fireEvent.click(cardElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick handler when Enter key is pressed if provided", () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    const cardElement = screen.getByRole("button", { name: /Clickable Card/i });
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveAttribute("tabindex", "0");
    cardElement.focus();
    fireEvent.keyDown(cardElement, { key: "Enter", code: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
