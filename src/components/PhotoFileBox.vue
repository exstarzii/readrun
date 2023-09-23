<template>
  <div class="variant">
    <label for="getPhotoFile">
      <img alt="scan" src="icons/1/scan.svg" width="50" />
    </label>
    <div>
      <label for="getPhotoFile">
        {{ $t('fileVariant3') }}
      </label>
      <input id="getPhotoFile" style="display: none" type="button" @click="getFileImagePublic" />
      <input ref="filechooseinput" style="display: none" type="file" @change="getFileImageLocal" />
    </div>
  </div>
  <div ref="log" />
</template>
<script setup>
import Tesseract from 'tesseract.js'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  imageURL: String,
})
const emit = defineEmits(['changeScreen', 'openFile', 'setImageURL'])
const imageURL = computed({
  get() {
    return props.imageURL
  },
  set(value) {
    emit('setImageURL', value)
  },
})
const filechooseinput = ref(null)
const log = ref(null)

onMounted(() => {
  if (imageURL.value != null) {
    recognizePhoto(imageURL.value)
    imageURL.value = null
  }
})

const getFileImagePublic = (event) => {
  if (confirm('выбрать из существующих фото?')) {
    filechooseinput.value.click()
  } else {
    emit('changeScreen', 3)
  }
}
const getFileImageLocal = (event) => {
  recognizePhoto(event.target.files[0])
}

const recognizePhoto = (file) => {
  console.log('getFileImage')

  // Распознавание изображения
  function recognize(file, lang, logger) {
    return Tesseract.recognize(file, lang, { logger }).then(({ data: { text } }) => {
      return text
    })
  }

  // Отслеживание прогресса обработки
  function updateProgress(data) {
    log.value.innerHTML = ''
    const statusText = document.createTextNode(data.status)
    const progress = document.createElement('progress')
    const br = document.createElement('br')
    progress.max = 1
    progress.value = data.progress
    log.value.appendChild(statusText)
    log.value.appendChild(br)
    log.value.appendChild(progress)
  }

  // Вывод результата
  function setResult(textres) {
    log.value.innerHTML = ''
    textres = textres.replace(/\n\s*\n/g, '\n')
    // text.value = textres;
    // screen.value = Screens.PlayerScreen;
    emit('openFile', file.name, textres, 0)
    console.log(textres)
  }
  if (!file) return

  const lang = 'rus'

  recognize(file, lang, updateProgress).then(setResult)
}
</script>
