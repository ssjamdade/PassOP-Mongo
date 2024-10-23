import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-green-100 bg-[radial-gradient(60%_100%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
        <Navbar />

        <Manager />
        <Footer />
      </div>
    </>
  )
}

export default App
