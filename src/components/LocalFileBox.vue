<template>
  <div class="variant">
    <label for="uploadFile">
      <img alt="download" src="icons/1/download.svg" width="50" />
    </label>
    <label for="uploadFile">{{ $t('fileVariant2') }}</label>
    <input id="uploadFile" style="display: none" type="file" @change="uploadFile" />
  </div>
</template>
<script setup>
const emit = defineEmits(['openFile'])

function uploadFile(event) {
  console.log('here go')
  const file = event.target.files[0]

  event.target.value = ''
  const reader = new FileReader()
  reader.onload = () => {
    emit('openFile', file.name, reader.result, 0)
  }
  reader.readAsText(file)
}
</script>
