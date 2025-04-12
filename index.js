const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models')
const session = require('express-session')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express()
const port = 3001

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
))

app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(bodyParser.json({limit: '5mb'}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
  next();
})

app.use(session({
    secret: '9cbca2053003153f505011885d2f60c53c20e3a6',
    resave: false,
    saveUninitialized: true
}));

passport.use(new GoogleStrategy({
    clientID: '93663459477-67f82qleefbvtp7du11tcgbjbcqt1g9r.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const user = await db.Users.findOne({
        where: {
            email: profile.emails[0].value
        }
    })

    if (user) {
        return done(null, user)
    }

    const userCreated = await db.Users.create({
        username: profile.displayName,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        telephone: null,
        password: null,
        avatar: null,
        role_id: 3,
    })

    return done(null, userCreated);
}));

app.use(passport.session());
app.use(passport.initialize());

passport.serializeUser((data, done) => {
    process.nextTick(() => {
        return done(null, {
            id: data.id
        })
    })
})

passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user)
    })
})

require('./router/route.js')(app)

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        // create_roles()
        // create_shipments()
        console.log(`running at http://localhost:${port}`)
    })
})

function create_roles() {
    db.Roles.create({
        id: 1,
        name: 'admin'
    })
    db.Roles.create({
        id: 2,
        name: 'seller'
    })
    db.Roles.create({
        id: 3,
        name: 'user'
    })
}

function create_shipments() {
    db.LabelShipment.create({
        id: 1,
        name: 'standar',
        min_price: 13000,
        max_price: 0
    })
    db.LabelShipment.create({
        id: 2,
        name: 'ekonomis',
        min_price: 11500,
        max_price: 0
    })
    db.LabelShipment.create({
        id: 3,
        name: 'express',
        min_price: 15000,
        max_price: 20000
    })
}