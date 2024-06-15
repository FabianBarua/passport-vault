import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useUserStore } from '../shares/stores/useUserStore'
import { useNavigate } from 'react-router-dom'
import { ButtonHide } from './ButtonHide'

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
    }

    localStorage.setItem('master', master)
    chrome?.storage?.sync?.set({ master })
    useUserStore.setState({ passwordMaster: master })

    toast.success('Llave maestra guardada correctamente')
    navigate('/')
  }

  return (
    <form className="p-4" onSubmit={handleSave}>
      <header className="flex py-4 flex-initial text-large font-semibold flex-col items-center gap-1 px-0 text-center" id=":r2:">
        <h1 className="text-xl">Ingresar llave maestra</h1>
        <p className="text-small font-normal text-default-500">Las contraseñas guardadas se cifrarán con esta llave maestra, que no se guardará en la base de datos.</p>
      </header>
        <div className=' gap-2 flex flex-col'>

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

        </div>

        <Button className="" color='primary' type='submit'>Guardar</Button>

    </form>
  )
}
