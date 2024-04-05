import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const GroceryContext = createContext()

const GroceryContextProvider = (props) => {
    const [groceries, setGrocery] = useState([])

    useEffect(()=> {
        const getGrocerylist = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/grocerylist`)
            setGrocery(...groceries, response.data)
        
            } catch (error) {
            console.log(error)
            }
        }
        
        getGrocerylist()
    },[])

    const addNewGrocery = async (item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store) => {
        const grocerylist = {item, quantity, isPurchased, brand, purchased_date, expiration_date, purchased_store}
        try {
            const response = await axios.post('http://localhost:3001/grocerylist', grocerylist)
            if (response.data) {
                setGrocery(currentGrocery => [...currentGrocery, {...response.data}])
            }
        } catch (error) {
            console.error('Unable to Create Grocery List', error)
            throw error
        }
    }

    return (
        <GroceryContext.Provider value={{groceries, setGrocery, addNewGrocery}}>
            {props.children}
        </GroceryContext.Provider>
    )

}

export default GroceryContextProvider