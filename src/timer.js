// ID do setInterval, usado para pausar ou parar o timer
let timerId

// Total de segundos restantes no temporizador (por padrão: 25 minutos)
let totalSeconds = 1500

// Função de callback que será chamada a cada segundo (para atualizar o display)
let onTick = () => {}

// Função de callback que será chamada quando o tempo acabar
let onFinish = () => {}

/**
 * Define a função que será chamada a cada segundo.
 * @param {Function} callback - função que recebe os segundos restantes
 */
export function setUpdateCallback(callback) {
  onTick = callback
}

/**
 * Define a função que será chamada quando o timer terminar.
 * @param {Function} callback - função chamada ao fim do timer
 */
export function setFinishCallback(callback) {
  onFinish = callback
}

/**
 * Define um novo tempo para o temporizador, em minutos.
 * Também chama o callback onTick para atualizar o display imediatamente.
 * @param {number} minutes
 */
/**
 * Define um novo tempo para o temporizador, em minutos.
 * Garante que o tempo nunca seja negativo.
 * @param {number} minutes
 */
export function setTime(minutes) {
  const safeMinutes = Math.max(0, Math.min(minutes, 1440)) // 1440 minutos = 24h
  totalSeconds = safeMinutes * 60
  onTick(totalSeconds)
}



/**
 * Inicia a contagem regressiva.
 * A cada segundo, reduz totalSeconds e chama onTick.
 * Se o tempo acabar, limpa o intervalo e chama onFinish.
 */
export function play() {
  clearInterval(timerId)

  // ✅ Se o tempo já está zerado, alerta e pausa a interface imediatamente
  if (totalSeconds <= 0) {
    onFinish()
    document.documentElement.classList.remove('running') // remove "running" do <html>
    return
  }

  // ✅ Inicia a contagem regressiva
  timerId = setInterval(() => {
    totalSeconds--
    onTick(totalSeconds)

    if (totalSeconds <= 0) {
      clearInterval(timerId)
      onFinish()
      document.documentElement.classList.remove('running') // remove "running" ao terminar normalmente
    }
  }, 1000)
}


/**
 * Pausa a contagem do temporizador.
 */
export function pause() {
  clearInterval(timerId)
}

/**
 * Para o temporizador e reseta o tempo para zero.
 * Também chama onTick para atualizar a interface.
 */
export function stop() {
  clearInterval(timerId)
  totalSeconds = 0
  onTick(totalSeconds)
}

/**
 * Adiciona (ou subtrai, se negativo) minutos ao temporizador.
 * Atualiza a interface imediatamente com onTick.
 * @param {number} minutes
 */
/**
 * Adiciona ou remove minutos, garantindo que o tempo nunca fique negativo.
 * @param {number} minutes - pode ser positivo ou negativo
 */
export function addMinutes(minutes) {
  const newTotal = totalSeconds + minutes * 60

  // Limita o valor entre 0 segundos e 86.400 segundos (24h)
  totalSeconds = Math.max(0, Math.min(newTotal, 86400))

  onTick(totalSeconds)
}