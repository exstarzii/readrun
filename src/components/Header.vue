<template>
  <div class="header">
    <img alt="LOGO" src="LOGO.png" width="48" style="margin-right: 80px" />
    <img alt="light mode" :src="iconSRC" width="48" @click="changeLightMode" class="cursor-pointer" />
    <select name="locale" v-model="locale" class="lang">
      <option value="en">en</option>
      <option value="ru">ru</option>
    </select>
    <h1>READRUN</h1>
  </div>
</template>

<script setup>
import state from '../../store.js'
import { computed, watch } from 'vue'

const isPlay = computed({
  get() {
    return state.isPlay
  },
})

watch(isPlay, (newvalue, oldvalue) => {
  enableReadMode(newvalue)
})

const { locale } = useI18n()
const darkmode = computed({
  get() {
    return state.darkmode
  },
  set(value) {
    state.darkmode = value
  },
})
const iconSRC = computed(() => (darkmode.value == 'darkmode' ? 'icons/1/dark_mode.svg' : 'icons/1/light_mode.svg'))

function changeLightMode() {
  if (darkmode.value == 'darkmode') {
    darkmode.value = 'lightmode'
    document.body.classList.remove('darkmode')
  } else {
    darkmode.value = 'darkmode'
    document.body.classList.remove('lightmode')
  }
  if (isPlay.value) {
    document.body.classList.add(darkmode.value)
  }
  // console.log(darkmode.value)
}
function enableReadMode(bool) {
  if (bool) {
    document.body.classList.add(darkmode.value)
  } else {
    document.body.classList.remove(darkmode.value)
  }
}
</script>
<style lang="scss">
.lang {
  background: none;
  border: none;
  border-bottom: 1px solid black;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  max-width: 200px;
}
</style>
