'use strict'

import eventModel from '../../models/rule'

class Event {
    constructor() {}

    async login(req, res, next) {
        const event = await eventModel.findOne({})
    }
}

module.exports = Event()