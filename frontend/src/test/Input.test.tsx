import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/Input";

describe("Input", () => {
  it("renders its label and placeholder", () => {
    render(
      <Input label="Email" placeholder="m@example.com" onChange={() => {}} />,
    );

    // Queries throw if not found, which is itself an assertion.
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("m@example.com")).toBeInTheDocument();
  });

  it("calls onChange with the typed value", () => {
    const handleChange = vi.fn(); // a fake function that records how it was called
    render(
      <Input
        label="Email"
        placeholder="m@example.com"
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("m@example.com"), {
      target: { value: "hi@test.com" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    // e.target.value flows through — check the event the component passed up
    expect(handleChange.mock.calls[0][0].target.value).toBe("hi@test.com");
  });
});
