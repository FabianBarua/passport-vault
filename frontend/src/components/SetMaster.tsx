import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useUserStore } from '../shares/stores/useUserStore'
import { useNavigate } from 'react-router-dom'
import { ButtonHide } from './ButtonHide'
import { Key } from 'lucide-react'

interface PasswordInputInterface {
  id:string
  placeholder:string
  visible?:boolean
}

export const SetMaster = () => {
  const [allInputs, setAllInputs] = useState<PasswordInputInterface[]>([
    { id: 'master', placeholder: 'Llave maestra', visible: false },
    { id: 'confirm', placeholder: 'Confirmar llave maestra', visible: false }
  ])

  const { passwordMaster } = useUserStore()
  const navigate = useNavigate()

  if (passwordMaster) {
    navigate('/')
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.currentTarget)
    const inputs = new FormData(e.currentTarget)
    const master = inputs.get('master')?.toString().trim()
    const confirm = inputs.get('confirm')?.toString().trim()

    if (!master || !confirm || master === '' || confirm === '') {
      toast.error('Ambos campos son requeridos')
      return
    }

    if (master !== confirm) {
      toast.error('Las llaves maestras no coinciden')
      return
    }

    localStorage.setItem('master', master)
    chrome?.storage?.sync?.set({ master })
    useUserStore.setState({ passwordMaster: master })

    toast.success('Llave maestra guardada correctamente')
    navigate('/')
  }

  return (
    <form className="p-8 flex flex-col  gap-2 " onSubmit={handleSave}>
      <header className=" text-center  flex flex-col gap-2  bg-default-100 items-center justify-center  mx-auto border border-default-200 rounded-xl w-full py-4 ">
          <div className=" flex gap-2 justify-center items-center">
            <h1 className="text-2xl font-bold">Llave maestra</h1>
            <Button color='primary' variant='faded' isIconOnly size='sm'><Key size={16} /></Button>
          </div>

        </header>

        <p className="text-small leading-4  text-center my-2 font-normal text-default-400">Las contraseñas guardadas se cifrarán con esta llave maestra, que no se guardará en la base de datos.</p>

        <div className='  gap-2 flex flex-col'>

        {
          allInputs.map((input, i) => (
            <div key={input.id} className="flex gap-2 items-center">
              <Input
                placeholder={input.placeholder}
                endContent={<ButtonHide isVisible={input?.visible || false} setIsVisible={() => {
                  const selectedInput = allInputs[i]
                  const newAll = [...allInputs]
                  newAll[i] = { ...selectedInput, visible: !selectedInput.visible }
                  setAllInputs(newAll)
                }} />}
                id={input.id}
                name={
                  input.id
                }
                type={
                  input.visible
                    ? 'text'
                    : 'password'
                }
              />
            </div>
          ))
        }

        <Button className="  w-full " color='primary' type='submit'>Guardar</Button>
        </div>

    </form>
  )
}
