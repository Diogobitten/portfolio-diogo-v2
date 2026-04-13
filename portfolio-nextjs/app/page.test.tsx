import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the hero heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument();
  });

  it("renders the name tagline above the heading", () => {
    render(<Home />);
    expect(screen.getByText("Diogo Bittencourt")).toBeInTheDocument();
  });

  it("renders the CTA buttons", () => {
    render(<Home />);
    expect(screen.getByText("Fale Comigo")).toBeInTheDocument();
    expect(screen.getByText(/Ver Projetos/)).toBeInTheDocument();
  });

  it("renders the profile image", () => {
    render(<Home />);
    expect(screen.getByAltText("Diogo Bittencourt")).toBeInTheDocument();
  });

  it("renders section placeholders with correct IDs", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("#portfolio")).toBeInTheDocument();
    expect(container.querySelector("#contato")).toBeInTheDocument();
  });
});
