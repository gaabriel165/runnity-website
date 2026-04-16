import type { JSX } from 'react'
type ButtonVariant = 'primary' | 'outline'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps): JSX.Element => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 transition-all duration-200 cursor-pointer'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:scale-95',
    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white active:scale-95',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
