<template>
  <div class="variant">
    <label>
      <img alt="cloud" src="icons/1/cloud.svg" width="50" />
    </label>
    <div>
      <label>{{ $t('fileVariant1') }}</label>
      <div>
        <input type="text" @change="getFileNet" />
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['openFile'])

const getFileNet = event => {
  if (event.target.value.indexOf('http') == -1) {
    event.target.value = 'https://' + event.target.value
  }
  console.log('getFileNet')
  console.log(event.target.value)
  fetch(event.target.value, {
    method: 'GET',
    mode: 'no-cors',
  })
    .then(response => response.text())
    .then(res => {
      console.log(res)
      emit('openFile', localFiles.value[i].filename, res, 0)
    })
    .catch(error => {
      console.error(error)
      alert($t('cloudBadMessage'))
    })
}
</script>
