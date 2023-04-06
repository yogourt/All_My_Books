import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import BookDetails from './pages/BookDetails'
import Books from './pages/Books'
import './custom.scss'

const Router = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />{' '}
    <Route path='/books'>
      <Route index={true} element={<Books />} />
      <Route path=':bookId' element={<BookDetails />} />
    </Route>
  </Routes>
)

const rootElement = document.getElementById('root')
if (rootElement == null) throw Error('Root element not found.')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </CookiesProvider>
)
