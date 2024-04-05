import Nav from './Nav'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroceryContext } from '../context/GroceryContext'

const Addgrocery = () => {
    const navigate = useNavigate()
    const { addNewGrocery } = useContext(GroceryContext)
    const [item, setItem] =  useState('')
    const [quantity, setQty] = useState('')
    const [isPurchased, setPurchased] = useState(false)
    const [brand, setBrand] = useState('')
    const [purchased_date, setPurchDate] = useState('')
    const [expiration_date, setExpDate] = useState('')
    const [purchased_store, setStore] = useState('')


    const handleItemChange = (e) => {
        setItem(e.target.value)
    }

    const handleQtyChange = (e) => {
        setQty(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewGrocery(item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store)
        navigate ('/grocery_list')
    }


    return(
        <div className='addgrocery-container'>
            <Nav/> 
            <button onClick={()=>navigate('/grocery_list')}>←</button>
            <form onSubmit={handleSubmit}>
                <label>Item: </label>
                <input type="text" id='item' value ={item} onChange={handleItemChange} required></input>
                <label>Qty: </label>
                <input type="text" id='quantity' value={quantity} onChange={handleQtyChange} required></input>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Addgrocery