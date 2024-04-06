const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

//import Controllers
const grocerylistController = require('./controllers/grocerylistController')
const myfridgeController = require('./controllers/myfridgeController')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => res.send('welcome to our landing page!'))

//CRUD
app.get('/grocerylist', grocerylistController.getAllGrocery)
app.get('/grocerylist/:id', grocerylistController.getGroceryById)
app.get('/myfridge', myfridgeController.getAllMyfridge)
app.get('/myfridge/:id', myfridgeController.getMyfridgeById)


app.post('/grocerylist', grocerylistController.createGrocery)
app.post('/myfridge', myfridgeController.createMyfridge)

app.put('/myfridge/:id', myfridgeController.updateMyfridge)

app.delete('/grocerylist/:id', grocerylistController.deleteGrocery)
app.delete('/myfridge/:id', myfridgeController.deleteMyfridge)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))