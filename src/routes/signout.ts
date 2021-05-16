import express from 'express';

const router = express.Router()

router.get('/api/users/signout', (req, res) => {
    res.send("hello from sign out router")
})

export { router as signOutRouter }