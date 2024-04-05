const db = require('../db')
const { Grocerylist, Myfridge } = require('../models')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const listMyfridge = [
        {
            item: 'flour',
            brand: '',
            quantity: '1lbs',
            purchased_date: new Date(2024, 4, 2),
            expiration_date: new Date(2024, 8, 10),
            purchased_store: 'Costco',
            isPurchased: true
        },
        {
            item: 'frozen fries', 
            brand: 'Kirkland',
            quantity: '1 bag',
            purchased_date: new Date(2024, 4, 2),
            expiration_date: new Date(2024, 10, 15),
            purchased_store: 'Costco',
            isPurchased: true
        },
        
    ]
    await Myfridge.insertMany(listMyfridge)
    console.log('Created My Fridge List')
}
const run = async () => {
    await main()
    db.close()
}
run()