import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatItem from "./StatItem";

describe("StatItem", () => {
  it("renders correctly with icon and value", () => {
    const Icon = () => <svg data-testid="test-icon"></svg>;
    render(<StatItem icon={<Icon />} value="25°C" />);

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
  });

  it("renders correctly with different icon and numeric value", () => {
    const AnotherIcon = () => <span data-testid="another-icon">Wind</span>;
    render(<StatItem icon={<AnotherIcon />} value={15} />);

    expect(screen.getByTestId("another-icon")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });
});
