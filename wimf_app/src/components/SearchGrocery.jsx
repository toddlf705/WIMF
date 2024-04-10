import search_icon from '../assets/search_icon.png'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { GroceryContext } from '../context/GroceryContext'

const SearchGrocery = () => {
    const navigate = useNavigate()
    const { groceries, setGrocery } = useContext(GroceryContext)
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
                    <div key={id} className='result-container'> 
                        <div className='result-title'>
                            <p>{result.item}</p>
                            <p>{result.quantity}</p>
                        </div>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}

export default SearchGrocery