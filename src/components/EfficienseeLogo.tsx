import efficienseePng from '../assets/Efficiensee.png'

interface Props {
  size?: number
  className?: string
}

export default function EfficienseeLogo({ size = 36, className }: Props) {
  return (
    <img
      src={efficienseePng}
      alt="Efficiensee"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', mixBlendMode: 'screen', display: 'block', flexShrink: 0 }}
    />
  )
}
