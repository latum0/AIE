import React from "react"
import "./Navbar1.css"
import logo from "../../assets/icons/logoMC.png"

import { FaBell, FaEnvelope, FaHeart, FaSearch } from "react-icons/fa"

const Navbar1 = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo || "/placeholder.svg"} alt="Skill Market Logo" className="logo-img" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="What service are you looking for today?" />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>
      <div className="navbar-right">
        <FaBell className="icon" />
        <FaEnvelope className="icon" />
        <FaHeart className="icon" />
        <a href="#" className="nav-link">
          Orders
        </a>
        <a href="#" className="nav-link orange">
          Switch to Selling
        </a>
        <div className="avatar"></div>
      </div>
    </nav>
  )
}

export default Navbar1
