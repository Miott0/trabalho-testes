import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-black py-4 shadow-md">
      <nav className="flex justify-between items-center container mx-auto">
        <ul className="flex flex-row space-x-4">
          <li>
            <Link to="/users" className="text-white hover:text-gray-300 transition-colors">
              Users
            </Link>
          </li>
          <li>
            <Link to="/properties" className="text-white hover:text-gray-300 transition-colors">
              Properties
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="text-white hover:text-gray-300 transition-colors">
              Appointments
            </Link>
          </li>
        </ul>
      </nav>
    </header>

  )
}

export default Header