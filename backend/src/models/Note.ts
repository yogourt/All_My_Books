import { z } from 'zod'

export const Note = z.object({
  content: z.string(),
  bookId: z.number(),
  userId: z.string(),
  chapter: z.string().optional(),
  timestamp: z.number(),
})

export type Note = z.infer<typeof Note>
