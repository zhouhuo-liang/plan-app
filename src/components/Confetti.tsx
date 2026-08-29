import { useMemo } from 'react'

const EMOJIS = ['🎉', '✨', '🎊', '⭐', '💫', '🥳', '🏅', '🌟']

interface Props {
  /** 每自增一次就重新放一轮庆祝（0 表示不显示） */
  trigger: number
}

/** 全屏撒花庆祝（pointer-events 关闭，不挡操作） */
function Confetti({ trigger }: Props) {
  const pieces = useMemo(() => {
    if (trigger <= 0) return []
    return Array.from({ length: 28 }, (_, i) => ({
      id: `${trigger}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.6 + Math.random() * 1.2,
      size: 18 + Math.random() * 20,
      emoji: EMOJIS[i % EMOJIS.length],
    }))
  }, [trigger])

  if (pieces.length === 0) return null

  return (
    <div className="confetti" key={trigger}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

export default Confetti
