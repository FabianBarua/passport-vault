import { Outlet } from 'react-router-dom'
import { useUserStore } from '../shares/stores/useUserStore'
import { NeedConfig } from './NeedConfig'

export const PrivateRouteConfig = () => {
  const { user, passwordMaster } = useUserStore()
  return (
        <>
            {
                (user?.id && passwordMaster)
                  ? (
                    <Outlet />
                    )
                  : <NeedConfig />
            }
        </>

  )
}
