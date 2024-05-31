import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Api";

const Password = () => {
    const [newpassword,setNewPassword]=useState()
    const [confirmpassword,setConfirmPassword]=useState()
    const [error,setError]=useState()

    const history =useHistory()

    useEffect(() => {
        api.user.details().then(()=>{
            setError(null)
        }).catch(error => {
            const {msg}=error.response.data
            setError(msg)
    })
    },[])

    const handleNewPassword = (event) => {
        return setNewPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        return setConfirmPassword(event.target.value)
    }

    const handleClick = () => {
        if(newpassword === confirmpassword) {
            const serverPayload = {
                password:newpassword
            }
            api.user.password(serverPayload).then(() => {
                setError(null)
                history.push('/dashboard')
            }).catch(error => {
                setError("Incorrect")
            })
        } else {
            setError("Re-Enter Password")
        }
    }

    return(
        <div class='container'>
            <h1 align="center">Change Password</h1>
            <div class="form-group">
                <label class="mt-4 pt-3">Enter new Password:</label><br />
                <input type="password" class="form-control" placeholder="Enter new password" onChange={handleNewPassword} ></input><br />
                <label class="mt-4 pt-3">Re-Confirm new Password:</label><br />
                <input type="password" class="form-control" placeholder="Re-Enter new password" onChange={handleConfirmPassword} ></input><br />
            </div>
            <div align="center">
                <button type="submit" className="btn btn-lg bg-success" onClick={handleClick}>Submit</button>
            </div>
            <div class="text-center h2 text-danger">{error}</div>
        </div>    
    )
}

export default Password;