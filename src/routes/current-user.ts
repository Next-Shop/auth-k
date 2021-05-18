import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {

    // First check if jwt is presented in the session object
    if (!req.session?.jwt) {
        return res.send({ currentUser: null })
    }

    // verify the jwt
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({ currentUser: payload })
    } catch (error) {
        res.send({ currentUser: null })
    }
})

export { router as currentUserRouter }