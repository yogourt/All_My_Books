import InternalServerError from '../errors/internal-server'

export const getEnv = (env: string) => {
  const val = process.env[env]
  if (!val) throw new InternalServerError('Missing configuration')
  return val
}
