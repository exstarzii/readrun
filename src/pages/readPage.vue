<template>
  <div class="container2">
    <div class="playerBox Box">
      <span class="runline" ref="runline">
        {{ word || $t('textEnd') }}
      </span>
    </div>
  </div>

  <div class="footer">
    <div class="playerBox">
      <div class="rangeBox">
        <div class="range">
          <input
            type="range"
            :value="progress"
            :disabled="isPlay"
            :min="0"
            class="fullwidth"
            :max="`${textArray.length}`"
            step="1"
            :class="`cursor-${isPlay ? 'not' : 'pointer'}`"
            @input="countChange"
          />
        </div>
      </div>
      <div class="player">
        <img alt="begin" src="/icons/1/previous.svg" width="50" @click="goToStart" />
        <img alt="stop" src="/icons/1/stop.svg" width="50" @click="stop" />
        <img v-if="!isPlay" alt="play" src="/icons/1/play.svg" width="50" @click="play" class="playButton" />
        <img v-else alt="pause" src="/icons/1/pause.svg" width="50" @click="pause" class="playButton" />
        <img alt="last" src="/icons/1/next.svg" width="50" @click="goToEnd" />
      </div>
      <div class="rangeBox" style="display: flex; justify-content: center; flex-direction: column; align-items: center">
        <div class="range">
          <input
            v-model="wordsPerMinute"
            type="range"
            :disabled="isPlay"
            :min="wordsPerMinuteMIN"
            :max="wordsPerMinuteMAX"
            step="1"
            :class="`cursor-${isPlay ? 'not' : 'pointer'}`"
          />
          <span>{{ wordsPerMinute }}</span>
        </div>
        <div>
          <span>{{ $t('wordSpeed') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from '../state-management/store'

const store = useStore()

const timer = ref()
const timerSpeed = ref()
const stepsForAcceleration = 5.0 // in seconds
const wordsPerMinuteMIN = 20
const wordsPerMinuteMAX = 1000
const isPlay = computed({
  get() {
    return store.isPlay
  },
  set(value) {
    store.isPlay = value
  },
})
const wordsPerMinute = ref(100)

let animId
const text = computed({
  get() {
    return store.text
  },
  set(value) {
    store.text = value
  },
})
const progress = computed({
  get() {
    return store.progress
  },
  set(value) {
    store.progress = value
  },
})
const filename = computed({
  get() {
    return store.filename
  },
  set(value) {
    store.filename = value
  },
})

const initFontSize = 42.0
const finalFontSize = 48.0

const countChange = (event) => {
  progress.value = +event.target.value
  // console.log(progress.value)
}

const textArray = computed(() => (text.value ? text.value.split(' ') : []))
const word = computed(() => textArray.value[progress.value] || 'Текст завершен')

const runline = ref(null)
function play() {
  isPlay.value = true
  document.body.classList.add('hideOnPlay')

  // const inc = Math.ceil((wordsPerMinute.value - wordsPerMinuteMIN) / stepsForAcceleration);
  const inc = 20
  let tempSpeed = wordsPerMinuteMIN

  let timedelay = (60 * 1000) / tempSpeed

  const increaseSpeed = () => {
    tempSpeed += inc
    timedelay = (60 * 1000) / tempSpeed
    if (tempSpeed < wordsPerMinute.value) {
      timerSpeed.value = setTimeout(increaseSpeed, 200)
    } else {
      tempSpeed = wordsPerMinute.value
    }
  }
  const showNewWord = () => {
    console.log('showNewWord')
    cancelAnimationFrame(animId)
    progress.value += 1
    let curentFontSize = initFontSize
    animId = requestAnimationFrame(function measure(time) {
      runline.value.style.fontSize = curentFontSize + 'px'
      curentFontSize++
      if (curentFontSize <= finalFontSize) requestAnimationFrame(measure)
    })
    if (textArray.value.length > progress.value) {
      timer.value = setTimeout(showNewWord, timedelay)
    }
  }

  timer.value = setTimeout(showNewWord, timedelay)
  timerSpeed.value = setTimeout(increaseSpeed, 200)
}

function pause() {
  isPlay.value = false
  clearTimeout(timer.value)
  clearTimeout(timerSpeed.value)
  cancelAnimationFrame(animId)
  document.body.classList.remove('hideOnPlay')
}

function stop() {
  pause()
  store.screen = 0
  filename.value = null
}
function goToEnd() {
  pause()
  progress.value = textArray.value.length - 1
}
function goToStart() {
  pause()
  progress.value = 0
}
</script>
<style lang="scss">
.range .fullwidth {
  width: 100%;
}

.player {
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
}

.range input {
  -webkit-appearance: none;
  width: 400px;
  height: 4px;
  border-radius: 5px;
  background-color: #ba3950;
  outline: none;
}

.range input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a83348;
}

.range span {
  position: absolute;
  margin-left: 14px;
  width: 50px;
  height: 30px;
  background-color: #222;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 30px;
}

.range span:before {
  content: '';
  position: absolute;
  border-right: 9px solid transparent;
  border-left: 9px solid transparent;
  border-bottom: 12px solid #222;
  left: -10px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
}

.runline {
  font-size: 42px;
  text-align: center;
  transition-property: font-size;
  transition-duration: 0.1s;
  max-height: 910px;
  max-width: 100%;
  overflow: hidden;
}

.runline.anim {
  font-size: 46px;
}

.darkmode {
  background-color: #222;
  color: white;

  .screenLink {
    border-color: white;
    color: white;
  }

  .range input {
    background-color: white;
  }

  .range input::-webkit-slider-thumb {
    background-color: white;
  }

  .lang {
    color: white;
    border-bottom: 1px solid white;
  }
}

.lightmode {
  background-color: white;
  color: black;

  .screenLink {
    border-color: black;
    color: black;
  }

  .range input {
    background-color: black;
  }

  .range input::-webkit-slider-thumb {
    background-color: black;
  }

  .header {
    color: black;
  }
}

.hideOnPlay div {
  visibility: hidden;
}

.hideOnPlay .player {
  justify-content: center;
}

.hideOnPlay .player img {
  display: none;
}

.hideOnPlay .player .playButton {
  display: block;
}

.hideOnPlay .playButton,
.hideOnPlay .runline {
  visibility: visible;
}
</style>
