import Nav from './Nav'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import edit_icon from '../assets/edit_icon.png'
import { MyfridgeContext } from '../context/MyfridgeContext'


const Myfridge = () => {
    const { myfridge, setMyfridge } = useContext(MyfridgeContext)
    const navigate = useNavigate()

    return(
        <div className='myfridge-container'>
            <Nav />
            {myfridge.map((myfridgelist) => (
                <div className='myfridgelist-card' key={myfridgelist._id}>
                    <p>{myfridgelist.item}</p>
                    <p>{myfridgelist.quantity}</p>
                    <button onClick={()=>navigate(`/edit_myfridge/${myfridgelist._id}`)}><img src={edit_icon} width='50px'/></button>
                </div>
            ))}
            <button onClick={()=> navigate('/add_myfridge')} className='add-btn'> + </button>
        </div>
    )
}

export default Myfridge