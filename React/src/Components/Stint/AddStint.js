import  {useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useState } from 'react'
import { api } from '../../Api';
import Moment from 'moment';


const AddStint = () => {
    const [role,setRole]=useState(null)
    const [contribution,setContribution]=useState(null)
    const [employeedata,setEmployeeData]=useState([])
    const [employeename,setEmployeeName]=useState("Employee Name")
    const [employeeid,setEmployeeid]=useState(null)
    const [projectdata,setProjectData]=useState([])
    const [projectname,setProjectName]=useState("Project Name")
    const [projectid,setProjectid]=useState(null)
    const [error,setError]=useState(null)
    const [StintID,setStintID]=useState(null)


    const history = useHistory()
    const location = useLocation();

    const handleRole = (event) => {
        setRole(event.target.value)
    }

    const handleContribution = (event) => {
        setContribution(event.target.value)
    }

    const handleProjectId = (event) => {
        setProjectid(event.target.value)
    }

    const handleEmployeeId = (event) => {
        setEmployeeid(event.target.value)
    }


    useEffect(() => {
        api.project.list().then((response) => {
        setError(null)
        
        setProjectData(response.data);
        
        }).catch((error) => {
        const {message} = error.response.data
        setError(message)
        })
    },[])
    useEffect(() => {
        api.employee.list().then((response) => {
            setError(null)
            // console.log(response.data);
            setEmployeeData(response.data);
            
            }).catch((error) => {
            const {message} = error.response.data
            setError(message)
            })

        },[])
  

        useEffect(() => {
            if(!location.state) return
            console.log(location.state)
            setRole(location.state.role)
            setContribution(location.state.contribution)
            setEmployeeName(location.state.employee.first_name)
            setProjectName(location.state.project.name)
            setStintID(location.state.id)
            setProjectid(location.state.project.id)
            setEmployeeid(location.state.employee.id)
        },[location.state])
        
        const handleClick2 = () =>   {
            if(!location.state)
        {
            const serverPayload = {
                role:role,
                contribution:contribution,
                project_id:projectid,
                employee_id:employeeid
            }
            console.log(serverPayload)
            api.stint.create(serverPayload).then(() => {
                history.push('/dashboard/stints')
            }).catch(error => {
                const {msg} = error.response.data
                setError(msg)
            })
        }
        else {
            const serverPayload = {
                role:role,
                contribution:contribution,
                project_id:projectid,
                employee_id:employeeid
            }
            console.log(serverPayload)
            api.stint.partial_update(StintID,serverPayload).then(() => {
                history.push('/dashboard/stints')
            }).catch(error => {
                const {msg} = error.response.data
                setError(msg)
            })
        }
    }


    return (
        <div class='container'>
            <h1 align="center">Add/Edit Stint</h1>
            <div class="form-group">
                <label class="mt-4 pt-3">Role:</label><br />
                <input type="text" class="form-control" placeholder="Enter Role" value={role} onChange={handleRole}></input><br />

                <label class="mt-4 pt-3">Contribution:</label><br />
                <input type="text" class="form-control" placeholder="Enter Contribution" value={contribution} onChange={handleContribution}></input><br />                
                
                <label class="mt-4 pt-3">Project Name:</label><br />
                <select class="custom-select mb-3" id="inputGroupSelect01" onChange={handleProjectId}>
                <option selected>{projectname}</option>
                {projectdata.map((obj) => {
                return (
                    <option value={obj.id}>{obj.name}</option>
                );
                })}
                </select>
                
                <label class="mt-4 pt-3">Employee Name:</label><br />
                <select class="custom-select mb-3" id="inputGroupSelect01"  onChange={handleEmployeeId}>
                <option selected>{employeename}</option>
                {employeedata.map((obj) => {
                return (
                    <option value={obj.id}>{obj.first_name}</option>
                );
                })}
                </select>
            
                <div align="center">
                    <button type="submit" className="btn btn-lg bg-success" onClick={handleClick2}>Submit</button>
                </div>
                <div class="text-center h2 text-danger">{error}</div>
            </div>
            
        </div>
    )
}

export default AddStint;