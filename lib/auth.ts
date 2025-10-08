"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  register: (email: string, password: string, name?: string) => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        console.log("🔐 Iniciando login para:", email)
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication
        const user = {
          id: "1",
          email,
          name: email.split("@")[0],
        }

        console.log("✅ Login bem-sucedido, definindo estado:", { user, isAuthenticated: true })
        set({ user, isAuthenticated: true })
        
        // Verificar se foi salvo
        setTimeout(() => {
          const stored = localStorage.getItem("auth-storage")
          console.log("💾 Estado salvo no localStorage:", stored)
          
          // Verificar se o cookie foi criado
          const cookies = document.cookie
          console.log("🍪 Todos os cookies:", cookies)
          console.log("🔍 Cookie auth-storage específico:", document.cookie.split(';').find(c => c.includes('auth-storage')))
        }, 100)
      },
      loginWithGoogle: async () => {
        // Simulate Google OAuth
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = {
          id: "1",
          email: "user@gmail.com",
          name: "Google User",
        }

        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      register: async (email: string, password: string, name?: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = {
          id: "1",
          email,
          name: name || email.split("@")[0],
        }

        set({ user, isAuthenticated: true })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
