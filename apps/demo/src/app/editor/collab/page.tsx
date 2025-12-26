'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from '@/routes'
import { LexicalCollaboration } from '@lexical/react/LexicalCollaborationContext'
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { Provider } from '@lexical/yjs'
import * as Y from 'yjs'

import ExampleTheme from '@/lib/editor/ExampleTheme'

import Editor from './Editor'
import { getRandomUserProfile, UserProfile } from './getRandomUserProfile'
import { createWebRTCProvider, createWebsocketProvider } from './providers'

interface ActiveUserProfile extends UserProfile {
  userId: number
}

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: 'React.js Collab Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error
  },
  // The editor theme
  theme: ExampleTheme,
}

export default function App() {
  const searchParams = useSearchParams()
  // 协作模式选择:
  // webrtc (默认) - 适用于同一网络/局域网内的协作，P2P 直连，低延迟，无需服务器
  // wss - 适用于跨网络/互联网协作，需要 WebSocket 服务器中转，支持更多用户
  const providerName = searchParams.get('provider') ?? 'webrtc'
  const [userProfile, setUserProfile] = useState(() => getRandomUserProfile())
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [yjsProvider, setYjsProvider] = useState<null | Provider>(null)
  const [connected, setConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState<ActiveUserProfile[]>([])
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  const handleAwarenessUpdate = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const awareness = yjsProvider!.awareness!
    setActiveUsers(
      Array.from(awareness.getStates().entries()).map(([userId, { color, name }]) => ({
        color,
        name,
        userId,
      })),
    )
  }, [yjsProvider])

  const handleConnectionToggle = () => {
    if (yjsProvider == null) {
      return
    }
    if (connected) {
      yjsProvider.disconnect()
    } else {
      yjsProvider.connect()
    }
  }

  // 检查 WebSocket 服务器状态
  useEffect(() => {
    if (providerName === 'webrtc') {
      setServerStatus('online')
      return
    }

    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:1234')
        setServerStatus(response.ok ? 'online' : 'offline')
      } catch {
        setServerStatus('offline')
      }
    }

    checkServer()
    const interval = setInterval(checkServer, 5000) // 每5秒检查一次

    return () => clearInterval(interval)
  }, [providerName])

  useEffect(() => {
    if (yjsProvider == null) {
      return
    }

    yjsProvider.awareness.on('update', handleAwarenessUpdate)

    return () => yjsProvider.awareness.off('update', handleAwarenessUpdate)
  }, [yjsProvider, handleAwarenessUpdate])

  const providerFactory = useCallback(
    (id: string, yjsDocMap: Map<string, Y.Doc>) => {
      const provider =
        providerName === 'webrtc' ? createWebRTCProvider(id, yjsDocMap) : createWebsocketProvider(id, yjsDocMap)
      provider.on('status', (event) => {
        setConnected(
          // Websocket provider
          event.status === 'connected' ||
            // WebRTC provider has different approact to status reporting
            ('connected' in event && event.connected === true),
        )
      })

      // This is a hack to get reference to provider with standard CollaborationPlugin.
      // To be fixed in future versions of Lexical.
      setTimeout(() => setYjsProvider(provider), 0)

      return provider
    },
    [providerName],
  )

  return (
    <div ref={containerRef}>
      <p>
        <b>Used provider:</b>{' '}
        {providerName === 'webrtc'
          ? 'WebRTC (within browser communication via BroadcastChannel fallback, unless run locally)'
          : 'Websockets (cross-browser communication)'}
        <br />
        {providerName === 'webrtc' ? (
          <Link href="/editor/collab?provider=wss">切换到 WebSocket 模式</Link>
        ) : (
          <Link href="/editor/collab">切换到 WebRTC 模式</Link>
        )}{' '}
        {/* WebRTC provider doesn't implement disconnect correctly */}
        {providerName !== 'webrtc' ? (
          <button onClick={handleConnectionToggle}>{connected ? 'Disconnect' : 'Connect'}</button>
        ) : null}
      </p>

      {/* 服务器状态提示 */}
      {providerName === 'wss' && (
        <div
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            backgroundColor: serverStatus === 'online' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${serverStatus === 'online' ? '#c3e6cb' : '#f5c6cb'}`,
            color: serverStatus === 'online' ? '#155724' : '#721c24',
          }}>
          <b>WebSocket 服务器状态:</b> {serverStatus === 'checking' && '检查中...'}
          {serverStatus === 'online' && '✅ 在线 (ws://localhost:1234)'}
          {serverStatus === 'offline' && (
            <>
              ❌ 离线 - 请先启动服务器:
              <br />
              <code style={{ backgroundColor: '#f1f1f1', padding: '2px 4px', borderRadius: '2px' }}>
                pnpm server:ws
              </code>
            </>
          )}
        </div>
      )}
      <p>
        <b>My Name:</b>{' '}
        <input
          type="text"
          value={userProfile.name}
          onChange={(e) => setUserProfile((profile) => ({ ...profile, name: e.target.value }))}
        />{' '}
        <input
          type="color"
          value={userProfile.color}
          onChange={(e) => setUserProfile((profile) => ({ ...profile, color: e.target.value }))}
        />
      </p>
      <p>
        <b>Active users:</b>{' '}
        {activeUsers.map(({ name, color, userId }, idx) => (
          <Fragment key={userId}>
            <span style={{ color }}>{name}</span>
            {idx === activeUsers.length - 1 ? '' : ', '}
          </Fragment>
        ))}
      </p>
      <LexicalCollaboration>
        <LexicalComposer initialConfig={editorConfig}>
          {/* With CollaborationPlugin - we MUST NOT use @lexical/react/LexicalHistoryPlugin */}
          <CollaborationPlugin
            id="lexical/react-rich-collab"
            providerFactory={providerFactory}
            // Unless you have a way to avoid race condition between 2+ users trying to do bootstrap simultaneously
            // you should never try to bootstrap on client. It's better to perform bootstrap within Yjs server.
            shouldBootstrap={false}
            username={userProfile.name}
            cursorColor={userProfile.color}
            cursorsContainerRef={containerRef}
          />
          <Editor />
        </LexicalComposer>
      </LexicalCollaboration>
    </div>
  )
}
