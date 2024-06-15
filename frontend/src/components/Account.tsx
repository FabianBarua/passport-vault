import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useUserStore } from '../shares/stores/useUserStore'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ButtonHide } from './ButtonHide'
import { toast } from 'sonner'

export const Account = () => {
  const { logout } = useUserStore()
  const navigate = useNavigate()

  const { user, passwordMaster } = useUserStore()
  const [hideMaster, setHideMaster] = useState(true)

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  const handleSaveMaster = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputs = new FormData(e.currentTarget)
    const master = inputs.get('master')?.toString().trim()
    if (master === passwordMaster) {
      toast.error('La llave maestra nueva no puede ser igual a la actual')
      return
    }
    if (!master || master === '') {
      toast.error('Ambos campos son requeridos')
      return
    }

    useUserStore.setState({ passwordMaster: master })

    toast.success('Llave maestra guardada correctamente')
  }

  return (

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}

            className=' flex-1  h-full w-full flex flex-col relative  gap-3  '>
                <div className='  px-4 pt-4'>
                    <h1 className=' text-2xl font-bold'>Cuenta</h1>
                    <p className=' text-default-500 text-base'>Bienvenido {user?.email}</p>
                </div>
                <div className=' w-full h-[calc(100%-150px)] px-4 '>
                    <form onSubmit={handleSaveMaster} className=' flex gap-2 items-end  w-full'>
                      <div className=' w-full'>
                      <label className=' text-default-400 '>Llave Maestra</label>
                      <Input
                        type={hideMaster ? 'password' : 'text'}
                        defaultValue={passwordMaster || ''}
                        name='master'
                        endContent={
                        <ButtonHide isVisible={!hideMaster} setIsVisible={setHideMaster} />
                      }
                      >
                      </Input>
                      </div>
                      <Button className='' type='submit' variant='faded'>Actualizar</Button>
                    </form>
                </div>
                <Button onClick={handleClick} color='danger' className=' bottom-3 -translate-x-1/2 left-1/2 absolute w-[calc(100%-32px)]' variant='faded'>Logout</Button>
            </motion.div>

  )
}
