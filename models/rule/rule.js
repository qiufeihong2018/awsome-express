'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ruleScheme = new Schema({
    a: {
        required: true,
        type: String
    }
})

const Rule = mongoose.model('Rule', ruleScheme)

module.exports = Rule