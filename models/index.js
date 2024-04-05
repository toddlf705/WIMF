const mongoose = require('mongoose')
const grocerylistSchema = require('./grocerylistModel')
const myfridgeSchema = require('./myfridgeModel')
const Grocerylist = mongoose.model('Grocerylist', grocerylistSchema)
const Myfridge = mongoose.model('Myfridge', myfridgeSchema)

module.exports = {
    Grocerylist,
    Myfridge,
}