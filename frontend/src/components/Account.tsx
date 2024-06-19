import { useVaultStore } from '../shares/stores/useVaultStore'
import { useUserStore } from '../shares/stores/useUserStore'
import { ButtonHide } from '../components/ButtonHide'
import React, { useState } from 'react'
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Account = () => {
  const { logout } = useUserStore()
  const navigate = useNavigate()
  const { vault } = useVaultStore()
  const { user, passwordMaster } = useUserStore()
  const [hideMaster, setHideMaster] = useState(true)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  const handleSaveMaster = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Make a method to save the master password, encode (local) all passwords with the new master password and send to the server (/api/v1/vault/update-master) post, max 2 changes per month
  }

  return (

<>

<Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
<ModalContent className=' w-64'>
  <ModalHeader>Atencion</ModalHeader>
  <ModalBody>
    <p className=' text-sm text-balance'>
      Esta funcionalidad esta en desarrollo, por favor <strong>memoriza tu llave maestra actual</strong>.
    </p>
  </ModalBody>
  <ModalFooter>
    <Button
      color="primary"

      onClick={onOpenChange}
    >
      Aceptar
    </Button>
  </ModalFooter>
</ModalContent>
</Modal>

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
                      <Button disabled className='' type='submit' variant='faded'
                        onPress={
                          onOpen
                        }
                      >Actualizar</Button>
                    </form>

                      <pre className=' h-full overflow-auto'>
                        {
                          JSON.stringify(vault, null, 2)
                        }
                      </pre>

                </div>
                <Button onClick={handleClick} color='danger' className=' bottom-3 -translate-x-1/2 left-1/2 absolute w-[calc(100%-32px)]' variant='faded'>Logout</Button>
            </motion.div>

</>

  )
}
