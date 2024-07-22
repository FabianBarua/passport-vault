import '@iframe-resizer/child'
// import React, { useEffect, useState } from 'react'
// import { useVaultStore } from '../shares/stores/useVaultStore'
// import { ExternalLink } from 'lucide-react'

// const ButtonPassport = (
//   { email, onClick } : {
//     email: string,
//     onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
//   }) => {
//   return (
//     <button
//     type='button'
//       onClick={onClick}
//     className='w-full transition-colors group/item text-left hover:bg-default-100 p-1 pr-3 justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased  rounded-lg flex gap-3'>

//     <div className="flex flex-col  p-1  pl-3 flex-1 overflow-hidden">
//       <p className="text-small group-hover/item:text-primary text-default-400 text-ellipsis overflow-hidden">
//         Rellenar
//       </p>
//     <p className=" text-[15px] leading-6 text-default-500 group-hover/item:text-default-700  text-ellipsis overflow-hidden">
//       {email}
//     </p>
//     </div>

//       <div className=' size-12 group-hover/item:text-default-600 text-default-400  flex justify-center items-center bg-default-100 border border-default-200 rounded-xl'>
//         <ExternalLink width={16} />
//       </div>
//     </button>
//   )
// }

export const SetPass = () => {
  // const [url, setUrl] = useState<string>('')

  // eslint-disable-next-line no-undef
  // const handleClick = (
  //   {
  //     email,
  //     username,
  //     password
  //   }: {
  //     email?: string,
  //     username?: string,
  //     password?: string
  //   }
  // ) => {
  //   const data = {
  //     email,
  //     username,
  //     password
  //   }
  //   window.parent.postMessage({
  //     type: 'setPass',
  //     data
  //   }, '*')
  // }

  // const getUrlParam = (event: MessageEvent) => {
  //   if (event.data.type === 'websiteUrl') {
  //     setUrl(event.data.url)
  //   }
  // }

  // const { vault } = useVaultStore()

  // const vaultFiltered = vault.filter((password) => password.website === url)

  // useEffect(() => {
  //   // SEND TO PARENT (GET URL)
  //   window.parent.postMessage({
  //     type: 'getWebsiteUrl'
  //   }, '*')

  //   // WHEN THE PARENT SENDS THE URL
  //   window.addEventListener('message', getUrlParam)

  //   return () => {
  //     window.removeEventListener('message', getUrlParam)
  //   }
  // }, [])

  return (
    <form className=" flex flex-col  transition-all bg-default-50 " >
      <p>tests</p>
      {/* {
        vaultFiltered.map((password) => (
          <ButtonPassport
            key={password.id}
            email={password.email || password.username || ''}
            onClick={() => {
              handleClick(
                {
                  email: password.email
                }
              )
            }}
          />
        ))
      } */}
    </form>
  )
}
