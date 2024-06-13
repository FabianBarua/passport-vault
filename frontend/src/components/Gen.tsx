import { motion } from 'framer-motion'

export const Gen = () => {
  return (

    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className=' flex-1  h-full w-full flex flex-col gap-2 justify-center items-center p-3'>
      <h1>Generar contraseñas</h1>
    </motion.div>

  )
}
