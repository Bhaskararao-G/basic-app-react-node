import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/dashBoard/Home'
import Members from '../pages/dashBoard/Members'

const DashBoardRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/members' element={<Members />}/>
        </Routes>
    </div>
  )
}

export default DashBoardRoutes