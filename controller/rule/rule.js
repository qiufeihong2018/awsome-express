'use strict'

import ruleModel from '../../models/rule'

class Rule {
    constructor() {}

    async login(req, res, next) {
        const rule = await ruleModel.findOne({})
    }
}

module.exports = Rule()