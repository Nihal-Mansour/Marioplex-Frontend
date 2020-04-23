import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import LibAlbums from "@/components/lib-albums.vue";
describe("LibAlbums.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  it("test album name& artist name", () => {
    const wrapper = shallowMount(LibAlbums, {
      localVue,
      propsData: {
        name: "album name",
        artistname: "artist name"
      }
    });
    const name = wrapper.find("#cardtitle");
    const artistname = wrapper.find(".artistlink");
    expect(name.text()).toBe("album name");
    expect(artistname.text()).toBe("artist name");
  });
  it("renders", () => {
    const wrapper = shallowMount(LibAlbums, {localVue});
    expect(wrapper.exists()).toBe(true);
  }); 
  it("renders a vue instance", () => {
    const wrapper = shallowMount(LibAlbums, {localVue});
    expect(wrapper.isVueInstance()).toBe(true);
  });

});