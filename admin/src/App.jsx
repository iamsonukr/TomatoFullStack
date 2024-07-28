import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

function App() {

  return (
    <>
    <Navbar/>
    <hr />
    <div className="app-component">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/list' element={<List/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
