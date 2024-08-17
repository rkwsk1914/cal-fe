import * as React from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'


import styles from './style.module.scss'


interface BaseProps {
  children: string
  type?: 'prime' | 'dangerous' | 'warning' | 'standard' | 'outline'
  onClick?: () => void
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}

interface SubmitProps extends BaseProps {
  href?: string
  toId?: never
  submit?: boolean
  scrollOption?: never
}

interface LinkProps extends BaseProps {
  href?: string
  toId?: never
  submit?: never
  scrollOption?: never
}

interface ScrollProps extends BaseProps {
  href?: never
  toId?: string
  submit?: never
  scrollOption?: Omit<React.ComponentProps<typeof ScrollLink>, 'to' | 'smooth' | 'ref'>
}

type Props = LinkProps | ScrollProps | SubmitProps;

export const Button: React.FC<Props> = (
  {
    children,
    type,
    href,
    toId,
    submit,
    disabled,
    scrollOption,
    size = 'small',
    onClick
  }
): JSX.Element => {
  const darkClassName = useGetDarkModeStyleClass(styles.button, styles.dark)
  const buttonClassName = clsx(darkClassName, {
    [styles.prime]: type === 'prime',
    [styles.dangerous]: type === 'dangerous',
    [styles.warning]: type === 'warning',
    [styles.standard]: type === 'standard',
    [styles.outline]: type === 'outline',
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
    [styles.disabled]: disabled,
  })

  if (href) return (
    <Link className={buttonClassName} href={href}>
      <span>
        {children}<span className={styles.arrow}>{/*アイコン*/}</span>
      </span>
    </Link>
  )

  if (toId) return (
    <ScrollLink
      className={buttonClassName}
      to={toId}
      smooth
      {...scrollOption}
      onClick={onClick}>
      <span>{children}</span>
    </ScrollLink>
  )

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      <span>{children}</span>
    </button>
  )
}
