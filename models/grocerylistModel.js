const { Schema } = require('mongoose')
const Grocerylist = new Schema(
    {
        item: { type: String, ref: 'item', required: true },
        quantity : { type: String },
        isPurchased: {type: Boolean }
    },
    { timestamps: true }
)
module.exports = Grocerylist