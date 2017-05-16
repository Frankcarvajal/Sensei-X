const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
require("dotenv").config()

mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

const {PORT, DATABASE_URL} = require('./config');
const {Lang, User} = require('./models');

const database = {
};

app.use(passport.initialize());

passport.use(
    new GitHubStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/github/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token
        return User
            .findOne({gitHubId: profile.id})
            .exec()
            .then(user => {
                if(user) {
                    return User.findByIdAndUpdate(user._id, {$set: {gitHubToken: accessToken}} )
                }
                return User.create({
                    gitHubId: profile.id,
                    gitHubToken: accessToken
                })
            })
            .then(user => {
                cb(null, {gitHubId: user.gitHubId, gitHubToken: user.gitHubToken})
            })
            .catch(err => {
                console.error(err);
            })
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't. 
            return User.findOne({gitHubToken: token})
                .exec()
                .then((user) => {
                    if(!user) {
                        return done(null, false);
                    }
                    return done(null, {gitHubId: user.gitHubId, gitHubToken: user.gitHubToken})
                })
                .catch(err => console.error(err));

            // if (!(token in database)) {
            //     return done(null, false);
            // }
            // return done(null, database[token]);
        }
    )
);

app.get('/api/auth/github',
    passport.authenticate('github', {scope: ['profile']}));

app.get('/api/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        gitHubId: req.user.gitHubId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Lang.find()
        .exec()
        .then(langs => {
            console.log(langs);
            res.json({
                langs: langs.map(
                    (lang) => lang.apiRepr())
            });
            
        })
        .catch(
            err => {
                console.error(err);
                res.status(500).json({message: 'Internal server error'});
            });
    }
);

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(databaseUrl=DATABASE_URL, port=3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });        
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
