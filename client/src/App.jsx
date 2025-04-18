import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Container from './Components/Container/Container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <h1 className='text-3xl text-red-700'>Test !</h1> */}
    <Header />
    {/* <Container/> */}
    <Footer/>
    </>
  )
}

export default App
