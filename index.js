const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/* passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
)); */

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({ "hi": "there" });
})


app.listen(PORT, () => { console.log('App launched on port: ' + PORT) })