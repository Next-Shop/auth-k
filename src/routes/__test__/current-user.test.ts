import request from 'supertest';
import { app } from '../../app';
import { getAuthCookie } from '../../test/helper';


it('responds with the details of the current user', async () => {


    const cookie = await getAuthCookie()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com');
})

it('responds with null if the user is not authenticated', async () => {

    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null);
})