import Nav from './Nav'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MyfridgeContext } from '../context/MyfridgeContext'
import { GroceryContext } from '../context/GroceryContext'

const Editmyfridge = () => {
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const { groceries, setGrocery } = useContext(GroceryContext)
    const [update, setUpdate] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const [itemAlert, setItemAlert] = useState('')
    const [expAlert, setExpAlert] = useState('')


    useEffect(()=> {
        const getMyfridgeById = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/myfridge/${id}`)
            setUpdate(response.data)

            } catch (error) {
            console.log('Error', error)
            }
        }
        getMyfridgeById()
    },[])

    const formatDate = (inputDate) => {
        const date = `${inputDate}`
        const dateOnly = date.slice(0, 10)
        return dateOnly
    }

    const handleUpdate = async (fridgeId) => {
        try {
            let initAlert = ''
            setItemAlert(initAlert)
            setExpAlert(initAlert)
    
            if (!update.item) {
                setItemAlert ('Item name is required')
                return
            }
    
            if (update.expiration_date==null | !update.expiration_date) {
                setExpAlert('Expiration date is required')
                return
            }

            const response = await axios.put(`http://localhost:3001/myfridge/${fridgeId}`, update)
            setMyfridge(...myfridge, response.data)

        } catch (error) {
            console.error('Failed to update data', error)
        }
        
        navigate('/my_fridge')
    }

    const handleChange = (e) => {
        setUpdate({...update, [e.target.id]: e.target.value})
    }

    const handleDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).add(1, 'd').format('YYYY-MM-DD')
        setUpdate({...update, [e.target.id]: newDate})
    }

    const handleDelete = async (fridgeId) => {
        try {
            await axios.delete(`http://localhost:3001/myfridge/${fridgeId}`)

            setMyfridge(myfridge.filter(myfridgelist => myfridgelist._id !== fridgeId))

            navigate('/my_fridge')
        
        } catch (e) {
            console.log('Error', e)
        }
    }

    const handleMoveToGrocery = async (id) => {
        try {
            await axios.post(`http://localhost:3001/grocerylist`, {
                item: update.item,
                brand: '',
                quantity: update.quantity,
                purchased_date: null,
                expiration_date: null, 
                purchased_store: '',
                isPurchased: false
        })
            setGrocery(...groceries, update)
            console.log('line 82')
            console.log(update)
        } catch (e) {
            console.error(e)
        }

        try {
            await axios.delete(`http://localhost:3001/myfridge/${id}`)
            setMyfridge(myfridge.filter(fridge => fridge._id !== id))
        } catch (e) {
            console.error(e)
        }
        navigate('/my_fridge')
    }

    return(
        <div className='Editmyfridge-container'>
            <Nav/>
            <button onClick={()=>navigate('/my_fridge')} className='back-btn'>←</button>
            <div className='form-container-myfridge'>
                <div className='fridge-input'>
                    <label>Item:</label>
                    <input type='text' id='item' value = {update.item} onChange={handleChange}></input>
                </div>
                <p className='alert'>{itemAlert}</p>

                <div className='fridge-input'>
                    <label>Qty: </label>
                    <input type="text" id='quantity' value={update.quantity} onChange={handleChange}></input>
                </div>

                <div className='fridge-input'>
                    <label>Brand: </label>
                    <input type="text" id='brand' value={update.brand} onChange={handleChange} ></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Purchased Date: </label>
                    <input type="date" id='purchased_date' value={formatDate(update.purchased_date)} onChange={handleDateChange}></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Expiration Date: </label>
                    <input type="date" id='expiration_date' value={formatDate(update.expiration_date)} onChange={handleDateChange}></input>
                </div>
                <p className='alert'>{expAlert}</p>

                <div className='fridge-input'>
                    <label id='long-label'>Purchased Store: </label>
                    <input type="text" id='purchased_store' value={update.purchased_store} onChange={handleChange}></input>
                </div>

                <div className='submit-delete-btn'>
                    <button id='submit-delete'onClick={()=>handleUpdate(update._id)}> SAVE</button>
        
                    <button id='submit-delete' onClick={()=>handleDelete(update._id)}>DELETE</button>

                    <button id='move-to-grocery' onClick={()=>handleMoveToGrocery(update._id)}>MOVE TO GROCERY</button>
                </div>
            </div>
        </div>
    )
}

export default Editmyfridge