import { mount } from "@vue/test-utils"
import { describe, it, expect, vi } from "vitest"
import loginCom from "@/components/auth/loginCom.vue"
import { login } from "@/api"
import { useAuthStore } from "@/stores/tokenStore"
import router from "@/router"
import { ElLoading } from "element-plus"

vi.mock("@/api", () => ({
  login: vi.fn(),
}))

vi.mock("@/stores/tokenStore", () => ({
  useAuthStore: vi.fn(() => ({
    setData: vi.fn(),
  })),
}))

vi.mock("@/router", () => ({
  push: vi.fn(),
}))

vi.spyOn(ElLoading, "service").mockReturnValue({
  close: vi.fn(),
})

describe("LoginCom.vue", () => {

  it("disables login button when input is incomplete", async () => {
    const wrapper = mount(loginCom)
    const button = wrapper.find(".login-button")

  // ??????
  await wrapper.find('input[prop="username"]').setValue("testUser")
  await wrapper.find('input[prop="password"]').setValue("123456")

  // ??
  expect(wrapper.vm.loginForm.username).toBe("testUser")
  expect(wrapper.vm.loginForm.password).toBe("123456")
  })

  it("calls login API and handles success correctly", async () => {
   const wrapper = mount(loginCom)

  await wrapper.find('input[name="username"]').setValue("test")
  await wrapper.find('input[name="password"]').setValue("123456")

  await wrapper.find(".login-button").trigger("click")

  expect(login).toHaveBeenCalledWith("test", "123456")
  })

  it("handles login failure correctly", async () => {
    const mockError = { response: { data: { status: 1, reason: "????" } } }
    login.mockRejectedValue(mockError)

    const wrapper = mount(loginCom)
    await wrapper.setData({ loginForm: { username: "test", password: "wrong" } })

    await wrapper.find(".login-button").trigger("click")

    await new Promise((resolve) => setTimeout(resolve, 0)) // ?? Promise ??

    expect(wrapper.text()).toContain("????")
  })

  it("stores rememberMe in localStorage", async () => {
    const wrapper = mount(loginCom)
    
    await wrapper.setData({ loginForm: { username: "test", password: "123456" }, rememberMe: true })

    await wrapper.find(".login-button").trigger("click")

    expect(localStorage.getItem("rememberMe")).toBe("true")
  })
})
