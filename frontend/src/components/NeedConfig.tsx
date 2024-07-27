import { Button, Image } from '@nextui-org/react'
const closeFrame = () => {
  window.parent.postMessage({
    type: 'closeFrame'
  }, '*')
}
export const NeedConfig = () => {
  const handleClose = async () => {
    closeFrame()
  }

  const handleLogin = async () => {
    closeFrame()
    const indexPageUrl = chrome.runtime.getURL('index.html')
    chrome.tabs.create({ url: indexPageUrl })
  }

  return (
    <div className=' p-2  flex gap-3 justify-center '>
      <Image
        radius='md'
        className=' w-24 h-full'
        src='/needConfig.png'
      />
      <div className='   flex-1 flex flex-col  '>
        <h1 className=' text-primary-500  text-lg '>Necesitas Configurar </h1>
        <p className=' font-light  text-default-500  text-sm  leading-4'>
          Necesitas configurar tu usuario y contraseña maestra
        </p>
        <div className=' h-full items-end w-full flex gap-2 justify-end'>
        <Button
          color='primary'
          onClick={handleLogin}
          className=' w-min'
          size='sm'
          variant='ghost'
        >
          Login
        </Button>
        <Button
          color='primary'
          onClick={handleClose}
          className=' w-min'
          size='sm'
        >
          Cerrar
        </Button>
        </div>
      </div>
    </div>
  )
}
