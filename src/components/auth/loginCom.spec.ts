import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import loginCom from "@/components/auth/loginCom.vue"

// Mock router
vi.mock("@/router/index.js", () => ({
  default: { push: vi.fn() },
}));

describe("LoginCom.vue", () => {
  it("renders the login form", () => {
    const wrapper = mount(loginCom);
    expect(wrapper.find(".login-form").exists()).toBe(true);
  });

  it("disables login button when fields are empty", async () => {
    const wrapper = mount(loginCom);
    const loginButton = wrapper.find(".login-button");
    expect(loginButton.attributes("disabled")).toBeDefined();
  });

  it("enables login button when username and password are provided", async () => {
    const wrapper = mount(loginCom);
    wrapper.vm.loginForm.username = "testuser";
    wrapper.vm.loginForm.password = "password123";
    
    await nextTick();
    
    const loginButton = wrapper.find(".login-button");
    expect(loginButton.attributes("disabled")).toBeUndefined();
  });
});
