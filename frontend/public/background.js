import { decode } from '../src/shares/utils'

const getMaster = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('master', (data) => {
      resolve(data.master)
    })
  })
}

const getVault = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('vault', (data) => {
      resolve(data.vault)
    })
  })
}

const fetchInitialData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/vault', {
      credentials: 'include'
    })

    if (response.status === 401) {
      throw new Error('Unauthorized')
    }

    const jsonData = await response.json()

    const vault = jsonData?.vault || []

    const master = await getMaster()

    if (!master) {
      throw new Error('Secret key not found')
    }

    const decodedVault = vault.map((item) => {
      return {
        ...item,
        website: decode(item.website, master),
        email: item.email ? decode(item.email, master) : null,
        username: item.username ? decode(item.username, master) : null,
        password: item.password ? decode(item.password, master) : null
      }
    })

    chrome.storage.sync.set({ vault: decodedVault })
  } catch (err) {
    console.error('Error fetching data:', err)

    chrome.storage.sync.set({ user: null })
    chrome.storage.sync.set({ doingLogin: false })
    chrome.storage.sync.set({ master: null })
    chrome.storage.sync.set({ vault: [] })
  }
}

const checkVaultForUrl = async (url) => {
  const vault = await getVault()

  const match = vault.find((item) => item.website === url)

  if (match) {
    console.log('Credentials found:', match)
  } else {
    console.log('No credentials found for this website')
  }

  return match
}

chrome.runtime.onStartup.addListener(() => {
  fetchInitialData()
})
