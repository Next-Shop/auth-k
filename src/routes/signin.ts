import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ]
    , validateRequest
    , async (req: Request, res: Response) => {

        const { email, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ email })
        // User not found
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        // User found
        // Compare provided password with the one we stored in the database
        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        // passwords matched
        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        // Store on the session object
        req.session = { jwt: userJwt };

        res.status(200).send(existingUser);
    })

export { router as signinRouter }