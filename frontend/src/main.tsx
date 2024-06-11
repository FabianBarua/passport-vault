import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shares/providers'
import {   Route, HashRouter as Router, Routes } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import PrivateRoutes from './components/PrivateRoute'
import { Home } from './components/Home'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Providers>
      
      <div className="flex min-h-44 w-[24rem] flex-col gap-1  bg-default-50  p-8 pt-6 shadow-small">
        <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                  <Route element={<Home/>} path="/" />
              </Route>
              <Route element={<LoginForm/>} path="/login"/>
            </Routes>
        </Router>
      </div>

    </Providers>
  </React.StrictMode>,
)