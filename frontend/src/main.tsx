import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shares/providers'
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import PrivateRoutes from './components/PrivateRoute'
import { Home } from './components/Home'
import { Gen } from './components/Gen'
import { Account } from './components/Account'
import { AnimatePresence } from 'framer-motion'
import { SetMaster } from './components/SetMaster'

const RoutesAnimated = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location}>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Gen />} path="/gen" />
          <Route element={<Account />} path="/account" />
        </Route>
        <Route element={<LoginForm />} path="/login" />
        <Route element={<SetMaster />} path="/set-master" />
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

      <div className="flex min-h-44 w-[24rem] flex-col gap-1  bg-default-50   shadow-small">
        <AllRoutes />
      </div>

    </Providers>
  </React.StrictMode>
)
