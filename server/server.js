// const express = require('express')
// const http = require('http')
// const io = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const socketIO = io(server)

const express = require('express')
// const { createServer } = require('http')
// const { Server } = require('socket.io')

const app = express()
// const httpServer = createServer(app)
// const io = new Server(httpServer, {})

require('dotenv').config()

const PORT = process.env.PORT || 8090

app.use(express.static('public'))

app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${new Date()}: ${req.url} ${req.method}`)
    next()
})

app.use(express.json({ limit: '5mb' }))

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/v1/express', (req, res) => res.send('Express Server!!!!!'))

// app.use('/api/', (req, res) => {
//     res.status(404)
//     res.end()
// })

// io.path('/ws')

// io.on('connection', (socket) => {
//     console.log('a user connected')
// })

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`I'm listening http://localhost:${PORT}`)
})
