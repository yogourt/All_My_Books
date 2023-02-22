import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Chance from 'chance'
import NavButton from './NavButton'

const chance = new Chance()

it('renders', () => {
  const name = chance.string()
  const link = chance.string()
  render(<NavButton name={name} link={link} />, { wrapper: BrowserRouter })
  fireEvent.click(screen.getByText(name))
})
