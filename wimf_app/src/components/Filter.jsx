import edit_icon from '../assets/edit_icon.png'
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

    const filterByExpDate = () => {
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


    const ExpFromChange = (e) => {
        setExpFrom(e.target.value)

    }

    const ExpToChange = (e) => {
        setExpTo(e.target.value)
    }


    return(
        <div className='filter-page-container'>
            <div className='filter-header'>
                <div className='filter-and-back'>
                    <button onClick={()=>navigate(-1)} className='back-btn'>←</button>
                    <p> Filter By </p>
                </div>

                <div className='by-expiration'>
                    <div className='filter-by-checkbox'>
                        <h3>Expiration Date</h3>
                        <input type='checkbox'></input>
                    </div>
                    <div className='from-to-input'>
                        <label>From:</label>
                        <input type='date' value={expFrom} onChange={ExpFromChange}></input>
                        <label>To:</label>
                        <input type='date' value={expTo} onChange={ExpToChange}></input>
                        <button onClick={()=>filterByExpDate()}>Go</button>
                    </div>
                </div>

                <div className='by-purchase'>
                    <div className='filter-by-checkbox'>
                        <h3>Purchased Date</h3> 
                        <input type='checkbox'></input>
                    </div>
                    <div className='from-to-input'>
                        <label>From:</label>
                        <input type='date'></input>
                        <label>To:</label>
                        <input type='date'></input>
                        <button>Go</button>
                    </div>
                </div>
            </div>

            <div className='filter-result-container'>
                {results.map((result)=>
                    <div key={result._id} className='filter-card'>
                        <div>
                            <p id='filter-item'>{result.item}</p>
                            <p id='filter-date'>{result.expiration_date.slice(0, 10)}</p>
                        </div>
                        <div>
                            <button onClick={()=>navigate(`/edit_myfridge/${result._id}`)}><img src={edit_icon} width='50px'/></button>
                        </div>
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default Filter