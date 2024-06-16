import { z } from 'zod'

export const UserBook = z.object({
  userId: z.string(),
  bookId: z.string(),
  finished: z.boolean(),
  timestamp: z.number(),
})

export type UserBook = z.infer<typeof UserBook>
