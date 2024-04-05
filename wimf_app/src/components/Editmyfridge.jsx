import Nav from './Nav'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Editmyfridge = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [myfridge, setMyfridge] = useState([])
    const [update, setUpdate] = useState({
        item: '',
        quantity: '',
        isPurchased: true,
        brand: '',
        purchased_date: '',
        expiration_date: '',
        purchased_store: ''
    })

    const formatDate = (inputDate) => {
        const date = `${inputDate}`
        const dateOnly = (date.slice(0, 10))
        return dateOnly
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/myfridge/${id}`, myfridge)
        } catch (error) {
            console.error('Failed to update data')
        }
        navigate('/my_fridge')
    }

    const handleChange = (e) => {
        setMyfridge({...myfridge, [e.target.id]: e.target.value})
        console.log(myfridge)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/myfridge/${id}`)

            navigate('/my_fridge')
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=> {
        const getMyfridgeById = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/myfridge/${id}`)
            setMyfridge (response.data)
            } catch (error) {
            console.log(error)
            }
        }
        getMyfridgeById()
    },[])


    return(
        <div className='Editmyfridge-container'>
            <Nav/>
            <button onClick={()=>navigate('/my_fridge')}>←</button>
            <div>
                <label>Item:</label>
                <input type='text' id='item' value ={myfridge.item} onChange={handleChange}></input>

                <label>Qty: </label>
                <input type="text" id='quantity' value={myfridge.quantity} onChange={handleChange}></input>

                <label>Brand: </label>
                <input type="text" id='brand' value={myfridge.brand} onChange={handleChange} ></input>

                <label>Purchased Date: </label>
                <input type="date" id='purch_date' value={formatDate(myfridge.purchased_date)} onChange={handleChange}></input>

                <label>Expiration Date: </label>
                <input type="date" id='exp_date' value={formatDate(myfridge.expiration_date)} onChange={handleChange}></input>

                <label>Purchased Store: </label>
                <input type="text" id='purch_store' value={myfridge.purchased_store} onChange={handleChange}></input>


                <button onClick={()=>handleUpdate}>Save</button>
                <button onClick={()=>handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Editmyfridge