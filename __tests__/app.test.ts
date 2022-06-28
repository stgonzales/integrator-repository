import request from 'supertest'

import app from '../src/app'

describe('Test app.ts', () => {
  it('should run start the server and present message', async () => {
    const res = await request(app).get('/api/health')
    expect(res.body).toEqual({ message: 'Test' })
  })

  it('should sum 2 + 2', () => {
    const res = 2 + 2
    expect(res).toEqual(4)
  })
})
