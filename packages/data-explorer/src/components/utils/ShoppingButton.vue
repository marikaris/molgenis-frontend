<template>
  <button
    @click="toggleShoppingItems(id)"
    type="button"
    :class="{'btn-primary': isSelected, 'btn-outline-secondary': !isSelected}"
    class="btn-sm float-right text-nowrap shopping-button">
    <font-awesome-icon size="xs" v-if="isSelected" icon="minus"></font-awesome-icon>
    <font-awesome-icon size="xs" v-else icon="plus"></font-awesome-icon>
    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
  </button>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapMutations } from 'vuex'

library.add(faShoppingCart, faMinus, faPlus)

export default Vue.extend({
  name: 'ShoppingButton',
  props: {
    id: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapMutations(['toggleShoppingItems'])
  },
  components: { FontAwesomeIcon }
})
</script>
