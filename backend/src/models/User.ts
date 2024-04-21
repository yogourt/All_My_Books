import z from 'zod'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const User = z.object({
  name: z.string().min(3).max(50),
  email: z
    .string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
  password: z.string().transform(hash),
})

export type User = z.infer<typeof User>

async function hash(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(this.password, salt)
}

export function generateJWT(user: User) {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  )
}

export function checkPassword(user: User, password: string) {
  return bcrypt.compareSync(password, this.password)
}
