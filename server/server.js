const { readFile, writeFile, unlink } = require('fs').promises
const axios = require('axios')

const express = require('express')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 8090

app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(`${new Date()}: ${req.url} ${req.method}`)
    res.set('x-skillcrucial-user', '3d240521-5706-4272-a57e-5484ea9a2dcc')
    res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
    next()
})

app.use(express.json({ limit: '5mb' }))

const dirName = `${__dirname}/data/users.json`
const URL = 'https://jsonplaceholder.typicode.com/users'
const write = (respons) => writeFile(dirName, JSON.stringify(respons), { encoding: 'utf8' })
const read = () => readFile(dirName, { encoding: 'utf8' })
const getUsersFromSite = (url) => {
    const getUsers = axios
        .get(url)
        .then(({ data }) => data)
        .catch((err) => {
            console.log(err)
            return []
        })
    return getUsers
}

app.get('/api/v1/users/take/:number', async (req, res) => {
    const { number } = req.params
    const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
    res.json(users.slice(0, +number))
})

app.get('/api/v1/users', async (req, res) => {
    const users = await read()
        .then((user) => JSON.parse(user))
        .catch(async (err) => {
            console.log('Users not found', err)
            const newUsers = await getUsersFromSite(URL)
            await write(newUsers)
            return newUsers
        })
    res.json(users)
})

app.post('/api/v1/users', async (req, res) => {
    const users = await read()
        .then((data) => {
            const userArr = JSON.parse(data)
            const lastId = userArr[userArr.length - 1].id
            const lastUser = { ...req.body, id: lastId + 1 }
            return [...userArr, lastUser]
        })
        .catch(async () => {
            return [{ ...req.body, id: 1 }]
        })
    await write(users)
    res.json({ status: 'success', id: users[users.length - 1].id })
})

app.patch('/api/v1/users/:userId', async (req, res) => {
    try {
        const { body } = req
        const usersStr = await read()
        const usersArr = JSON.parse(usersStr)
        const { userId } = req.params
        const user = usersArr.find((it) => {
            return +it.id === +userId
        })
        const userWithNewBody = { ...user, ...body }
        if (usersArr.find((it) => +it.id === +userId)) {
            const usersArrWithoutUserId = usersArr.reduce((acc, rec) => {
                if (+rec.id !== +userId) {
                    return [...acc, rec]
                }
                return acc
            }, [])
            const newUsersArr = [...usersArrWithoutUserId, userWithNewBody].sort(
                (a, b) => +a.id - +b.id
            )
            await write(newUsersArr)
            res.json({ status: 'success', id: userId })
        }
        res.json('user not found')
    } catch (err) {
        res.send('error')
    }
})

app.delete('/api/v1/users/:userId', async (req, res) => {
    const { userId } = req.params
    const usersStr = await read()
    const usersArr = JSON.parse(usersStr)
    if (usersArr.find((it) => +it.id === +userId)) {
        const usersArrWithoutUserId = usersArr.reduce((acc, rec) => {
            if (+rec.id !== +userId) {
                return [...acc, rec]
            }
            return acc
        }, [])
        await write(usersArrWithoutUserId)
        res.json({ status: 'success', id: userId })
    }
    res.json('user not found')
})

app.delete('/api/v1/users', async (req, res) => {
    await unlink(dirName)
        .then(() => {
            res.json({ status: 'file is deleted' })
        })
        .catch((err) => {
            console.log(err)
            res.json({ status: 'file not found' })
        })
})

app.use('/api/', (req, res) => {
    res.status(404)
    res.end()
})

app.listen(PORT, () => {
    console.log(`I'm listening http://localhost:${PORT}`)
})
