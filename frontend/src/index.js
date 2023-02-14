import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './custom.scss'
import Login from './pages/Login'
import Main from './pages/Main'
import Registration from './pages/Registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: Main(),
  },
  {
    path: '/register',
    element: Registration(),
  },
  {
    path: '/login',
    element: Login(),
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
