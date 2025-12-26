'use client'

import styles from './header.module.css'
import { useEffect, useState } from 'react'

import { useAuth, useUserQuery } from '@/lib/auth'
import ActiveLink from '@/components/ActiveLink'

export default function Header() {
  const { isAuthenticated, logout, isChecking } = useAuth() // 服务端组件中无法使用 useAuth
  const { data: user, isLoading: loadingUser } = useUserQuery()
  const [isLoading, setIsLoading] = useState(true)

  // TODO 模拟 isLoading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <header>
      <noscript>
        <style>{`.no-js-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`no-js-show ${!user && (isChecking || loadingUser) ? styles.loading : styles.loaded}`}>
          {!isAuthenticated && (
            <>
              <span className={styles.notSignedInText}>当前未登录</span>
              <ActiveLink activeClassName="active" href="/login" className={styles.buttonPrimary}>
                登录
              </ActiveLink>
            </>
          )}
          {user && (
            <>
              {user.avatar && <span style={{ backgroundImage: `url('${user.avatar}')` }} className={styles.avatar} />}
              <span className={styles.signedInText}>
                <strong>{user.email ?? user.nickname}</strong>
              </span>
              <button className={styles.button} onClick={() => logout()}>
                退出
              </button>
            </>
          )}
        </p>
      </div>
      <nav className="m-2 font-bold">
        <ul className="flex list-none space-x-6">
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
