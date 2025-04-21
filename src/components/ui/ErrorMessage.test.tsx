import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  const defaultMessage = "Something went wrong!";

  it("renders correctly with a message", () => {
    render(<ErrorMessage message={defaultMessage} />);
    expect(screen.getByText(`Error: ${defaultMessage}`)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Try Again/i })
    ).not.toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message={defaultMessage} onRetry={handleRetry} />);
    expect(screen.getByText(`Error: ${defaultMessage}`)).toBeInTheDocument();
    const retryButton = screen.getByRole("button", { name: /Try Again/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("calls onRetry handler when retry button is clicked", () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message={defaultMessage} onRetry={handleRetry} />);
    const retryButton = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
