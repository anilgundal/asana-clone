import { computed } from 'vue'
import { useStore } from 'vuex'
const mapState = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.state).map(
      key => [key, computed(() => store.state[key])]
    )
  )
}
const mapGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter, computed(() => store.getters[getter])]
    )
  )
}
const mapMutations = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._mutations).map(
      mutation => [mutation, value => store.commit(mutation, value)]
    )
  )
}
const mapActions = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => [action, value => store.dispatch(action, value)]
    )
  )
}
export { mapState, mapGetters, mapMutations, mapActions }


<template>
  Count: {{ count }}
  Odd: {{ counterIsOdd }}
  Even: {{ counterIsEven }}
  <button @click="countUp">count up</button>
  <button @click="countDown">count down</button>
  <button @click="getRemoteCount('https://api.countapi.xyz')">
    get remote count
  </button>
</template>
<script setup>
import { mapState, mapGetters, mapMutations, mapActions } from '../map-state'
// computed properties
const { count } = mapState()
const { countIsOdd, countIsEvent } = mapGetters()
// commit/dispatch functions
const { countUp, countDown } = mapMutations()
const { getRemoteCount } = mapActions()
</script>