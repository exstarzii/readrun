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
import { computed, toRef } from 'vue'
import { useStore } from '../state-management/store'

const store = useStore()
const localFiles = toRef(store, 'localFiles')
const imageURL = toRef(store, 'imageURL')

const text = computed({
  get() {
    return store.text
  },
  set(value) {
    store.text = value
  },
})
const progress = computed({
  get() {
    return store.progress
  },
  set(value) {
    store.progress = value
  },
})
const filename = computed({
  get() {
    return store.filename
  },
  set(value) {
    store.filename = value
  },
})

function openFile(name, content, progressp = 0) {
  filename.value = name
  text.value = content
  progress.value = progressp
  store.screen = 1
}
// toss up
function setImageURL(newval) {
  store.imageURL = newval
}
// toss up
function changeScreen(_screen) {
  store.screen = _screen
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
