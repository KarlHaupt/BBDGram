import express from 'express';
import passport from 'passport';

const authController = express.Router();

authController.get(
    '/auth/google/login',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
);

authController.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
    }),
    function (req, res) {
      res.redirect("/redirect");
    }
);

authController.get('/auth/google/failure', (req, res) => {
    res.send('Something went wrong with Google authentication.');
});

export default authController;
