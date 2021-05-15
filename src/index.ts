import express from 'express';
import { json } from 'body-parser';
import { signInRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

// app.get('/api/users/currentuser', (req, res) => {
//     res.send('Hey there!');
// });

app.use(signInRouter);
app.use(signupRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Listening on port 3000!`);
});
