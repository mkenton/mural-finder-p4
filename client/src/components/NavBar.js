import React from 'react'
import {NavLink} from 'react-router-dom'
import  {Button}  from "../styles";

export default function Navbar({handleLogoutClick}){
    return(
    <nav className="navbar">
          {/* <NavLink activeClassName="active-nav" className="login-link" to="/loginpage">Login</NavLink> */}
          <Button className="login-link" onClick={handleLogoutClick}>
            Logout
          </Button>
          <NavLink exact activeClassName="active-nav" className="navbar-links" to="/">MAP</NavLink>
          <NavLink activeClassName="active-nav" className="navbar-links" to="/contributions">CONTRIBUTIONS</NavLink>
          <NavLink activeClassName="active-nav" className="navbar-links" to="/bucketlist">BUCKET LIST</NavLink>
        </nav>
    )
}
