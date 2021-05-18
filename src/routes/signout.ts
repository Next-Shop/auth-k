import express, { Request, Response } from 'express';

const router = express.Router()

router.post('/api/users/signout', (req: Request, res: Response) => {
    // delete req.session;
    req.session = null;
    res.end();
})

export { router as signoutRouter }