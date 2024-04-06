import Nav from './Nav'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyfridgeContext } from '../context/MyfridgeContext'

const Addmyfridge = () => {
    const navigate = useNavigate()
    const { addMyfridge } = useContext(MyfridgeContext)
    const [item, setItem] =  useState('')
    const [quantity, setQty] = useState('')
    const [isPurchased, setPurchased] = useState(true)
    const [brand, setBrand] = useState('')
    const [purchased_date, setPurchDate] = useState('')
    const [expiration_date, setExpDate] = useState('')
    const [purchased_store, setStore] = useState('')

    const [itemAlert, setItemAlert] = useState('')
    const [expAlert, setExpAlert] = useState('')

    const handleItemChange = (e) => {
        setItem(e.target.value)
    }

    const handleQtyChange = (e) => {
        setQty(e.target.value)
    }

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handlePurchChange = (e) => {
        setPurchDate(e.target.value)
    }

    const handleExpChange = (e) => {
        setExpDate(e.target.value)
    }

    const handleStoreChange = (e) => {
        setStore(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let initAlert = ''
        setItemAlert(initAlert)
        setExpAlert(initAlert)

        if (!item) {
            setItemAlert ('Item name is required')
            return
        }
        console.log(itemAlert)

        if (!expiration_date) {
            setExpAlert('Expiration date is required')
            return
        }

        
        addMyfridge(item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store)
       
        navigate ('/my_fridge')
    }

    return(
        <div className='addmyfridge-container'>
            <Nav />
            <button onClick={()=>navigate('/my_fridge')} className='back-btn'>←</button>
            <form onSubmit ={handleSubmit} className='form-container-myfridge'>
                <div className='fridge-input'>
                    <label>Item:</label>
                    <input type='text' id='item' value ={item} onChange={handleItemChange}></input>
                </div>
                <p className='alert'>{itemAlert}</p>

                <div className='fridge-input'>
                    <label>Qty: </label>
                    <input type="text" id='quantity' value={quantity} onChange={handleQtyChange}></input>
                </div>

                <div className='fridge-input'>
                    <label>Brand: </label>
                    <input type="text" id='brand' value={brand} onChange={handleBrandChange}></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Purchased Date: </label>
                    <input type="date" id='purch_date' value={purchased_date} onChange={handlePurchChange}></input>
                </div>

                <div className='fridge-input'>
                    <label id='long-label'>Expiration Date: </label>
                    <input type="date" id='exp_date' value={expiration_date} onChange={handleExpChange}></input>
                </div>
                <p className='alert'>{expAlert}</p>

                <div className='fridge-input'>
                    <label id='long-label'>Purchased Store: </label>
                    <input type="text" id='purch_store' value={purchased_store} onChange={handleStoreChange}></input>
                </div>

                <div className='submit-btn'>
                    <button type='submit'>SAVE</button>
                </div>
            </form>
        </div>
    )
}

export default Addmyfridge