<template>
  <div class="variant">
    <label>
      <img alt="cloud" src="/icons/1/cloud.svg" width="50" />
    </label>
    <div>
      <input id="recentFile" style="display: none" type="file" @change="uploadFile" />
      <select name="recent" ref="recentFileSelect" class="lang" style="background: none" @change="openRecentFile">
        <option value="default" selected disabled hidden>{{ $t('recent') }}</option>
        <option v-for="item in localFiles">
          {{ item.filename }}
        </option>
      </select>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['openFile'])
const props = defineProps({
  localFiles: Object,
})
const recentFileSelect = ref(null)

const localFiles = computed({
  get() {
    return props.localFiles
  },
})

function openRecentFile(event) {
  console.log(event.target.value)
  for (let i = 0; i < localFiles.value.length; i++) {
    if (localFiles.value[i].filename == event.target.value) {
      console.log('openFile', localFiles.value[i].filename, localFiles.value[i].text, localFiles.value[i].progress)
      emit('openFile', localFiles.value[i].filename, localFiles.value[i].text, localFiles.value[i].progress)
      break
    }
  }
  recentFileSelect.selectedIndex = 0
}
</script>
