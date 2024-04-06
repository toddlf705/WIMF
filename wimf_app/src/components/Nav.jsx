import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <div className='nav-container'>
            <div className='nav'>
                <button onClick={()=>navigate('/grocery_list')}>Grocery List</button>
            </div>
            <div className='nav'>
                <button onClick={()=>navigate('/my_fridge')}>My Fridge</button>
            </div>
        </div>
    )
}

export default Nav