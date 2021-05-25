import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('ERROR_API_AUTH_INVALID_EMAIL'),
        body('password').trim().isLength({ min: 8, max: 20 }).withMessage('ERROR_API_AUTH_WEAK_PASSWORD')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('AUTH_EMAIL_ALREADY_IN_USE');
        }

        const user = User.createUser({ email, password });

        await user.save()

        // Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // Store on the session object
        req.session = { jwt: userJwt };

        res.status(201).send(user);
    })

export { router as signupRouter }