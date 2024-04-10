import search_icon from '../assets/search_icon.png'
import checkout_icon from '../assets/checkout_icon.png'
import delete_icon from '../assets/delete_icon.png'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { GroceryContext } from '../context/GroceryContext'
import { MyfridgeContext } from '../context/MyfridgeContext'
import axios from 'axios'

const SearchGrocery = () => {
    const navigate = useNavigate()
    const { groceries, setGrocery } = useContext(GroceryContext)
    const { myfridge, setMyfridge, addMyfridge } = useContext(MyfridgeContext)
    const [keywords, setKeywords] = useState('')
    const [results, setResults] = useState([])

    const fetchData = (value) => {
        const groceryResults = groceries.filter((result)=>
            result.item.includes(value) ||
            result.quantity.includes(value)
        )
        if(!value)
        setResults([''])
        if(value)
        setResults(groceryResults)
        console.log(results)
    }

    const handleChange = (value) => {
        setKeywords(value)
        fetchData(value)
    }

    const handleDeleteGrocery = async (groceryId) => {
        try {
            const grabItem = results.find(result => result._id === groceryId)

            await axios.delete(`http://localhost:3001/grocerylist/${groceryId}`)
            setGrocery(groceries.filter(grocery => grocery._id !== groceryId))
            setResults(results.filter(result => result._id !== groceryId))
            alert (`${grabItem.item} has been deleted`)
        } catch (e) {
            console.error(e)
        }
    }

    console.log(results)

    const handleCheckout = async (id) => {
        try {
            const grabItem = groceries.find(grocery => grocery._id === id)

            const checkoutItem = await axios.post(`http://localhost:3001/myfridge`, grabItem)

            addMyfridge(checkoutItem)
            setMyfridge([...myfridge, checkoutItem])
            setResults(results.filter(result => result._id !== id))
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

    return (
        <div className='search-page-container'>
            <div className='search-header'>
                <div className='search-and-back'>
                    <button onClick={()=>navigate(-1)} className='back-btn'>←</button>
                    <p> Search Grocery List</p>
                </div>

                <div className='search-input'>
                    <img src={search_icon} width='30px' height='30px'/>
                    <input
                        type = 'text'
                        value = {keywords}
                        onChange = {(e)=>handleChange(e.target.value)}
                        /> 
                </div>
            </div>
            {!keywords ? (
                <div className='search-result-container'></div>
            ) : (
            <div className='search-result-container'>
                {results.map((result, id)=> 
                    <div key={id} className='grocery-result-container'> 
                        <p>{result.item}</p>
                        <p>{result.quantity}</p>
                        <button onClick={()=> handleCheckout(result._id)}><img src={checkout_icon} width='50px' /></button>
                        <button onClick={()=> handleDeleteGrocery(result._id)}><img src={delete_icon} width='50px' /></button>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}

export default SearchGrocery