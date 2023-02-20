import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Chance from 'chance'
import { useRef } from 'react'
import NewBook from './NewBook'

const chance = new Chance()

it('renders', () => {
  const refs = {
    author: {},
    title: {},
    finished: {},
  }

  render(<NewBook ref={refs} />)

  expect(screen.getByPlaceholderText('author')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('title')).toBeInTheDocument()
  expect(screen.getByText('NOT FINISHED')).toBeInTheDocument()
})
