<template>
  <div class="container2">
    <div class="container3">
      <div class="getFileBox">
        <RecentFileBox
          :filename="filename"
          :text="text"
          :progress="progress"
          :localFiles="localFiles"
          @open-file="openFile"
        />
        <CloudFileBox @open-file="openFile" />
        <LocalFileBox @open-file="openFile" />
        <PhotoFileBox
          :imageURL="imageURL"
          @open-file="openFile"
          @set-image-u-r-l="setImageURL"
          @change-screen="changeScreen"
        />
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<script setup>
import RecentFileBox from '../../src/components/RecentFileBox.vue'
import CloudFileBox from '../../src/components/CloudFileBox.vue'
import LocalFileBox from '../../src/components/LocalFileBox.vue'
import PhotoFileBox from '../../src/components/PhotoFileBox.vue'
import state from '../../store.js'
import { computed, toRef } from 'vue'

const localFiles = toRef(state, 'localFiles')
const imageURL = toRef(state, 'imageURL')

const text = computed({
  get() {
    return state.text
  },
  set(value) {
    state.text = value
  },
})
const progress = computed({
  get() {
    return state.progress
  },
  set(value) {
    state.progress = value
  },
})
const filename = computed({
  get() {
    return state.filename
  },
  set(value) {
    state.filename = value
  },
})

function openFile(name, content, progressp = 0) {
  filename.value = name
  text.value = content
  progress.value = progressp
  state.screen = 1
}
// toss up
function setImageURL(newval) {
  state.imageURL = newval
}
// toss up
function changeScreen(_screen) {
  state.screen = _screen
}
</script>
<style lang="scss">
.getFileBox {
  label {
    cursor: pointer;
  }

  .variant {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 10px;
  }

  input {
    background: none;
    border: none;
    border-bottom: 1px solid black;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
}
</style>
