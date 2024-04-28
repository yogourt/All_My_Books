import { z } from 'zod'

export const Book = z.object({
  author: z.string(),
  title: z.string(),
  bookId: z.string(),
})

export type Book = z.infer<typeof Book>
