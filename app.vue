<template>
  <div class="container">
    <Header />
    <component :is="Components[screen]" />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import Header from './src/components/Header.vue'
import chooseFilePage from './src/pages/chooseFilePage.vue'
import photoPage from './src/pages/photoPage.vue'
import readPage from './src/pages/readPage.vue'
import videoPage from './src/pages/videoPage.vue'
import { useStore } from './src/state-management/store'

const store = useStore()

const Components = [chooseFilePage, readPage, photoPage, videoPage]
const screen = computed(() => store.screen)

const text = computed({
  get() {
    return store.text
  },
  set(value) {
    store.text = value
  }
})
const progress = computed({
  get() {
    return store.progress
  },
  set(value) {
    store.progress = value
  }
})
const filename = computed({
  get() {
    return store.filename
  },
  set(value) {
    store.filename = value
  }
})
const localFiles = computed({
  get() {
    return store.localFiles
  },
  set(value) {
    store.localFiles = value
  }
})

watch(filename, (newfile, oldFile) => {
  closeFile(oldFile)
})

onMounted(() => {
  if (!!localStorage.localFiles) {
    localFiles.value = JSON.parse(localStorage.localFiles)
  }
})

function closeFile(fn) {
  console.log('storecloseFile', fn, progress.value)
  let file = {
    filename: fn,
    text: text.value,
    progress: progress.value,
  }
  if (file.filename == '' || file.filename == null) {
    return
  }
  // if file already exist
  for (let i = 0; i < localFiles.value.length; i++) {
    if (localFiles.value[i].filename == file.filename) {
      // let temp = localFiles.value[0];
      // localFiles.value[0] = file;
      localFiles.value[i] = file
      localStorage.localFiles = JSON.stringify(localFiles.value)
      return
    }
  }
  // if files less than Max files count
  if (localFiles.value.length < 5) {
    localFiles.value.push(file)
  } else {
    let temp = localFiles.value[0]
    localFiles.value[0] = file
    localFiles.value[localFiles.value.length - 1] = temp
  }
  console.log(localFiles.value)
  localStorage.localFiles = JSON.stringify(localFiles.value)
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

*,
html,
body {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  perspective: 800px;
}

body {
  background-color: #eb3b5a;
  transition-property: background-color;
  transition-duration: 0.2s;
  width: 100%;
  min-height: 100vh;

  .header {
    color: whitesmoke;
  }

  .container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: 20px;
    min-height: 100vh;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-not {
    cursor: not-allowed;
  }

  .screenLink {
    width: 100%;
    background: none;
    border: 1px solid black;
    margin-top: 10px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
  }

  // .getFileBox, .playerBox .rangeBox{
  .container2 {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .container3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .photoBox,
  .videoBox {
    img {
      cursor: pointer;
    }
  }

  .Box {
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
}
</style>
