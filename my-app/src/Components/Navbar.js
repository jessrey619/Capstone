import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="logo">
                <img src="./cit-logo.png" alt="CIT logo" />
            </Link>
        </div>
    </nav>
    </>
  )
}