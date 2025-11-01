'use server'

import { cookies } from 'next/headers'
import { importSPKI, jwtVerify } from 'jose'

export async function authenticateUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  return await response.json()
}

const getPublicKey = async () => {
  const publicKeyPem = process.env.JWT_PUBLIC_KEY
  if (!publicKeyPem) {
    throw new Error('JWT_PUBLIC_KEY environment variable is required')
  }
  return await importSPKI(publicKeyPem, 'RS256')
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const publicKey = await getPublicKey()
    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ['RS256'],
      // issuer: 'https://auth.xuejiai.com',
      // audience: 'quarkus-starter',
    })
    console.log('JWT verification succeeded:', payload)

    return {
      id: payload.sub as string,
      username: payload.upn as string,
      email: payload.email as string,
      nickname: payload.nickname as string,
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}
