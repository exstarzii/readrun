<template>
  <div class="container2">
    <div class="videoBox Box">
      <video ref="video" autoplay></video>
    </div>
  </div>
  <div class="footer">
    <div class="videoBox">
      <div style="display: flex; justify-content: center">
        <img alt="shot" src="/icons/1/circle.svg" width="50" @click="shot" />
      </div>
      <input :value="$t('buttonStop')" type="button" @click="goBack" class="screenLink" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from '../state-management/store'

const store = useStore()
const video = ref()

const webcamStream = computed({
  get() {
    return store.webcamStream
  },
  set(value) {
    store.webcamStream = value
  },
})
onMounted(() => {
  startVideo()
})

function startVideo() {
  console.log(webcamStream.value)
  if (webcamStream.value != null) {
    video.value.srcObject = webcamStream.value
  } else if (navigator.getUserMedia) {
    // запросить видео и аудио поток с веб-камеры пользователя
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        video.value.srcObject = stream
        video.value.play()
        store.video = video.value
        console.log('video.value', video.value)
        webcamStream.value = stream
      })
      .catch((error) => {
        console.log('navigator.getUserMedia error: ', error)
      })
  }
}
function goBack() {
  webcamStream.value.getTracks()[0].stop()
  webcamStream.value = null
  store.screen = 0
}
function shot() {
  store.screen = 2
}
</script>
<style lang="scss"></style>
