import axios from 'axios'
import { Chance } from 'chance'
import register from './auth'

const chance = new Chance()
const stubs: Record<string, jest.SpyInstance> = {}

beforeAll(() => {
  stubs.axios_post = jest.spyOn(axios, 'post')
})

const req = { email: chance.string(), password: chance.string() }

it('returns response data for login request', async () => {
  const resp = { data: chance.string() }
  stubs.axios_post.mockResolvedValue(resp)
  expect(await register('login', req)).toEqual(resp.data)
})

it('returns error message in case of error', async () => {
  const err = new Error(chance.string())
  stubs.axios_post.mockRejectedValue(err)
  expect(await register('login', req)).toEqual({ msg: err.message })
})
