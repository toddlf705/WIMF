import { Link } from 'react-router-dom'

const Nav = () => {

    return (
        <div className='nav-container'>
            <div className='nav'>
                <Link to="/grocery_list"> Grocery List </Link>
            </div>
            <div className='nav'>
                <Link to="/my_fridge">My Fridge</Link>
            </div>
        </div>
    )
}

export default Nav