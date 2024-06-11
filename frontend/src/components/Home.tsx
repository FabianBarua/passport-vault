import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { useUserStore } from '../shares/stores/useUserStore'

export const Home = () => {
  const {logout} = useUserStore()
  const navigate = useNavigate()
    
    const handleClick = () => {
        logout()
        navigate("/login")
    }

  return <div className=' flex flex-col h-96'>
      <div className=' flex-1 '>
        <h1>Home</h1>
      </div>
      <Button onClick={handleClick} color='danger' size='sm' variant='faded'>Logout</Button>
  </div>
}