import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from '../shares/stores/useUserStore'

const PrivateRoutes = () => {
    const {user} = useUserStore()
    
    return(
        user?.id ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes