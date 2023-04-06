import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Chance from 'chance'
import Book from './Book'

const chance = new Chance()

it('renders', () => {
  const info = {
    author: chance.string(),
    title: chance.string(),
    read: chance.bool(),
    id: chance.string(),
  }

  render(<Book info={info} />)

  expect(screen.getByText(info.author)).toBeInTheDocument()
  expect(screen.getByText(info.title)).toBeInTheDocument()
  expect(
    screen.getByText(info.read ? 'FINISHED' : 'NOT FINISHED')
  ).toBeInTheDocument()
})
