import  {useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useState } from 'react'
import { api } from '../../Api';
import Moment from 'moment';


const AddProject = () => {
    const [ProjectID,setProjectID]=useState(null)
    const [name,setName]=useState(null)
    const [description,setDescription]=useState(null)
    const [startdate,setStartDate]=useState(null)
    const [completiondate,setCompletionDate ]=useState(null)
    const [clientid,setClientid]=useState(null)
    const [error,setError]=useState(null)
    const [clientname,setClientName]=useState("Client Name")
    const [clientdata,setClientData] = useState([])

    const history = useHistory()
    const location = useLocation();

    const handleName = (event) => {
            setName(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleStartDate = (event) => {
        setStartDate(Moment(event.target.value).format('YYYY-MM-DD'));
    }

    const handleCompletionDate = (event) => {
        setCompletionDate(Moment(event.target.value).format('YYYY-MM-DD'));
    }

    const handleClientid = (event) => {
         console.log(event.target.value)
        setClientid(event.target.value);

    }
  
    useEffect(() => {
        api.client.list().then((response) => {
        setError(null)
        
        setClientData(response.data);
        
        }).catch((error) => {
        const {message} = error.response.data
        setError(message)
        })
        },[])



    useEffect(() => {
        if(!location.state) return 
        setName(location.state.name)
        setDescription(location.state.description)
        setStartDate(location.state.start_date)
        setCompletionDate(location.state.completion_date)
        setClientName(location.state.client.name)
        setClientid(location.state.client.id)
        setProjectID(location.state.id)
    },[location.state])

    const handleClick1 = () => {
        if(!location.state)
        {
        const serverPayload = {
            name:name,
            description:description,
            start_date:startdate,
            completion_date:completiondate,
            client_id:clientid
        }
        api.project.create(serverPayload).then(() => {
            history.push('/dashboard/projects')
        }).catch(error => {
            const {msg} = error.response.data
            setError(msg)
        })
    }
    else 
    {
        const serverPayload = {
            name:name,
            description:description,
            start_date:startdate,
            completion_date:completiondate,
            client_id:clientid
        }
        api.project.partial_update(ProjectID,serverPayload).then(() => {
            history.push('/dashboard/projects')
        }).catch(error => {
            const {msg} = error.response.data
            setError(msg)
        }) 
    }
 }


    return (
        <div class='container'>
            <h1 align="center">Add/Edit Project</h1>
            <div class="form-group">
                <label class="mt-4 pt-3">Name:</label><br />
                <input type="text" class="form-control" placeholder="Enter project name" value={name} onChange={handleName}></input><br />
                <label class="mt-4 pt-3">Description:</label><br />
                <input type="text" class="form-control" placeholder="Enter project Description" value={description} onChange={handleDescription}></input><br />
                <label class="mt-4 pt-3">Start Date:</label><br />
                <input type="date" class="form-control" placeholder="Enter Start Date" value={startdate} onChange={handleStartDate}></input><br />
                <label class="mt-4 pt-3">Completion Date:</label><br />
                <input type="date" class="form-control" placeholder="Enter Completion Date" value={completiondate} onChange={handleCompletionDate}></input><br />
                <label class="mt-4 pt-3">Client Name:</label><br />
                <select class="custom-select mb-3" id="inputGroupSelect01" onChange={handleClientid}>
                <option selected>{clientname}</option>
                {clientdata.map((obj) => {
                return (
                    <option value={obj.id}>{obj.name}</option>
                );
                })}
                </select>
                <div align="center">
                    <button type="submit" className="btn btn-lg bg-success" onClick={handleClick1}>Submit</button>
                </div>
                <div class="text-center h2 text-danger">{error}</div>
            </div>
            
        </div>
    );
}

export default AddProject;