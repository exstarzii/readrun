import { reactive } from 'vue'

const state = reactive({
  filename: '',
  text: '',
  progress: 0,
  video: null,
  webcamStream: null,
  imageURL: null,
  localFiles: [],
  darkmode: 'lightmode',
  isPlay: false,
  screen: 0
})

export default state
