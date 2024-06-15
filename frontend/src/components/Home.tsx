/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, FolderOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PasswordCard } from './PasswordCard'
import { useDebouncedCallback } from 'use-debounce'

export interface PasswordInterface {
  id: number
  email: string
  password: string
  website: string
  avatar?: string
  favorite?: boolean
}

async function getCurrentTab () {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome?.tabs?.query(queryOptions)
  return tab
}

const filterFavorites = async ({
  passwords
}: {
  passwords: PasswordInterface[]
}) => {
  const filtered = passwords.filter((password) => password.favorite)
  return filtered
}

const filterAll = async ({
  passwords
}: {
  passwords: PasswordInterface[]
}) => {
  return passwords
}

const filterRelevant = async ({
  passwords
}: {
  passwords: PasswordInterface[]
}) => {
  let url

  if (
    typeof chrome !== 'undefined' &&
    chrome?.runtime &&
    chrome?.runtime.id
  ) {
    console.log('chrome')
    const tab = await getCurrentTab()
    url = tab?.url
  } else {
    url = location.href
  }

  if (!url) return passwords

  const website = new URL(url).origin
  const filtered = passwords.filter((password) => password.website === website)
  return filtered
}

const CATEGORIES = [{
  id: 1,
  name: 'Relevantes',
  filter: filterRelevant
},
{
  id: 2,
  name: 'Favoritos',
  filter: filterFavorites
},
{
  id: 3,
  name: 'Todos',
  filter: filterAll
}
]

const initialPasswords = [
  {
    id: 1,
    email: 'john.doe@example.com',
    website: 'http://localhost:5173',
    avatar: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
    password: '123',
    favorite: true
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    website: 'janesmith.net',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    password: '123',
    favorite: false
  },
  {
    id: 3,
    email: 'michael.brown@example.com',
    website: 'https://www.npmjs.com',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    password: '123',
    favorite: true
  },
  {
    id: 4,
    email: 'emily.jones@example.com',
    website: 'emilyjones.info',
    avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    password: '123',
    favorite: false
  },
  {
    id: 5,
    email: 'william.johnson@example.com',
    website: 'williamjohnson.io',
    avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
    password: '123',
    favorite: true
  },
  {
    id: 6,
    email: 'pedro@gmail.com',
    website: 'pedro.com',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    password: '123',
    favorite: false
  },
  {
    id: 7,
    email: 'alice.wilson@example.com',
    website: 'alicewilson.net',
    avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
    password: '123',
    favorite: true
  },
  {
    id: 8,
    email: 'robert.miller@example.com',
    website: 'robertmiller.com',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    password: '123',
    favorite: false
  },
  {
    id: 9,
    email: 'linda.thomas@example.com',
    website: 'lindathomas.org',
    avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
    password: '123',
    favorite: true
  },
  {
    id: 10,
    email: 'charles.moore@example.com',
    website: 'charlesmoore.io',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    password: '123',
    favorite: false
  },
  {
    id: 11,
    email: 'barbara.white@example.com',
    website: 'barbarawhite.net',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    password: '123',
    favorite: true
  }
]

export const Home = () => {
  const [categorie, setCategorie] = useState(CATEGORIES[0])

  const [passwordData] = useState<PasswordInterface[]>(initialPasswords)

  const [passwordsFiltered, setPasswordsFiltered] = useState<PasswordInterface[]>([])

  const debounced = useDebouncedCallback(
    (value) => {
      handleSearch(value)
    },
    400
  )

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    const passwords = passwordData.filter((password) => password.website.includes(search))
    const filteredByCategory = await categorie.filter({ passwords })
    setPasswordsFiltered(filteredByCategory)
  }

  useEffect(() => {
    const initialPasswords = async () => {
      const passwords = await categorie.filter({ passwords: passwordData })
      setPasswordsFiltered(passwords)
    }

    initialPasswords()
  }, [categorie])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' h-full flex flex-col'>
      <div className=' flex gap-2 m-1 p-2  bg-default-100/40 rounded-2xl'>
        <Input
          onChange={debounced}
        className=' flex-1' placeholder='Buscar en el cofre' />
        <Button color='primary' endContent={<FolderOpen width={16} />} >Cofre</Button>
        <Button isIconOnly variant='faded' className=' border-0 text-default-500' ><Plus size={20} /></Button>
      </div>
      <div className=' p-2 flex justify-center gap-2'>

        {
          CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={categorie.id === category.id ? 'faded' : 'light'}
              color={categorie.id === category.id ? 'primary' : 'default'}
              onClick={
                () => {
                  setCategorie(category)
                }
              }
              className=' w-full h-8  text-default-500' >
              {category.name}</Button>
          ))
        }

      </div>

      <hr className=' border-default-200' />
      <AnimatePresence>
        <ScrollShadow className=' p-3' hideScrollBar>
          <motion.div
            key={categorie.id}
            className=' flex flex-col flex-1 gap-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            {
              passwordsFiltered.map((password) => (
                <PasswordCard key={password.id} email={password.email} website={password.website} password={password.password} />
              ))
            }
          </motion.div>
        </ScrollShadow>
      </AnimatePresence>

    </motion.div>
  )
}
