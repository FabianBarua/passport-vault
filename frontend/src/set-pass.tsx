import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shares/providers'
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SetPass } from './components/SetPass'

const RoutesAnimated = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location}>
        <Route element={<SetPass />} path="/" />
      </Routes>
    </AnimatePresence>
  )
}

export const AllRoutes = () => {
  return (
    <Router >
      <RoutesAnimated />
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Providers>
        <AllRoutes />
    </Providers>
  </React.StrictMode>
)
