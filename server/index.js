const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
require("dotenv").config()

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

const {PORT, DATABASE_URL} = require('./config');
const {Lang, User} = require('./models');

app.use(passport.initialize());

// Passport middleware set-up
passport.use(
    new GitHubStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/github/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        return User
            .findOne({gitHubId: profile.id})
            .exec()
            .then(user => {
                if (user) {
                    return User.findByIdAndUpdate(user._id, {$set: {accessToken}}, {new: true})
                }
                return User.create({
                    gitHubId: profile.id,
                    accessToken,
                    name: profile.displayName,
                    gitHubHandle: profile.username,
                })
            })
            .then(user => cb(null, {gitHubId: user.gitHubId, accessToken: user.accessToken}))
            .catch(err => console.error(err))
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            return User.findOne({accessToken: token})
                .exec()
                .then((user) => {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, {gitHubId: user.gitHubId, accessToken: user.accessToken});
                })
                .catch(err => console.error(err))
        }
    )
);

// Authentication endpoints
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

// API endpoints
app.get('/api/questions/:maxResults',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Lang.find({"level":1})
        .limit(parseInt(req.params.maxResults))
        .exec()
        .then(langs => {
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

// API endpoints
app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Lang.find()
        .exec()
        .then(langs => {
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

// API endpoints
app.get('/api/user/:gitHubId',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        User.find({gitHubId: req.params.gitHubId})
        .exec()
        .then(user => {
            if(user) {
                return res.json({
                users: users.map(
                    (user) => user.apiRepr())
                });
            }
            return res.status(400).json({message: 'User Not Found.'});
        })
        .catch(err => {
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
function runServer(port=3001) {
	return new Promise((resolve, reject) => {
		mongoose.connect(DATABASE_URL, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				resolve();
			})
			.on('error', err => {
				reject(err);
			});
		});	
	});
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};