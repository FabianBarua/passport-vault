/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, FolderOpen } from 'lucide-react'
import { PasswordCard } from './PasswordCard'
import { useSearch } from '../hooks/useSearch'
import { CATEGORIES } from '../hooks/constants'

export const Home = () => {
  const { categorie, setCategorie, debounced, passwordsFiltered } = useSearch()

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
                <PasswordCard key={password.id} email={password.email || ''} website={password.website} password={password.password || ''} />
              ))
            }
          </motion.div>
        </ScrollShadow>
      </AnimatePresence>

    </motion.div>
  )
}
