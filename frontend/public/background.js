import { decode } from '../src/shares/utils'

const getMaster = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('master', (data) => {
      resolve(data.master)
    })
  }
  )
}

chrome.runtime.onStartup.addListener(() => {
  const fetchInitialData = async () => {
    try {
      const data = await fetch('http://localhost:5000/api/v1/vault',
        {
          credentials: 'include'
        }
      )
      const jsonData = await data.json()

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
      }
      )

      chrome?.storage?.sync?.set({ vault: decodedVault })
    } catch (err) {
      console.error('Error fetching data:', err)
      chrome?.storage?.sync?.set({ vault: [] })
    }
  }
  fetchInitialData()
}
)
