const db = require('../db')
const { Grocerylist } = require('../models')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const listGrocery = [
        {
            item: 'apple', 
            brand : null,
            quantity : '6 pcks',
            purchased_date: null,
            expiration_date: null,
            purchased_store: null,
            isPurchased: false
        },
        {
            item: 'milk', 
            brand : null,
            quantity : '1 gal',
            purchased_date: null,
            expiration_date: null,
            purchased_store: null,
            isPurchased: false
        },
        {
            item: 'coffee beans', 
            brand : null,
            quantity : '1 lbs',
            purchased_date: null,
            expiration_date: null,
            purchased_store: null,
            isPurchased: false
        },
    ]

    console.log(listGrocery)
    await Grocerylist.insertMany(listGrocery)
    console.log('Created Grocery List')
}
const run = async () => {
    await main()
    db.close()
}
run()