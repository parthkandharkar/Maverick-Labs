// import  {useEffect} from 'react';
// import { useHistory, useLocation } from "react-router-dom";
// import { useState } from 'react'
// import { api } from '../../Api';
// import Moment from 'moment';


// const EditProject = () => {
//     const [name,setName]=useState(null)
//     const [description,setDescription]=useState(null)
//     const [startdate,setStartDate]=useState(null)
//     const [completiondate,setCompletionDate ]=useState(null)
//     const [clientid,setClientid]=useState(null)
//     const [error,setError]=useState(null)
//     const [clientdata,setClientData] = useState([])

//     const location = useLocation();

    

//     const handleName = (event) => {
//         setName(event.target.value);
// }

// const handleDescription = (event) => {
//     setDescription(event.target.value);
// }

// const handleStartDate = (event) => {
//     setStartDate(Moment(event.target.value).format('YYYY-MM-DD'));
// }

// const handleCompletionDate = (event) => {
//     setCompletionDate(Moment(event.target.value).format('YYYY-MM-DD'));
// }

// const handleClientid = (event) => {
//     // console.log(event.target.value)
//     setClientid(event.target.value);

// }


//     return (
//         <div class="container">
//             <h2 align="center">Edit Projects</h2>
//             <div class="form-group">
//                 <label class="mt-4 pt-3">Name:</label><br />
//                 <input type="text" class="form-control" placeholder="Enter project name"  onChange={handleName}></input><br />
//                 <label class="mt-4 pt-3">Description:</label><br />
//                 <input type="text" class="form-control" placeholder="Enter project Description" onChange={handleDescription}></input><br />
//                 <label class="mt-4 pt-3">Start Date:</label><br />
//                 <input type="date" class="form-control" placeholder="Enter Start Date" onChange={handleStartDate}></input><br />
//                 <label class="mt-4 pt-3">Completion Date:</label><br />
//                 <input type="date" class="form-control" placeholder="Enter Completion Date" onChange={handleCompletionDate}></input><br />
//                 <label class="mt-4 pt-3">Client Name:</label><br />
//                 {/* <select class="custom-select mb-3" id="inputGroupSelect01">
//                 <option selected>Client Name</option>
//                 {clientdata.map((obj) => {
//                 return (
//                     <option value={obj.id}>{obj.name}</option>
//                 );
//                 })}
//                 </select> */}
//                 <div align="center">
//                     <button type="submit" className="btn btn-lg bg-success">Submit</button>
//                 </div>
//                 <div class="text-center h2 text-danger">{error}</div>
//             </div>
//         </div>
//     )
// }

// export default EditProject;