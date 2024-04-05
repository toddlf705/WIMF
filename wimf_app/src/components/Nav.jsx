import { Link } from 'react-router-dom'

const Nav = () => {

    return (
        <div className='nav-container'>
            <Link to="/grocery_list"> Grocery List </Link>
            <Link to="/my_fridge">My Fridge</Link>
        </div>
    )
}

export default Nav