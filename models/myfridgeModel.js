const { Schema } = require('mongoose')
const Myfridge = new Schema(
    {
        item: { type: String, ref: 'item', required: true },
        brand : { type: String, required: false },
        quantity : {type: String, required: false},
        purchased_date: { type: Date, required: false },
        expiration_date: {type: Date, required: true },
        purchased_store: { type: String, required: false },
        isPurchased: {type: Boolean}
    },
    { timestamps: true }
)
module.exports = Myfridge