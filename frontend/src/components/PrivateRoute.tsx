import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useUserStore } from '../shares/stores/useUserStore'
import { HomeIcon, BookCheckIcon, User2Icon } from 'lucide-react'
import { ReactNode } from 'react'
import { Tooltip } from '@nextui-org/react'

const ALL_PATHS = [
  {
    id: 1,
    icon: <HomeIcon size={20} />,
    text: 'Inicio',
    path: '/'
  },
  {
    id: 2,
    icon: <BookCheckIcon size={20} />,
    text: 'Generador',
    path: '/gen'
  },
  {
    id: 3,
    icon: <User2Icon size={20} />,
    text: 'Cuenta',
    path: '/account'
  }
]

const FooterButton = ({ icon, text, onClick, path }: { icon: ReactNode, text: string, onClick: () => void, path: string }) => {
  return (
    <Tooltip showArrow={true} content={text} offset={0} delay={2000}>

        <button onClick={
            () => {
              onClick()
            }

        } className={`
        ${window.location.hash.split('#')[1] === path ? ' bg-default-50/80' : ' '
            }
          transition-colors hover:bg-default-50/60 text-default-400 rounded-2xl h-10 w-full flex justify-center items-center`}>
            {icon}
        </button>

    </Tooltip>

  )
}

const PrivateRoutes = () => {
  const { user, passwordMaster } = useUserStore()
  const navigate = useNavigate()
  // passwordMaster cant be null
  return (
        <>

            {
                user?.id
                  ? (
                    <div className=' flex flex-col  h-[35rem] '>
                        <div
                        style={{
                          height: 'calc(35rem - 56px)'
                        }}
                        className='  w-full flex flex-col '>
                            {
                              passwordMaster ? <Outlet /> : <Navigate to="/set-master" />
                            }
                        </div>
                        <div className=" w-full bg-default-100 h-[56px] flex justify-stretch items-center p-2 gap-2 rounded-t-2xl">
                            {ALL_PATHS.map((path) => (
                                <FooterButton key={path.id} icon={path.icon} text={path.text} onClick={() => navigate(path.path)} path={path.path} />
                            ))}
                        </div>
                    </div>
                    )
                  : <Navigate to="/login" />
            }

        </>

  )
}

export default PrivateRoutes
