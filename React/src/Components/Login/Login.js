import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {api} from './../../Api';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../App.css';


function Login() 
 {   let history = useHistory();
     const [username,setuserName] = useState('')
     const [password,setpassword] = useState('')
     const [error,setError] = useState(null)
    
    
     const handleUsername = (event) => {
        setuserName(event.target.value);
    }

    const handlePassword = (event) => {
        setpassword(event.target.value);
    }

    const handleClick = () => {
      const serverPayload = {
        username :username,
        password: password
      }
      api.user.login(serverPayload).then(() => {
        history.push("/dashboard")
      }).catch(error => {
        const {msg} = error.response.data
        setError(msg)
      })
    } 

    const handleKey = (e) => {
      if(e.keyCode === 13) {
        handleClick();
      }
    }

    return (
      <div class='container-fluid' style={{backgroundColor:"#1c4f63",height:"100vh"}}>
        <div class="row p-5">
          <div class="col-sm-4"></div>
          <div class='col-sm-4 pt-4 my-2' style={{backgroundColor:"#3883a1"}}>
              <h3 class="text-center h1 text-light">Log in</h3>
              <label class="h6 pt-4">Username</label>
              <div class="input-group ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <i class="fa fa-user icon"></i>
                </span>
              </div>
              <input type="text" placeholder="Enter Username" class="form-control" onChange={handleUsername} />
            </div>

            <label class="h6 pt-4">Password</label>
            <div class="input-group ">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <i class="fa fa-key"></i>
                </span>
              </div>
              <input type="password" placeholder="Enter Password" class="form-control" onChange={handlePassword} onKeyDown={handleKey} />
            </div>
                  <div className="form-group py-5 ">
                        <button className ="btn-grad w-100 text-center" onClick={handleClick}>LOGIN</button>
                 </div>
                <div class="text-center h2 text-danger">{error}</div>
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div>
    )
  }

export default Login;