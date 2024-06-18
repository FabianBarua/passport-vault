/* eslint-disable no-undef */
import { create } from 'zustand'
import { useUserStore } from './useUserStore'
import { decode } from '../utils'

export interface Vault {
    id: number
    website: string
    email?: string
    username?: string
    password?: string
    favorite: boolean
}

export interface VaultStore {
    vault: Vault[]
    refreshVault: (vault: Vault) => void
    addVault: (vault: Vault) => void
}

const addVault = (
  { website, email, username, password, favorite } : Vault
) => {
  const secretKey = useUserStore.getState().passwordMaster || ''
  if (!secretKey) return

  const encodedData = {
    website,
    email,
    username,
    password,
    favorite
  }

  console.log('encodedData', encodedData)
}

const refreshVault = async () => {
  try {
    const data = await fetch('http://localhost:5000/api/v1/vault', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const { vault } = await data.json()
    const secretKey = useUserStore.getState().passwordMaster || ''

    const jsonDecoded : Vault[] = vault.map((item: Vault) => {
      const email = item.email ? decode(item.email, secretKey) : ''
      const username = item.username ? decode(item.username, secretKey) : ''
      const password = item.password ? decode(item.password, secretKey) : ''

      return {
        ...item,
        email,
        username,
        password
      }
    }
    )

    console.log('jsonDecoded', jsonDecoded)

    useVaultStore.setState({ vault: jsonDecoded })
  } catch (error) {
    console.error('error', error)
  }
}

export const useVaultStore = create<VaultStore>(() => ({
  vault: [],
  refreshVault,
  addVault: (vault) => { addVault(vault) }
}))

useVaultStore.subscribe(
  (state) => {
    chrome?.storage?.sync?.set({ vault: state.vault })
  }
)

const getInitialVault = async () => {
  return new Promise((resolve) => {
    chrome?.storage?.sync?.get('vault', (data) => {
      resolve(data?.vault || [])
    })
  })
}

getInitialVault().then((value: unknown) => {
  useVaultStore.setState({ vault: value as Vault[] })
})
