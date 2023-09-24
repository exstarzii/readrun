<template>
  <div class="variant">
    <label>
      <img alt="cloud" src="/icons/1/cloud.svg" width="50" />
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
  useFetch("https://www.w3.org/services/html2txt", {
    method: 'GET',
    query: { url: 'https://pinia.vuejs.org/ssr/nuxt.html'}
  })
    .then(response => {
      console.log("response", response.data);
      return response.data;
    })
    .then(data => {
      if (data.value)
        emit('openFile', event.target.value, data.value, 0);
      else {
        alert('Could not get the text from this link');
      }
    })
    .catch(error => {
      alert('Could not get the text from this link');
    })
}
</script>
