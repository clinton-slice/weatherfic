import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  it("renders loading text and weather icons", () => {
    render(<LoadingIndicator />);

    expect(screen.getByText(/Loading weather data.../i)).toBeInTheDocument();

    const emojiContainer = screen
      .getByRole("status")
      .querySelector(".flex.space-x-6");
    expect(emojiContainer).toBeInTheDocument();
    expect(emojiContainer?.children.length).toBeGreaterThan(0);
  });
});
