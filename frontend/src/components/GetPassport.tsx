import { ExternalLink } from 'lucide-react'
import { useVaultStore } from '../shares/stores/useVaultStore'
import { useSearchParams } from 'react-router-dom'
import '@iframe-resizer/child'

const ButtonPassport = (
  { email, onClick } : {
    email: string,
    onClick: () => void
  }) => {
  return (
    <button
      onClick={onClick}
    className='w-full transition-colors group/item text-left hover:bg-default-100 p-1 justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-l-large rounded-r-lg flex gap-3'>

    <div className="flex flex-col  p-1  pl-3 flex-1 overflow-hidden">
      <p className="text-small group-hover/item:text-primary text-default-400 text-ellipsis overflow-hidden">
        Rellenar
      </p>
    <p className=" text-[15px] leading-6 text-default-500 group-hover/item:text-default-700  text-ellipsis overflow-hidden">
      {email}
    </p>
    </div>

      <div className=' size-12 group-hover/item:text-default-600 text-default-400  flex justify-center items-center bg-default-100 border border-default-200 rounded-xl'>
        <ExternalLink width={16} />
      </div>
    </button>
  )
}

export const GetPassport = () => {
  const [searchParams] = useSearchParams()
  const { vault } = useVaultStore()
  const url = searchParams.get('url')
  const passports = vault.filter((item) => item.website.includes(url || ''))
  console.log('passports', passports)

  const handleClick = () => {
    chrome?.runtime?.sendMessage({ type: 'eventoEjemplo', data: 'Información del evento' })
  }

  return (
        <div className=''>
          {
            JSON.stringify(passports, null, 2)
          }
          {
            passports.map(
              (passport, i) => (
                <ButtonPassport
                  key={passport.id + '- ' + i.toString() + '-ButtonPassport'}
                  email={passport.email || passport.username || ''}
                  onClick={handleClick}
                />
              )
            )
          }
        </div>
  )
}
