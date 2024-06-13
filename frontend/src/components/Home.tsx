import { Button, Input, Image, ScrollShadow } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Plus, FolderOpen, Copy, Menu, Lock } from 'lucide-react'

const PasswordCard = ({
  email,
  website
}: {
  email: string
  website: string
}) => {
  return (
    <div className='p-3w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex gap-3'>
    <div className=' size-12 flex justify-center items-center bg-default-100 border border-default-200 rounded-xl'>
      <Lock width={16} />
    </div>
    <div className="flex flex-col  overflow-hidden">
      <p className=" text-[15px] leading-6 text-ellipsis overflow-hidden">{email}</p>
      <p className="text-small text-default-500 text-ellipsis overflow-hidden">{website}</p>
    </div>
    <div className=' flex-1 flex gap-2 justify-end'>
    <Button variant='light' className=' border-0 text-default-500' isIconOnly > <Copy width={16} /> </Button>
    <Button variant='light' className=' border-0 text-default-500' isIconOnly > <Menu width={16} /> </Button>
    </div>
  </div>

  )
}

export const Home = () => {
  const passwordData = [
    {
      id: 1,
      email: 'john.doe@example.com',
      website: 'nextui.com',
      avatar: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      website: 'janesmith.net',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 3,
      email: 'michael.brown@example.com',
      website: 'michaelbrown.org',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
    },
    {
      id: 4,
      email: 'emily.jones@example.com',
      website: 'emilyjones.info',
      avatar: 'https://randomuser.me/api/portraits/women/20.jpg'
    },
    {
      id: 5,
      email: 'william.johnson@example.com',
      website: 'williamjohnson.io',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    },
    {
      id: 5,
      email: 'william.johnson@example.com',
      website: 'williamjohnson.io',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    },
    {
      id: 5,
      email: 'william.johnson@example.com',
      website: 'williamjohnson.io',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    },
    {
      id: 5,
      email: 'william.johnson@example.com',
      website: 'williamjohnson.io',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' flex-1  flex flex-col'>
      <div className=' flex gap-2 m-1 p-2  bg-default-100/40 rounded-2xl'>
        <Input className=' flex-1' placeholder='Buscar en el cofre' />
        <Button color='primary' endContent={<FolderOpen width={16} />} >Cofre</Button>
        <Button isIconOnly variant='faded' className=' border-0 text-default-500' ><Plus size={20} /></Button>
      </div>
      <ScrollShadow hideScrollBar className=' p-2 mb-1 mt-3 flex flex-col gap-4 flex-1 max-h-[310px]  overflow-auto '>
        {passwordData.map((password) => (
          <PasswordCard key={password.id} {...password} />
        ))}
      </ScrollShadow>
    </motion.div>
  )
}
