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
  it("renders the login form correctly", () => {
    const wrapper = mount(loginCom)
    expect(wrapper.find(".title").text()).toBe("统一身份认证")
  })

  it("disables login button when input is incomplete", async () => {
    const wrapper = mount(loginCom)
    const button = wrapper.find(".login-button")

    expect(button.attributes("disabled")).toBeDefined()

    await wrapper.find('input[prop="username"]').setValue("testUser")
    await wrapper.find('input[prop="password"]').setValue("123456")


    expect(button.attributes("disabled")).toBeUndefined()
  })

  it("calls login API and handles success correctly", async () => {
     const wrapper = mount(loginCom)

  // 模拟用户输入
  await wrapper.find('input[prop="username"]').setValue("testUser")
  await wrapper.find('input[prop="password"]').setValue("123456")

  // 触发提交
  await wrapper.find("button").trigger("click")

  // 等待 DOM 更新
  await nextTick()

  // 断言 API 是否被调用
  expect(login).toHaveBeenCalledWith("testUser", "123456")
  })

})
