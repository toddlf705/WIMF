const db = require('../db')
const { Grocerylist } = require('../models')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const listGrocery = [
        {
            item: 'apple', 
            quantity: '6 pcks',
            isPurchased: false
        },
        {
            item: 'milk', 
            quantity: '1 gal',
            isPurchased: false
        },
        {
            item: 'coffee beans', 
            quantity: '',
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