import './App.css'
import Main from './components/Main'
import GroceryContextProvider from './context/GroceryContext'
import MyfridgeContextProvider from './context/MyfridgeContext'

function App() {

  return (
    <>
    <GroceryContextProvider>
    <MyfridgeContextProvider>
      <Main />
    </MyfridgeContextProvider>
    </GroceryContextProvider>
    </>
  )
}

export default App
