import { useNavigate } from 'react-router-dom'
import search_icon from '../assets/search_icon.png'
import filter_icon from '../assets/filter_icon.png'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <div className='nav-container'>
            <div className='nav-menu'>
                <div className='nav'>
                    <button onClick={()=>navigate('/grocery_list')}>Grocery List</button>
                </div>
                <div className='nav'>
                    <button onClick={()=>navigate('/my_fridge')}>My Fridge</button>
                </div>
            </div>
            <div className='nav-icons'>
                <div className='search'>
                    <button><img src={search_icon} width='30px'/></button>
                </div>
                <div className='filter'>
                    <button><img src={filter_icon} width='30px'/></button>
                </div>
            </div>
        </div>
    )
}

export default Nav