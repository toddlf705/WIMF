import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const MyfridgeContext = createContext()

const MyfridgeContextProvider = (props) => {
    const [myfridge, setMyfridge] = useState([])

    useEffect(()=> {
        const getMyfridgelist = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/myfridge`)
            setMyfridge (response.data)

            } catch (error) {
            console.log(error)
            }
        }
        getMyfridgelist()
    },[])

    const addMyfridge = async (item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store) => {
        const Myfridgelist = {item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store}
        try {
            const response = await axios.post('http://localhost:3001/myfridge', Myfridgelist)
            if (response.data) {
                setMyfridge(currentFridge => [...currentFridge, {...response.data}])
            }
        } catch (error) {
            console.error ('Unable to Create My Fridge List', error)
            throw error
        }
    }

    return (
        <MyfridgeContext.Provider value ={{myfridge, setMyfridge, addMyfridge}}>
            {props.children}
        </MyfridgeContext.Provider>
    )
}

export default MyfridgeContextProvider