import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SignInForm from "../components/SignInForm";

// 1) Replace the axios module with fake post/get functions.
vi.mock("axios", () => ({
  default: { post: vi.fn(), get: vi.fn() },
}));

// 2) Silence toast notifications (no ToastContainer is mounted in tests).
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

// 3) Capture navigate() calls. vi.hoisted lets the mock factory (which runs
//    BEFORE imports) safely reference this variable.
const { mockNavigate } = vi.hoisted(() => ({ mockNavigate: vi.fn() }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Helper: the component uses Recoil + Router, so wrap it in both providers.
const renderForm = () =>
  render(
    <RecoilRoot>
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    </RecoilRoot>,
  );

describe("SignInForm — auth / JWT flow", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks(); // reset call history between tests
  });

  it("stores the JWT + user and redirects to /blogs on success", async () => {
    // Arrange: pretend the backend returns a token + user.
    (axios.post as any).mockResolvedValue({
      data: { token: "fake.jwt.token", storedUser: { name: "Manak" } },
    });

    renderForm();

    // Act: fill the form and click Sign In.
    fireEvent.change(screen.getByPlaceholderText("m@example.com"), {
      target: { value: "manak@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("******"), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Assert: the async handler ran and did the right side effects.
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake.jwt.token");
    });
    expect(JSON.parse(localStorage.getItem("user")!)).toEqual({
      name: "Manak",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/blogs");

    // Bonus: verify we posted to the right endpoint with the form data.
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/user/signin"),
      { email: "manak@test.com", password: "secret123" },
    );
  });

  it("does NOT store a token or redirect when the request fails", async () => {
    (axios.post as any).mockRejectedValue(new Error("bad credentials"));

    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
    expect(localStorage.getItem("token")).toBeNull();
  });
});
