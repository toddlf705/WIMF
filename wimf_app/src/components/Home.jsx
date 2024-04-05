import WIMF_Logo from '../assets/WIMF logo Main.png'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <>
     <div className='home-container'>
      <div className='logo-container'>
        <h4 id ='WIMF'>WHAT'S IN MY FRIDGE?</h4>
        <Link to="/grocery_list">
        <img src={WIMF_Logo} width='100px'></img> </Link>
      </div>
     </div>
    </>
  )
}

export default Home