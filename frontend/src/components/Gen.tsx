import { motion } from 'framer-motion'

export const Gen = () => {
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=' flex-1  h-full w-full flex flex-col gap-2 justify-center items-center p-3'>
      <div className=' w-full  h-full p-4 '>
        <div className=' text-base flex justify-center items-center text-default-400 bg-default-100/35 border-2 border-default-200 border-dashed rounded-2xl w-full h-full'>
          Proximamente
        </div>
      </div>
    </motion.div>

  )
}
