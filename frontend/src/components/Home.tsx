import { motion } from 'framer-motion'

export const Home = () => {
  return (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      className=' flex-1  text-center flex justify-center items-center'>
        <h1>Home</h1>
      </motion.div>
  )
}
