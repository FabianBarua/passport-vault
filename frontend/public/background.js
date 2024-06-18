// fetch data whe start chrome and save to local storage and to sync storage
chrome.runtime.onStartup.addListener(() => {
  const fetchInitialData = async () => {
    try {
      const data = await fetch('http://localhost:5000/api/v1/vault')
      const jsonData = await data.json()
      const vault = jsonData?.vault || []
      chrome?.storage?.sync?.set({ vault })
      console.log('Data fetched and saved to storage')
      console.log('Data:', vault)
    } catch (err) {
      console.error('Error fetching data:', err)
      chrome?.storage?.sync?.set({ vault: [] })
    }
  }
  fetchInitialData()
}
)
