'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark-secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_1px_2px_rgba(0,0,0,0.12)] glow-blue',
  secondary:
    'border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50',
  ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50',
  'dark-secondary':
    'border border-white/15 text-zinc-200 hover:border-white/30 hover:bg-white/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const inner = (
    <motion.span
      className="contents"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.12 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {inner}
    </button>
  )
}
