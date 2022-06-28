import request from 'supertest'

import app from '../../src/app'

describe('New entry route', () => {
  it('should return a message', async () => {
    const res = await request(app).post('/api/new-entry')

    expect(res.body).toEqual({ message: 'photo' })
  })
})
