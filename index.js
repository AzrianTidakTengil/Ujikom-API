const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models')

const app = express()
const port = 3001

// app.use(cors())
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


require('./rourte/route.js')(app)

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