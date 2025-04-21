// sounds.js
const forest = new Audio('./assets/Floresta.mp3')
const rain = new Audio('./assets/Chuva.mp3')
const market = new Audio('./assets/Cafeteria.mp3')
const fire = new Audio('./assets/Lareira.mp3')

const buttonPress = new Audio('./assets/buttonPress.wav')
const kitchenTimer = new Audio('./assets/kitchen-timer.mp3')

// Deixa os sons em loop, se necessário
forest.loop = true
rain.loop = true
market.loop = true
fire.loop = true

export const soundEffects = {
  forest,
  rain,
  market,
  fire,
  buttonPress,
  kitchenTimer,
}