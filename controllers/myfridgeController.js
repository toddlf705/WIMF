const { Myfridge } = require('../models')

const getAllMyfridge = async (req, res) => {
    try {
        const myfridge = await Myfridge.find()
        res.json(myfridge)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getMyfridgeById = async (req, res) => {
    try {
        const {id} = req.params
        const myfridge = await Myfridge.findById(id)
        if (myfridge) {
            return res.json(myfridge)
        }
        return res.status(404).send ('My fridge list with specified ID does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const createMyfridge = async (req, res) => {
    try {
        const { item, brand, quantity, purchased_date, expiration_date, purchased_store, isPurchased } = req.body
        const myfridge = { item, brand, quantity, purchased_date, expiration_date, purchased_store, isPurchased }
        const myfridgelist = new Myfridge(myfridge)
        await myfridgelist.save()
        return(res.status(200).send('create my fridge item'))
    } catch(error) {
        console.error('Error creating my fridge item:', error)
    }
}

const deleteMyfridge = async (req, res) => {
    try{
        const { id } = req.params
        const deleted = await Myfridge.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('My fridge item deleted')
        }
        throw new Error('My fridge item not found')
    } catch (e) {
        return res.status(500).send(e.message)
    }
    
}

const updateMyfridge = async (req, res) => {
    try {
        const { id } = req.params
        const update = await Myfridge.findByIdAndUpdate(id, req.body, { new: true })
        if (update) {
            return res.status(200).json(update)
        }
        throw new Error('update not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getAllMyfridge,
    getMyfridgeById,
    createMyfridge,
    deleteMyfridge,
    updateMyfridge
}