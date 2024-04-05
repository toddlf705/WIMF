import Home from './Home'
import Grocerylist from'./Grocerylist'
import Addgrocery from'./Addgrocery'
import Myfridge from'./Myfridge'
import Addmyfridge from'./Addmyfridge'
import Editmyfridge from'./Editmyfridge'
import {Routes, Route} from 'react-router-dom'

const Main = () => {

    return (
        <div className='main-container'>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grocery_list" element={<Grocerylist />} />
            <Route path="/add_grocery" element={<Addgrocery />} />
            <Route path="/my_fridge" element={<Myfridge />} />
            <Route path="/add_myfridge" element={<Addmyfridge />} />
            <Route path='/edit_myfridge/:id' element={<Editmyfridge />} />
        </Routes>
        </div>
    )
}

export default Main