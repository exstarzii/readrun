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
import state from '../../store.js'
import { computed, onMounted, ref, toRef } from 'vue'

const webcamStream = computed({
  get() {
    return state.webcamStream
  },
  set(value) {
    state.webcamStream = value
  }
})
const imageURL = toRef(state, 'imageURL')
const video = computed({
  get() {
    return state.video
  },
  set(value) {
    state.video = value
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
  state.imageURL = canvas.value.toDataURL('image/png')
  state.screen = 0
}
function goBack() {
  state.screen = 3
}
</script>
<style lang="scss"></style>
