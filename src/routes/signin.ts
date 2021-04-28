import express from 'express';

const router = express.Router()

router.get('/api/users/signin', (req, res) => {
    res.send("hello from signin route")
})

export { router as signInRouter }