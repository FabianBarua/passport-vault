/* eslint-disable no-undef */
import { create } from 'zustand'

export interface User {
    id: number
    fullName: string
    email: string
    password: string | null
    googleId: string
    picture: string
    createdAt: string
    updatedAt: string
}

export interface UserStore {
    doingLogin: boolean;
    user: User | null;
    passwordMaster: string | null;
    checkLogin: () => Promise<User | null>;
    logout: () => void;
}

const getInitialUser = () => {
  const userLocal = localStorage.getItem('user')
  return userLocal ? JSON.parse(userLocal) : null
}

const getInitialDoingLogin = () => {
  const doingLoginLocal = localStorage.getItem('doingLogin')
  return doingLoginLocal ? JSON.parse(doingLoginLocal) : false
}

const getInitialPasswordMaster = () => {
  const passwordMasterLocal = JSON.parse(localStorage.getItem('master') || 'null')
  return passwordMasterLocal || null
}

const verifyLogin = async () => {
  const response = await fetch(
    'http://localhost:5000/api/v1/auth/user',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  )
  const data : User | null = await response.json()
  return data?.id ? data : null
}

export const useUserStore = create<UserStore>((set) => ({
  doingLogin: getInitialDoingLogin(),
  user: getInitialUser(),
  passwordMaster: getInitialPasswordMaster(),
  checkLogin: async () => {
    const data = await verifyLogin()
    set({ user: data, doingLogin: false })

    chrome?.storage?.sync?.set({ user: data })
    window.localStorage.setItem('user', JSON.stringify(data))

    chrome?.storage?.sync?.set({ doingLogin: false })
    window.localStorage.setItem('doingLogin', JSON.stringify(false))
    return data
  },
  logout: () => {
    set({ user: null, doingLogin: false, passwordMaster: null })

    fetch('http://localhost:5000/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }
}))

useUserStore.subscribe(
  (state) => {
    chrome?.storage?.sync?.set({ user: state.user })
    window.localStorage.setItem('user', JSON.stringify(state.user))

    chrome?.storage?.sync?.set({ doingLogin: state.doingLogin })
    window.localStorage.setItem('doingLogin', JSON.stringify(state.doingLogin))

    chrome?.storage?.sync?.set({ master: state.passwordMaster })
    window.localStorage.setItem('master', JSON.stringify(state.passwordMaster))
  }
)
