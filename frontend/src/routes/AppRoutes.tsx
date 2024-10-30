import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UserContainer from '../components/UserContainer'

function AppRoutes() {
  return (
   <Routes>
    <Route path="/users" element={<UserContainer />} />
   </Routes>
  )
}

export default AppRoutes