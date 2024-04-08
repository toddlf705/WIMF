import Nav from './Nav'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import edit_icon from '../assets/edit_icon.png'
import search_icon from '../assets/search_icon.png'
import filter_icon from '../assets/filter_icon.png'
import { MyfridgeContext } from '../context/MyfridgeContext'


const Myfridge = () => {
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const [Alert, setAlert] = useState('')
    const navigate = useNavigate()

    const ExpirationAlert = (expDate) => {
        const today = new Date()
        // const addDays = today.setDate(today.getDate() + 15)
        // const daysLimit = (new Date(addDays))
        // const dueExpiration =  new Date(expDate) <= daysLimit 
        const diff = Math.abs(new Date(expDate) - today)
        const rounded = Math.floor(diff / 8.64e7)
        setAlert(`expires in ${rounded} days`)
        
        // const dueExpiration =  myfridge.filter((fridgedates => new Date(fridgedates.expiration_date) <= daysLimit)
        // ) 

        // const diff = Math.abs(new Date(dueExpiration[0].expiration_date) - today)
        // const rounded = Math.floor(diff / 8.64e7)
        // console.log(dueExpiration)
        // console.log(`${rounded} days`)
    }

    return(
        <div className='myfridge-container'>
            <Nav />
            <div className='nav-icons'>
                <div className='search'>
                    <button><img src={search_icon} width='30px'/></button>
                </div>
                <div className='filter'>
                    <button><img src={filter_icon} width='30px'/></button>
                </div>
            </div>
            {myfridge.map((myfridgelist) => (
                <div className='myfridgelist-card' key={myfridgelist._id}>
                    <p>{myfridgelist.item}</p>
                    <p>{myfridgelist.quantity}</p>
                    <button onClick={()=>navigate(`/edit_myfridge/${myfridgelist._id}`)}><img src={edit_icon} width='50px'/></button>
                    <p onLoad={()=>ExpirationAlert(myfridgelist.expiration_date)}>{Alert}</p>
                </div>
            ))}
            <button onClick={()=> navigate('/add_myfridge')} className='add-btn'> + </button>
        </div>
    )
}

export default Myfridge