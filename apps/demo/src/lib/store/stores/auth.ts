import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean
  isChecking: boolean
}

export type AuthActions = {
  setAuth: (token: string) => void
  setAccessToken: (token: string | null) => void
  clearAuth: () => void
  setChecking: (isChecking: boolean) => void
}

export type AuthStore = AuthState & AuthActions

const getDefaultInitialState = (): AuthState => ({
  accessToken: null,
  isAuthenticated: false,
  isChecking: false,
})

// 全局 store 实例
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...getDefaultInitialState(),
      setAuth: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: !!accessToken,
        }),
      setAccessToken: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: !!accessToken,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
        }),
      setChecking: (isChecking) => set({ isChecking }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!state.accessToken
        }
      },
    },
  ),
)

// 获取 store 实例用于非 React 环境
export const authStore = useAuthStore
