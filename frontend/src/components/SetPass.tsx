import '@iframe-resizer/child'
import { useEffect, useState } from 'react'
import { useVaultStore } from '../shares/stores/useVaultStore'

export const SetPass = () => {
  const [url, setUrl] = useState<string>('')

  // eslint-disable-next-line no-undef
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = {
      email: 'valor1',
      username: 'valor2',
      password: 'valor2'
    }
    window.parent.postMessage({
      type: 'setPass',
      data
    }, '*')
  }

  const getUrlParam = (event: MessageEvent) => {
    if (event.data.type === 'websiteUrl') {
      setUrl(event.data.url)
    }
  }

  const { vault } = useVaultStore()

  const vaultFiltered = vault.filter((password) => password.website === url)

  useEffect(() => {
    // SEND TO PARENT (GET URL)
    window.parent.postMessage({
      type: 'getWebsiteUrl'
    }, '*')

    // WHEN THE PARENT SENDS THE URL
    window.addEventListener('message', getUrlParam)

    return () => {
      window.removeEventListener('message', getUrlParam)
    }
  }, [])

  return (
    <form className="p-8 flex flex-col  gap-2 transition-all " >
      <h1 className="text-2xl font-bold text-default-900" >{url}</h1>
      {
        vaultFiltered.map((password) => (
          <div key={password.id} className="flex flex-col gap-2">
            <label className="text-default-500" >Email</label>
            <input className="input" type="email" value={password.email} />
            <label className="text-default-500" >Username</label>
            <input className="input" type="text" value={password.username} />
            <label className="text-default-500" >Password</label>
            <input className="input" type="text" value={password.password} />
          </div>
        ))
      }
    </form>
  )
}
