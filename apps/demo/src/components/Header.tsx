'use client'

import styles from './header.module.css'

import { useAuth } from '@/hooks/useAuth'

import ActiveLink from '@/components/ActiveLink'

export default function Header() {
  const { data: session, status, logout } = useAuth() // 服务端组件中无法使用 useAuth
  const loading = status === 'loading'

  return (
    <header>
      <noscript>
        <style>{`.no-js-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`no-js-show ${!session && loading ? styles.loading : styles.loaded}`}>
          {!session && (
            <>
              <span className={styles.notSignedInText}>当前未登录</span>
              <ActiveLink href="/login" className={styles.buttonPrimary}>
                登录
              </ActiveLink>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span style={{ backgroundImage: `url('${session.user.image}')` }} className={styles.avatar} />
              )}
              <span className={styles.signedInText}>
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <button className={styles.button} onClick={logout}>
                退出
              </button>
            </>
          )}
        </p>
      </div>
      <nav className="m-2 flex font-bold">
        <ul className={styles.navItems}>
          <li>
            <ActiveLink activeClassName="active" href="/">
              Home
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/about">
              About
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/blog">
              Blog
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/dynamic">
              Dynamic Route
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/lang/en">
              Lang
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/img">
              nextImage
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
