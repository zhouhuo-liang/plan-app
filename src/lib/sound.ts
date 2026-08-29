// 短促提示音（专注结束 / 休息结束）。用 Web Audio 合成，不依赖音频文件。
let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  try {
    if (ctx == null) ctx = new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export function beep(): void {
  const audio = getCtx()
  if (audio == null) return
  try {
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.connect(gain)
    gain.connect(audio.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, audio.currentTime)
    gain.gain.setValueAtTime(0.25, audio.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.5)
    osc.start()
    osc.stop(audio.currentTime + 0.5)
  } catch {
    // 忽略自动播放策略等异常
  }
}
