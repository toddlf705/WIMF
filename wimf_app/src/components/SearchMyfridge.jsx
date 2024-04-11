import search_icon from '../assets/search_icon.png'
import edit_icon from '../assets/edit_icon.png'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { MyfridgeContext } from '../context/MyfridgeContext'

const SearchMyfridge = () => {
    const navigate = useNavigate()
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const [keywords, setKeywords] = useState('')
    const [results, setResults] = useState('')

    const fetchData = (value) => {
        const fridgeResults = myfridge.filter((result) => 
            result.item.includes(value) || 
            result.quantity.includes(value) ||
            result.brand.includes(value) ||
            result.purchased_store.includes(value)
        )
        if(!value)
        setResults([''])
        if(value)
        setResults(fridgeResults)
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
                    <p> Search My Fridge List </p>
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
                        <div>
                            <div className='result-title'>
                                <p>{result.item}</p>
                                <p>{result.quantity}</p>
                            </div>
                            <div className='result-detail'>
                                <p>brand: {result.brand}</p>
                                <p>store: {result.purchased_store}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={()=>navigate(`/edit_myfridge/${result._id}`)}><img src={edit_icon} width='50px'/></button>
                        </div>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}

export default SearchMyfridge