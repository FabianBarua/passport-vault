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
  chrome?.storage?.sync?.get?.('user', (data) => {
    if (data.user) {
      useUserStore.setState({ user: data.user })
    }
  })
}

const getInitialDoingLogin = () => {
  chrome?.storage?.sync?.get?.('doingLogin', (data) => {
    if (data.doingLogin) {
      useUserStore.setState({ doingLogin: data.doingLogin })
    }
  })
}

const getInitialPasswordMaster = () => {
  chrome?.storage?.sync?.get?.('master', (data) => {
    if (data.master) {
      useUserStore.setState({ passwordMaster: data.master })
    }
  })
}

const verifyLogin = async () => {
  const response = await fetch(
    'http://localhost:5123/api/v1/auth/user',
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
  doingLogin: false,
  user: {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    googleId: '',
    picture: '',
    createdAt: '',
    updatedAt: ''
  },
  passwordMaster: null,

  checkLogin: async () => {
    const data = await verifyLogin()
    set({ user: data, doingLogin: false })

    chrome?.storage?.sync?.set({ user: data })

    chrome?.storage?.sync?.set({ doingLogin: false })
    return data
  },
  logout: () => {
    set({ user: null, doingLogin: false, passwordMaster: null })

    fetch('http://localhost:5123/api/v1/auth/logout', {
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

    chrome?.storage?.sync?.set({ doingLogin: state.doingLogin })

    chrome?.storage?.sync?.set({ master: state.passwordMaster })
  }
)

getInitialUser()
getInitialDoingLogin()
getInitialPasswordMaster()
