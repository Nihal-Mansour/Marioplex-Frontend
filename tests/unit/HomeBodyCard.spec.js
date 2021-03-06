import { createLocalVue, shallowMount } from "@vue/test-utils";
import HomeBodyCard from "../../src/components/HomeBodyCards";

describe("HomeBodyCard", () => {
  let wrapper;
  let store;
  const localVue = createLocalVue();
  beforeEach(() => {
    wrapper = shallowMount(HomeBodyCard, {
      localVue,
      stubs: ["router-link", "router-view"]
    });
  });
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
