import { rest } from 'msw'

export const handlers = [
  rest.post('/api/user', (req, res, ctx) => res(ctx.json({}))),
  rest.delete('/api/user', (req, res, ctx) => res(ctx.json({}))),
  rest.put('/api/user_details', (req, res, ctx) => res(ctx.json({}))),
]
