import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
        <>

            <div className='flex w-[24rem] flex-col gap-1  bg-default-50   shadow-small' >
                <Outlet />
            </div>

        </>

  )
}
