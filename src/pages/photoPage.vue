<template>
  <div class="container2">
    <div class="photoBox Box">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
  <div class="footer">
    <div class="photoBox">
      <input :value="$t('buttonDone')" type="button" @click="takePhotoDone" class="screenLink" />
      <input :value="$t('buttonBack')" type="button" @click="goBack" class="screenLink" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRef } from 'vue'
import { useStore } from '../state-management/store'

const store = useStore()

const webcamStream = computed({
  get() {
    return store.webcamStream
  },
  set(value) {
    store.webcamStream = value
  }
})
const imageURL = toRef(store, 'imageURL')
const video = computed({
  get() {
    return store.video
  },
  set(value) {
    store.video = value
  }
})
const canvas = ref(null)
onMounted(() => {
  shot()
})
function shot() {
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  console.log(video.value)
  canvas.value.getContext('2d').drawImage(video.value, 0, 0)
}
function takePhotoDone() {
  console.log('the photo end', webcamStream.value)
  webcamStream.value.getTracks()[0].stop()
  store.imageURL = canvas.value.toDataURL('image/png')
  store.screen = 0
}
function goBack() {
  store.screen = 3
}
</script>
<style lang="scss"></style>
