const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://toddlf705:uAxo9qcPmdVyFujQ@cluster0.acpuqv8.mongodb.net/WIMF?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })
mongoose.set('debug', true)
const db = mongoose.connection
module.exports = db
