import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Api";

const EditProfile = () => {
    const [employeeid,setEmployeeid]=useState()
    const [username,setUsername]=useState()
    const [firstname,setFirstName]=useState()
    const [lastname,setLastName]=useState()
    const [email,setEmail]=useState()
    const [designation,setDesignation]=useState()
    const [error,setError]=useState()

    const history = useHistory()

    useEffect(() => {
        api.user.details().then((response)=>{
            setError(null)
            setEmployeeid(response.data.id)
            setUsername(response.data.username)
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setEmail(response.data.email)
            setDesignation(response.data.designation)
        }).catch((error)=>{
            const {msg} = error.response.data
            setError(msg)
        })
    },[])

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleDesignation = (event) => {
        setDesignation(event.target.value)
    }

    const handleClick = () => {
        const serverPayload = {
            username:username,
            first_name:firstname,
            last_name:lastname,
            email:email,
            designation:designation
        }
        api.user.partial_update(employeeid,serverPayload).then(() => {
            setError(null)
            history.push('/dashboard')
        }).catch(error => {
            // const {msg}=error.response.data
            setError('Invalid')
        })
    }

    return(
        <div class='container'>
            <h1 align="center">Edit Profile</h1>
            <div class="form-group">
                <label class="mt-4 pt-3">Username:</label><br />
                <input type="text" class="form-control" placeholder="Enter username" value={username} onChange={handleUsername}></input><br />
                <label class="mt-4 pt-3">First Name:</label><br />
                <input type="text" class="form-control" placeholder="Enter First Name" value={firstname} onChange={handleFirstName}></input><br />
                <label class="mt-4 pt-3">Last Name:</label><br />
                <input type="text" class="form-control" placeholder="Enter Last Name" value={lastname} onChange={handleLastName}></input><br />
                <label class="mt-4 pt-3">Email:</label><br />
                <input type="text" class="form-control" placeholder="Enter Email" value={email} onChange={handleEmail}></input><br />
                <label class="mt-4 pt-3">Designation:</label><br />
                <input type="text" class="form-control" placeholder="Enter Designation" value={designation} onChange={handleDesignation}></input><br />
            </div>
            <div align="center">
                    <button type="submit" className="btn btn-lg bg-success" onClick={handleClick}>Submit</button>
                </div>
                <div class="text-center h2 text-danger">{error}</div>
        </div>
    )
}

export default EditProfile;