import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UserContainer from '../components/UserContainer'
import PropertyContainer from '../components/PropertyContainer'
import HomePage from '../components/HomePage';
import AppointmentContainer from '../components/AppointmentContainer';


function AppRoutes() {
  return (
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/users" element={<UserContainer />} />
    <Route path="/properties" element={<PropertyContainer />} />
    <Route path="/appointments" element={<AppointmentContainer />} />
   </Routes>
  )
}

export default AppRoutes