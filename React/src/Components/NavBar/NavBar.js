import axios from "axios";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {api} from './../../Api';

function NavBar()
{  
    const [error,setError] = useState(null)
    const history = useHistory()

    const handleHome = () => {
      history.push('/dashboard')
    }
    const handleProject = () => {
        history.push('/dashboard/projects')
    }
    const handleStint = () => {
        history.push('/dashboard/stints')
    }

    const handleVictory = () => {
      history.push('/dashboard/projects/chart/')
    }

    const handleEditProfile = () => {
      history.push('/dashboard/editprofile/')
    }

    const handlePassword = () => {
      history.push('/dashboard/changepassword/')
    }

    const handleLogout = () =>    {
     api.user.logout().then(() => {
      setError(null) 
      history.replace('/')
     }).catch(error => {
      const {msg} = error.response.data
      setError(msg)
    })
  }
    

    const handleClick = () => {
      history.goBack();
      }

      const handleClick1 = () => {
        history.goForward();
      }
return(
  <div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
          <li className="nav-item mx-3 text-light" role="button" onClick={handleHome}>
              Maverick Labs
            </li>
            <li className="nav-item mx-3" onClick={handleProject}>
              <a className="nav-link text-light" role="button">Projects</a>
            </li>
            <li className="nav-item mx-3" onClick={handleStint}>
              <a className="nav-link text-light" role="button">Stint</a>
            </li>
            <li className="nav-item mx-3" onClick={handleVictory}>
              <a className="nav-link text-light" role="button">Chart</a>
            </li> 
          </ul>

          <ul className="navbar-nav">
          
          <li className="nav-item" onClick={handleClick}>
                < a className = "nav-link text-light" class="glyphicon glyphicon-arrow-left" role="button">Back</a>
            </li>
          </ul>
    
          <ul className="navbar-nav ml-auto">

          {/* <li className="nav-item " onClick={handleEditProfile}>
                < a className = "nav-link text-light">EditProfile</a>
            </li> */}

          <li className="nav-item " onClick={handleLogout}>
                < a className = "nav-link text-light" class="glyphicon glyphicon-log-out" role="button">Logout</a>
            </li>
          </ul>
          
        </nav>
        <div align="right" class="mr-4">
        <button className="btn btn-lg btn-outline-primary text-center mr-4" onClick={handlePassword} >Change Password</button>
        <button className="btn btn-lg btn-outline-primary text-center" onClick={handleEditProfile}>EditProfile</button>    
      </div>
    </div>
  )
}

export default NavBar; 