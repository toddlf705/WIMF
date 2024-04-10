import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { MyfridgeContext } from '../context/MyfridgeContext'

const Filter = () => {
    const navigate = useNavigate()
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const [expFrom, setExpFrom] = useState ('')
    const [expTo, setExpTo] = useState('')
    const [purch, setPurch] = useState('')
    const [results, setResults] = useState([])

    const filterByExpDate = (value) => {
        const fromOnly = myfridge.filter((result)=> 
            result.expiration_date > expFrom
        )
        const toOnly = myfridge.filter((result)=> 
            result.expiration_date < expTo
        )
        const fromAndTo = myfridge.filter((result)=> 
         result.expiration_date > expFrom && result.expiration_date < expTo
        )
        if (expFrom && expTo)
            setResults(fromAndTo)
        if (expFrom && !expTo)
           setResults(fromOnly)
        if (!expFrom && expTo)
           setResults(toOnly)
    }

    console.log(results)


    const ExpFromChange = (e) => {
        setExpFrom(e.target.value)
        filterByExpDate(e)
    }

    const ExpToChange = (e) => {
        setExpTo(e.target.value)
        filterByExpDate(e)
    }


    return(
        <div className='filter-page-container'>
            <div className='filter-header'>
                <div className='filter-and-back'>
                    <button onClick={()=>navigate(-1)} className='back-btn'>←</button>
                    <p> Filter</p>
                </div>

                <div className='by-expiration'>
                    <h3>Expiration Date</h3>
                    <label>From:</label>
                    <input type='date' value={expFrom} onChange={ExpFromChange}></input>
                    <label>To:</label>
                    <input type='date' value={expTo} onChange={ExpToChange}></input>
                </div>

                <div className='by-purchase'>
                    <h3>Purchased Date</h3>
                    <label>From:</label>
                    <input type='date'></input>
                    <label>To:</label>
                    <input type='date'></input>
                </div>
            </div>

            <div className='filter-result-container'>
                {results.map((result)=>
                    <div key={result._id}>
                    {result.item}
                    {result.expiration_date.slice(0, 10)}
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default Filter