/* eslint-disable no-undef */
import { create } from 'zustand'
import { useUserStore } from './useUserStore'
import { decode, encode } from '../utils'

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
    getVault: ({
      needDecode
    }: {
        needDecode: boolean
    }) => void
    addVault: (vault: Vault) => void
}

const addVault = (
  { website, email, username, password, favorite } : Vault
) => {
  const secretKey = useUserStore.getState().passwordMaster || ''
  if (!secretKey) return

  const encodedData = {
    email: email ? encode(email, secretKey) : null,
    username: username ? encode(username, secretKey) : null,
    password: password ? encode(password, secretKey) : null,
    website: encode(website, secretKey),
    favorite
  }

  // make a fetch to the backend, gets the data and update the store
  console.log('encodedData', encodedData)
}

const getVault = async (
  { needDecode }:{
    needDecode:boolean
  }
) => {
  try {
    const data = await fetch('http://localhost:5000/api/v1/vault', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const { vault } = await data.json()

    if (!needDecode) {
      useVaultStore.setState({ vault })
      return
    }

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

    useVaultStore.setState({ vault: jsonDecoded })
  } catch (error) {
    console.error('error', error)
  }
}

export const decodeVault = (vault: Vault[], secretKey: string) => {
  const decodedVault = vault.map((item: Vault) => {
    const website = decode(item.website, secretKey)
    const email = item.email ? decode(item.email, secretKey) : ''
    const username = item.username ? decode(item.username, secretKey) : ''
    const password = item.password ? decode(item.password, secretKey) : ''

    return {
      ...item,
      website,
      email,
      username,
      password
    }
  })

  useVaultStore.setState({ vault: decodedVault })
}

export const useVaultStore = create<VaultStore>(() => ({
  vault: [],
  getVault: ({ needDecode }:{
    needDecode:boolean
  }) => { getVault({ needDecode }) },
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
