import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
    const progress = ref(0)
    const screen = ref(0)
    const filename = ref('')
    const text = ref('')
    const darkmode = ref('')
    const video = ref(null)
    const webcamStream = ref(null)
    const imageURL = ref(null)
    const localFiles = ref([])
    const isPlay = ref(false)

    return { progress, screen, filename, text, darkmode, video, webcamStream, imageURL, localFiles, isPlay }
})