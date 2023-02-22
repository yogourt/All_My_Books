import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './custom.scss'
import Login from './pages/Login'
import Main from './pages/Main'
import Registration from './pages/Registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: Main()
  },
  {
    path: '/register',
    element: Registration()
  },
  {
    path: '/login',
    element: Login()
  }
])
const rootElement = document.getElementById('root')
if (rootElement == null) throw Error('Root element not found.')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
)
