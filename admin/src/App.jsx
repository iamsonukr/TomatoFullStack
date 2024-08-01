import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const url="http://localhost:5000"

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr />
    <div className="app-component">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add url={url}/>}/>
        <Route path='/orders' element={<Orders url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
