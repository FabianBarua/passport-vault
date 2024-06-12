import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { useUserStore } from '../shares/stores/useUserStore'

export const Account = () => {
  const { logout } = useUserStore()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  return (

            <div className=' flex-1  h-full w-full flex flex-col relative gap-2 justify-center items-center p-3'>
                <h1>Account</h1>
                <Button onClick={handleClick} color='danger' className=' bottom-3 absolute w-[96%]' variant='faded'>Logout</Button>

            </div>

  )
}
