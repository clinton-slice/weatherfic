import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "@contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

vi.mock("@contexts/ThemeContext");

describe("ThemeToggle", () => {
  let mockSetTheme: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks();
    mockSetTheme = vi.fn();
  });

  it("renders Light Mode correctly when theme is light", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    expect(screen.getByText(/☀️ Light Mode/i)).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toContain("🌙");
    expect(screen.queryByText(/🌙 Dark Mode/i)).not.toBeInTheDocument();
  });

  it("renders Dark Mode correctly when theme is dark", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    expect(screen.getByText(/🌙 Dark Mode/i)).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toContain("☀️");
    expect(screen.queryByText(/☀️ Light Mode/i)).not.toBeInTheDocument();
  });

  it("calls setTheme with 'dark' when clicked in light mode", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'light' when clicked in dark mode", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
