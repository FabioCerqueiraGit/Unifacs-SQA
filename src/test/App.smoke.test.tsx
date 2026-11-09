import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App";
describe("Navegação e catálogo", () => {
  it("mostra os três eventos e navegação principal", () => {
    render(<App />);
    expect(
      screen.getByRole("navigation", { name: "Navegação principal" }),
    ).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
  it("filtra eventos por categoria e pela busca", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Tecnologia" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Tech Experience" }),
    ).toBeVisible();
    fireEvent.change(screen.getByRole("textbox", { name: "Buscar evento" }), {
      target: { value: "nada" },
    });
    expect(screen.getByText("Nenhum evento por aqui.")).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "Ver todos os eventos" }),
    );
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
  it("abre e fecha inscrição sem perder a navegação", () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Inscrever-se em Conecta: ideias que transformam",
      }),
    );
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByLabelText(/Nome completo/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Fechar inscrição" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("mostra ingresso vazio e permite retornar ao catálogo", () => {
    render(<App />);
    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Navegação principal" }),
      ).getByRole("link", { name: "Meus Ingressos" }),
    );
    expect(
      screen.getByRole("heading", { name: "Meus ingressos" }),
    ).toBeVisible();
    expect(screen.getByText("Seu próximo encontro está aqui.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Explorar eventos" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
});
