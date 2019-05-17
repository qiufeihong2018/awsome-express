'use strict'

const mongoose = require('mongoose')
// const config=require('config-lite')
const chalk = require('chalk')

mongoose.connect('mongodb://localhost:27017/alarms', {
    useNewUrlParser: true
})
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
    console.log(
        chalk.green('Connected')
    )
})

db.on('error', (error) => {
    console.error(
        chalk.red(`Error in MongoDb connection:${error}`)
    )
    mongoose.disconnect()
})

db.on('close', () => {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    )
    mongoose.connect('mongodb://localhost:27017/alarms', {
        server: {
            auto_reconnect: true
        }
    })
})

module.exports = db