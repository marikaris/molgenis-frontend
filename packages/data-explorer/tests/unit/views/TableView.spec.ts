import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableView from '@/views/TableView.vue'
import Vuex from 'vuex'

describe('TableView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any

  beforeEach(() => {
    state = {
      shoppingFilter: false,
      tableMeta: { idAttribute: 'id' },
      dataDisplayLayout: 'TableView',
      shoppedEntityItems: [1, 3]
    }
    mutations = {
      toggleShoppingItems: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(TableView, { store,
      localVue,
      propsData: { entitiesToShow: [{ id: '1' }] } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
