import Nav from './Nav'
import Footer from './Footer'
import checkout_icon from '../assets/checkout_icon.png'
import delete_icon from '../assets/delete_icon.png'
import search_icon from '../assets/search_icon.png'
import filter_icon from '../assets/filter_icon.png'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroceryContext } from '../context/GroceryContext'
import { MyfridgeContext } from '../context/MyfridgeContext'



const Grocerylist = () => {
    const { groceries, setGrocery } = useContext(GroceryContext)
    const { myfridge, setMyfridge, addMyfridge } = useContext(MyfridgeContext)
    
    const navigate = useNavigate()

    const handleDeleteGrocery = async (groceryId) => {
        try {
            await axios.delete(`http://localhost:3001/grocerylist/${groceryId}`)
            setGrocery(groceries.filter(grocery => grocery._id !== groceryId))
        } catch (e) {
            console.error(e)
        }
    }

    const handleCheckout = async (id) => {
        try {
            const grabItem = groceries.find(grocery => grocery._id === id)

            const checkoutItem = await axios.post(`http://localhost:3001/myfridge`, grabItem)

            addMyfridge(checkoutItem)
            setMyfridge([...myfridge, checkoutItem])
            alert(`You've added ${grabItem.item} to My Fridge`)
        } catch (e) {
            console.error(e)
        }

        try {
            await axios.delete(`http://localhost:3001/grocerylist/${id}`)
            setGrocery(groceries.filter(grocery => grocery._id !== id))
        } catch (e) {
            console.error(e)
        }

    }

    return(
        <div className='grocerylist-container'>
            <Nav />
            <div className='nav-icons'>
                <div className='search'>
                    <button onClick={()=>navigate('/search_grocery')}><img src={search_icon} width='30px'/></button>
                </div>
            </div>
            <div className='card-overflow-control'>
            {groceries.map((grocery)=> (
                <div className='grocerylist-card' key={grocery._id}>
                    <p> {grocery.item} </p> 
                    <p> {grocery.quantity} </p>
                    <button onClick={()=> handleCheckout(grocery._id)}><img src={checkout_icon} width='50px' /></button>
                    <button onClick={()=> handleDeleteGrocery(grocery._id)}><img src={delete_icon} width='50px' /></button>
                    
                </div>
            ))}
            </div>

            <button onClick={()=> navigate('/add_grocery')} className='add-btn'> + </button>
            <Footer/>
        </div>
    )
}

export default Grocerylist