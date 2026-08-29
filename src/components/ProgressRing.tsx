import type { ReactNode } from 'react'

interface Props {
  /** 0~1 完成度 */
  progress: number
  size?: number
  strokeWidth?: number
  children?: ReactNode
}

function ProgressRing({ progress, size = 128, strokeWidth = 12, children }: Props) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, progress))
  const offset = circumference * (1 - clamped)

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle
          className="ring-track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-center">{children}</div>
    </div>
  )
}

export default ProgressRing
