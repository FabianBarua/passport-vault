import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shares/providers'
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SetPass } from './components/SetPass'
import { PrivateRouteConfig } from './components/PrivateRouteConfig'

// un private route para validar si ya configuró su contraseña master y user

const RoutesAnimated = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location}>
        <Route element={<PrivateRouteConfig />} >
          <Route element={<SetPass />} path="/" />
        </Route>
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
