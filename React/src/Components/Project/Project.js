import  {useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useState } from 'react'
import { api } from '../../Api';
import { data } from 'autoprefixer';
import lodash from 'lodash'


function Project()
{
    const [error,setError] = useState(null)
    const [project,setProject] = useState([])
    const [checkbox,setCheckBox]=useState([])
    
    const history = useHistory()
    const location= useLocation()


    const handleCheckBox = (event) => {
        if(event.target.checked) {
            const CheckedBoxes = lodash.concat(checkbox,event.target.value)
            setCheckBox(CheckedBoxes)
        }
        else {
            const CheckedBoxes = checkbox.filter(item => item !== event.target.value)
            setCheckBox(CheckedBoxes)
        }
    }
    
 
    const deleteProject = (data) => {
            api.project.destroy(data.id).then (()=> {
                const delProj = project.filter(item => item.id !== data.id)
                setProject(delProj)
                setError(null)
            }).catch((error) => {
                setError("Protected!Cannot Delete")
            })
    }


    useEffect(() => {
    api.project.list().then((response) => {
    setError(null)
    setProject(response.data);
    }).catch((error) => {
    const {message} = error.response.data
    setError(message)
    })
    },[])

    const handleAddProject =() => {
        history.push('/dashboard/projects/addproject')
    }

    const handleEditProjects = (data) => {
        history.push({
        pathname:'/dashboard/projects/editproject',
        state : data
     })
    }

    const handleMultipleDelete = () => {
        const serverPayload = {
            id : checkbox
        }
        console.log(serverPayload)
        api.project.delete1(serverPayload).then(() => {
            api.project.list().then((response) => {
                setError(null)
                setProject(response.data);
                setCheckBox([])
                }).catch((error) => {
                const {message} = error.response.data
                console.log(message)
                setError(message)
                })
            setError(null)
    }).catch((error) => {
        setError("Protected!Cannot Delete")
    })
 }
 
    return(
    <div>        
        <h1 align="center">Projects</h1>
        {/* {console.log(checkbox)} */}
        <table class="table text-center table-bordered table-hover">
        <thead className="thead-dark">
        <tr>
            <th scope="col"></th>
            <th scope="col"> Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">Completion Date</th>
            <th scope="col">Client Name</th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>  
            {project.map(item => {  
                return <tr key={item.id}>  
                    <td><input type="checkbox" value={item.id} onChange={handleCheckBox}></input></td>
                    <td>{item.name}</td>  
                    <td>{item.description}</td>  
                    <td>{item.start_date}</td>  
                    <td>{item.completion_date}</td>  
                    <td>{item.client.name}</td>
                    <td><button className="btn-grad1 text-center"  onClick={() => {handleEditProjects(item)}}>Edit</button></td>
                    <td><button className="btn-grad1 text-center"  onClick={() => {deleteProject(item)}}>Delete</button></td>    
                </tr>  
            })}  
        </tbody>  
        </table>
        <div align="center">
            <button className="btn btn-lg bg-success text-center" onClick={handleAddProject}>Add Project</button>
            {checkbox.length > 0 ?
          <button className="btn btn-lg bg-danger text-center ml-4"  onClick={handleMultipleDelete}>Delete</button>: null }
        </div>
        <div  class="text-center h2 text-danger">{error}</div>

    </div>
    )
};

export default Project;