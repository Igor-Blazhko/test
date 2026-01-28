import { useEffect, useState } from 'react'
import './App.css'
import { Module } from './modules'

function App() {

  const [o, seto] = useState(true);
  useEffect(() => {
    setTimeout(seto, 5000, false)
  }, [])
  return o ? (<Module />): null
}

export default App
