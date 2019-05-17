'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventScheme = new Schema({
    b: {
        required: true,
        type: String
    }
})

const Event = mongoose.model('Event', eventScheme)

module.exports = Event