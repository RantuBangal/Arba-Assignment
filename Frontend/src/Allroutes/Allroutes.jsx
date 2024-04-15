import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import MyCartPage from '../Pages/MyCartPage'
import AllProducts from '../Pages/AllProducts'
import MyStore from '../Pages/MyStore'
import Profile from '../Pages/Profile'

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<MyCartPage/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='/mystore' element={<MyStore/>}/>
        <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}

export default Allroutes
