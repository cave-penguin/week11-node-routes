const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8090

app.use((req, res, next) => {
    console.log(`${new Date()}: ${req.url} ${req.method}`)
    next()
})

app.use(express.json({ limit: '5mb' }))

app.use(express.static('public'))

app.get('/api/v1/express', (req, res) => res.send('Express Server!!!!!'))

app.get('/api/v1/user/:name/:age', (req, res) => {
    console.log(req.params)
    res.send(`${req.params.name} is ${req.params.age} years old`)
})

app.post('/api/v1/users', (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        time: +new Date()
    }
    res.json(user)
})

app.listen(PORT)

console.log(`I'm listening http://localhost:${PORT}`)
