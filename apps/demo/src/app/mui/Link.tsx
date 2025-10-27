import * as React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
  to: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { to, linkAs, replace, scroll, shallow, prefetch, legacyBehavior = false, locale, ...other } = props

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        legacyBehavior={legacyBehavior}
        ref={ref}
        {...other}
      />
    )
  },
)

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as'] // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    legacyBehavior,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props

  const cur_pathname = usePathname()
  const pathname = typeof href === 'string' ? href : href.pathname

  const className = clsx(classNameProps, {
    [activeClassName]: cur_pathname === pathname && activeClassName,
  })

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} {...other} ref={ref} />
    }

    return <MuiLink className={className} href={href} {...other} ref={ref} />
  }

  const linkAs = linkAsProp || as
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior,
    locale,
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} {...nextjsProps} {...other} ref={ref} />
  }

  return <MuiLink component={NextLinkComposed} className={className} {...nextjsProps} {...other} ref={ref} />
})

export default Link
