import './App.css'
import Home from './Components/Home'
import { Routes,Route } from 'react-router-dom'
import StringValid from './Components/StringValid'

function App() {

  return (
    <>
      <Routes>
        <Route path="/resetpassword" element={<StringValid />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
