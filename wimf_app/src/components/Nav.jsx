import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <div className='nav-container'>
            <div className='nav'>
                <div className='tabs'>
                    <button onClick={()=>navigate('/grocery_list')}>Grocery List</button>
                    <button onClick={()=>navigate('/my_fridge')}>My Fridge</button>
                </div>
                <div className='animation start-home'></div>
            </div>
        </div>
    )
}

export default Nav