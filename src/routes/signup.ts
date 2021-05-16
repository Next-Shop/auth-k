import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters')
], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email already in use');
    }

    const user = User.createUser({ email, password });

    await user.save()

    res.status(201).send(user);
})

export { router as signupRouter }