import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import NewBook from './NewBook'

it('renders', () => {
  const ref = useRef<HTMLFormElement>(null)

  render(<NewBook ref={ref} />)

  expect(screen.getByPlaceholderText('author')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('title')).toBeInTheDocument()
  expect(screen.getByText('NOT FINISHED')).toBeInTheDocument()
})
