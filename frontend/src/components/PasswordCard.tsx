import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Copy, ExternalLink, Lock, Menu, Pencil, RectangleEllipsis, Trash2, User } from 'lucide-react'
import { toast } from 'sonner'
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export const PasswordCard = ({
  email,
  password,
  website
}: {
    email: string
    password: string
    website: string
  }) => {
  return (
   <>
      <div className='w-full hover:bg-default-100 p-1 justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-l-large rounded-r-lg flex gap-3'>
        <div className=' size-12 flex justify-center items-center bg-default-100 border border-default-200 rounded-xl'>
          <Lock width={16} />
        </div>
        <div className="flex flex-col  overflow-hidden">
          <p className=" text-[15px] leading-6 text-ellipsis overflow-hidden">{email}</p>
          <p className="text-small text-default-500 text-ellipsis overflow-hidden">{website}</p>
        </div>
        <div className=' flex-1 flex gap-2 justify-end'>
          <Dropdown backdrop='blur'>
            <DropdownTrigger>

              <Button variant='light' className=' border-0 text-default-500' isIconOnly > <Copy width={16} /> </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Static Actions">
              <DropdownItem
                startContent={
                    <User width={16} />
                }
                onClick={
                  () => {
                    copyToClipboard(email)
                    toast.success('Usuario copiado')
                  }
                }
                key="user">Copiar Usuario</DropdownItem>
              <DropdownItem
              startContent={
                <RectangleEllipsis width={16} />
              }
                onClick={
                  () => {
                    copyToClipboard(password)
                    toast.success('Contraseña copiada')
                  }
                }
                key="pass">Copiar Contraseña</DropdownItem>
            </DropdownMenu>

          </Dropdown>
          <Dropdown backdrop='blur'>

            <DropdownTrigger>
              <Button variant='light' className=' border-0 text-default-500' isIconOnly > <Menu width={16} /> </Button>

            </DropdownTrigger>

            <DropdownMenu aria-label='Menu Actions'>
              <DropdownItem key="open" startContent={
                <ExternalLink width={16} />
              }>Abrir</DropdownItem>
              <DropdownItem key="edit"
              startContent={
                <Pencil width={16} />
              }
              >Editar</DropdownItem>
              <DropdownItem
              startContent={
                <Trash2 width={16} />
              }
              key="delete" className="text-danger" color="danger">
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      </>

  )
}
