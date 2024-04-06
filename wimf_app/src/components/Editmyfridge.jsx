import Nav from './Nav'
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MyfridgeContext } from '../context/MyfridgeContext'

const Editmyfridge = () => {
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const [update, setUpdate] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        const getMyfridgeById = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/myfridge/${id}`)
            console.log(response.data)
            setUpdate(response.data)
            console.log(update._id)

            } catch (error) {
            console.log('Error', error)
            }
        }
        getMyfridgeById()
    },[])

    const formatDate = (inputDate) => {
        const date = `${inputDate}`
        const dateOnly = (date.slice(0, 10))
        return dateOnly
    }

    const handleUpdate = async (fridgeId) => {
        try {
            const response = await axios.put(`http://localhost:3001/myfridge/${fridgeId}`, update)
            setMyfridge(...myfridge, response.data)
        } catch (error) {
            console.error('Failed to update data', error)
        }
        navigate('/my_fridge')
    }

    const handleChange = (e) => {
        setUpdate({...update, [e.target.id]: e.target.value})
        console.log(update)
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


    return(
        <div className='Editmyfridge-container'>
            <Nav/>
            <button onClick={()=>navigate('/my_fridge')} className='back-btn'>←</button>
            <div className='form-container-myfridge'>
                <div className='fridge-input'>
                    <label>Item:</label>
                    <input type='text' id='item' value = {update.item} onChange={handleChange}></input>
                </div>

                <div className='fridge-input'>
                    <label>Qty: </label>
                    <input type="text" id='quantity' value={update.quantity} onChange={handleChange}></input>
                </div>

                {/* <div className='fridge-input'>
                    <label>Brand: </label>
                    <input type="text" id='brand' value={update.brand} onChange={handleChange} ></input>
                </div>
                <div className='fridge-input'>
                    <label id='long-label'>Purchased Date: </label>
                    <input type="date" id='purch_date' value={formatDate(update.purchased_date)} onChange={handleChange}></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Expiration Date: </label>
                    <input type="date" id='exp_date' value={formatDate(update.expiration_date)} onChange={handleChange}></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Purchased Store: </label>
                    <input type="text" id='purch_store' value={update.purchased_store} onChange={handleChange}></input>
                </div> */}

                <div className='submit-delete-btn'>
                    <button id='submit-delete'onClick={()=>handleUpdate(update._id)}> SAVE</button>
        
                    <button id='submit-delete' onClick={()=>handleDelete(update._id)}>DELETE</button>

                    <button id='move-to-grocery'>MOVE TO GROCERY</button>
                </div>
            </div>
        </div>
    )
}

export default Editmyfridge