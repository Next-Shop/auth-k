//default
import express from 'express';
import { json } from 'body-parser';

//3rd party
import 'express-async-errors';
import mongoose from 'mongoose';

// own
import { signInRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(signInRouter);
app.use(signupRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.get('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error)
    }
}

app.listen(3000, () => {
    console.log(`Listening on port 3000!`);
});

connectDB();