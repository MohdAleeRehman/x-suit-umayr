import { authStore } from "@/lib/auth";

describe("authStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves token", () => {
    authStore.setToken("token-123");
    expect(authStore.getToken()).toBe("token-123");
  });

  it("clears token", () => {
    authStore.setToken("token-123");
    authStore.clearToken();
    expect(authStore.getToken()).toBeNull();
  });
});
