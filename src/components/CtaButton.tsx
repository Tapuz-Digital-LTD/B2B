import type { ReactNode } from 'react'

type CtaButtonProps = {
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** Every marketing CTA scrolls smoothly to the leads form (present on both pages). */
export default function CtaButton({ className = '', onClick, children }: CtaButtonProps) {
  return (
    <a
      href="#leads-form"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('leads-form')?.scrollIntoView({ behavior: 'smooth' })
        onClick?.()
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  )
}
