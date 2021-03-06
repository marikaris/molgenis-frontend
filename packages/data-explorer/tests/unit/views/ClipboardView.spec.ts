import { shallowMount, createLocalVue } from '@vue/test-utils'
import ClipboardView from '@/views/ClipboardView.vue'
import Vuex from 'vuex'

describe('ClipboardView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.filter('i18n', jest.fn())
  let store: any
  let state: any
  let mutations: any

  beforeEach(() => {
    state = {
      tableMeta: { idAttribute: 'tableID' },
      shoppedEntityItems: ['1', '3'],
      tableData: {
        items: [
          { tableID: '1' },
          { tableID: '2' },
          { tableID: '3' }
        ]
      }
    }
    mutations = {
      setShowShoppingCart: jest.fn(),
      setHideFilters: jest.fn()
    }
    store = new Vuex.Store({ state, mutations })
  })

  it('exists', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('closes shoppingcart', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue })
    const button = wrapper.find('button.cart-back')
    button.trigger('click')
    expect(mutations.setShowShoppingCart).toHaveBeenCalledWith(state, false)
    expect(mutations.setHideFilters).toHaveBeenCalledWith(state, false)
  })

  it('returns true for selected shopping item', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(true)
  })

  it('returns false for item that is not selected', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue })
    const entity = { tableID: '2', label: 'blaat2' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(false)
  })
})
