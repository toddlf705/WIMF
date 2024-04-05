const { Grocerylist } = require('../models')

const getAllGrocery = async (req, res) => {
    try {
        const grocerylist = await Grocerylist.find()
        res.json(grocerylist)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getGroceryById = async (req, res) => {
    try {
        const {id} = req.params
        const grocerylist = await Grocerylist.findById(id)
        if (grocerylist) {
            return res.json(grocerylist)
        }
        return res.status(404).send ('grocery item with specified ID does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const createGrocery = async (req, res) => {
    try {
        console.log(req.body)
        const { item, quantity, isPurchased } = req.body
        const grocerylist = { item, quantity, isPurchased }
        console.log(grocerylist)
        const grocery = new Grocerylist(grocerylist)
        await grocery.save()
        return(res.status(200).send('create grocery'))
    } catch(error) {
        console.error('Error creating grocery list:', error)
    }
}

const deleteGrocery = async (req, res) => {
    try{
        const { id } = req.params
        const deleted = await Grocerylist.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('grocery item deleted')
        }
        throw new Error('grocery item not found')
    } catch (e) {
        return res.status(500).send(e.message)
    }
    
}



module.exports = {
    getAllGrocery,
    getGroceryById,
    createGrocery,
    deleteGrocery
}