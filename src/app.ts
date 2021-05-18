//default
import express from 'express';
import { json } from 'body-parser';

//3rd party
import 'express-async-errors';
import cookieSession from 'cookie-session';

// own
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// tell node.js that you are behind the proxy of ingress-nginx so trust the security of the incoming traffic
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.get('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);

export { app }