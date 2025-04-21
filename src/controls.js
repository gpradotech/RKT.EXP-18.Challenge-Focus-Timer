import * as timer from './timer.js'
import { soundEffects } from './sounds.js'

/**
 * Atualiza os elementos visuais do timer na interface.
 * @param {number} totalSeconds
 */
function updateDisplay(totalSeconds) {
  const minutesEl = document.getElementById('minutes')
  const secondsEl = document.getElementById('seconds')

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    minutesEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  } else {
    minutesEl.textContent = String(minutes).padStart(2, '0')
  }
  secondsEl.textContent = String(seconds).padStart(2, '0')
}

/**
 * Toca ou pausa uma faixa de som ambiente.
 * Garante que apenas uma faixa seja tocada por vez.
 */
function toggleAmbientSound(targetSound) {
  const all = [soundEffects.forest, soundEffects.rain, soundEffects.market, soundEffects.fire]
  all.forEach(sound => {
    if (sound !== targetSound) sound.pause()
  })

  if (targetSound.paused) {
    targetSound.play()
  } else {
    targetSound.pause()
  }
}

/**
 * Inicializa os eventos dos botões da interface
 */
export function setupControls() {
  timer.setUpdateCallback(updateDisplay)
  timer.setFinishCallback(() => {
    alert('⏰ Tempo esgotado!')
    soundEffects.kitchenTimer.play()
    document.documentElement.classList.remove('running')
  })

  const playBtn = document.getElementById('play')
  const pauseBtn = document.getElementById('pause')
  const stopBtn = document.getElementById('stop')
  const setBtn = document.getElementById('set')
  const plusBtn = document.getElementById('plus')
  const minusBtn = document.getElementById('minus')

  playBtn.addEventListener('click', () => {
    timer.play()
    document.documentElement.classList.add('running')
    soundEffects.buttonPress.play()
  })

  pauseBtn.addEventListener('click', () => {
    timer.pause()
    document.documentElement.classList.remove('running')
    soundEffects.buttonPress.play()
  })

  stopBtn.addEventListener('click', () => {
    timer.stop()
    document.documentElement.classList.remove('running')
    soundEffects.buttonPress.play()
  })

  setBtn.addEventListener('click', () => {
    soundEffects.buttonPress.play()
    let input
    do {
      input = prompt('Defina o tempo (minutos):')
      if (input === null) return
      const value = Number(input)
      if (!isNaN(value) && value >= 0) {
        timer.setTime(value)
        break
      } else {
        alert('Valor inválido! Digite um número positivo ou zero.')
      }
    } while (true)
  })

  plusBtn.addEventListener('click', () => {
    timer.addMinutes(1)
  })

  minusBtn.addEventListener('click', () => {
    timer.addMinutes(-1)
  })

  // Botões da seção de sons
  const soundButtons = document.querySelectorAll('#sounds button')
  soundButtons[0].addEventListener('click', () => toggleAmbientSound(soundEffects.forest))
  soundButtons[1].addEventListener('click', () => toggleAmbientSound(soundEffects.rain))
  soundButtons[2].addEventListener('click', () => toggleAmbientSound(soundEffects.market))
  soundButtons[3].addEventListener('click', () => toggleAmbientSound(soundEffects.fire))
}
