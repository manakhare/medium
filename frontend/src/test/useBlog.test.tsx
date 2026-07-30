import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useBlogs } from "../hooks";

vi.mock("axios", () => ({ default: { get: vi.fn(), post: vi.fn() } }));

describe("useBlogs", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("fetches blogs with the JWT from localStorage in the Authorization header", async () => {
    localStorage.setItem("token", "fake.jwt.token");
    (axios.get as any).mockResolvedValue({
      data: { blogs: [{ id: "1", title: "Hello" }] },
    });

    const { result } = renderHook(() => useBlogs());

    // Starts loading, then resolves.
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/blog/bulk"),
      { headers: { Authorization: "fake.jwt.token" } },
    );
    expect(result.current.blogs).toEqual([{ id: "1", title: "Hello" }]);
  });
});
