import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.exists()).toBeTruthy()
  })
})
