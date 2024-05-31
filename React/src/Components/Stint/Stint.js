import react,{component, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import { api } from '../../Api';
import lodash from 'lodash'


function Stint()
{
    const history = useHistory();
    const [error,setError] = useState(null)
    const[stint,setStint] = useState([])
    const[checkbox,setCheckBox]=useState([])


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


    const handleAddStint = () => {
        history.push('/dashboard/stints/addstint')
    }


    const deleteStint = (data) => {
        api.stint.destroy(data.id).then (()=> {
            const delStint = stint.filter(item => item.id !== data.id)
            setStint(delStint)
            setError(null)
        }).catch((error) => {
            setError("Cannot Delete")
        })
}


    const handleEditStint = (data) => {
        history.push({
        pathname:'/dashboard/stints/editstint',
        state : data
     })
    }

    useEffect(() => {
        api.stint.list().then((response) => {
          setError(null)
          setStint(response.data);
          console.log(response.data);
        }).catch((error) => {
          const {message} = error.response.data
          setError(message)
        })
      },[])


      const handleMultipleDelete = () => {
        const serverPayload = {
            id : checkbox
        }
        console.log(serverPayload)
        api.stint.delete1(serverPayload).then(() => {
            api.stint.list().then((response) => {
                setError(null)
                setStint(response.data);
                setCheckBox([])
                console.log(response.data);
              }).catch((error) => {
                const {message} = error.response.data
                setError(message)
              })
    }).catch((error) =>{
        setError("Protected!Cannote Delete")
    })
}


    return(
        <div>
            <h1 align="center">Stints</h1>
            {console.log(checkbox)}
            <table class="table text-center table-bordered table-hover">
        <thead className="thead-dark">
        <tr>
            <th scope="col"></th>
            <th scope="col">Role</th>
            <th scope="col">Contribution</th>
            <th scope="col">Project Name</th>
            <th scope="col">Employee Name</th>
            <th scope="col"></th>
            <th scope="col"></th>            
        </tr>
        </thead>
        <tbody>
        {stint.map(item => {  
                return <tr key={item.id}>  
                    <td><input type="checkbox" value={item.id} onClick={handleCheckBox}></input></td>
                    <td>{item.role}</td>  
                    <td>{item.contribution}</td>
                    <td>{item.project.name}</td>
                    <td>{item.employee.first_name}</td>
                    <td><button className="btn-grad1 text-center" onClick={() => {handleEditStint(item)}}>Edit</button></td>
                    <td><button className="btn-grad1 text-center" onClick={() => {deleteStint(item)}}  >Delete</button></td>  
                        
                </tr>  
            })}  
        </tbody>
        </table>
        <div align="center" class="mb-5">
            <button className="btn btn-lg bg-success text-center" onClick={handleAddStint}>Add Stint</button>
            {checkbox.length > 0 ?
            <button className="btn btn-lg bg-danger text-center ml-4" onClick={handleMultipleDelete}>Delete</button> : null }
        </div>
        </div>
    );
}

export default Stint;