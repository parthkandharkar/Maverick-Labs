import NavBar from '../NavBar/NavBar';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Project from '../Project/Project';
import Stint from '../Stint/Stint';
import AddProject from './../Project/AddProject';
import AddStint from './../Stint/AddStint';
import Vict from './../Vict/Vict';
import EditProfile from './../EditProfile/EditProfile';
import EditProject from './../Project/EditProject';
import Password from '../Password/Password';

function Dashboard() 
 {
  return(
    <div>
      <NavBar />

     
      <Route exact path="/dashboard" component={Project}></Route>
      <Route exact path="/dashboard/editprofile" component={EditProfile}></Route> 
      <Route exact path="/dashboard/changepassword" component={Password}></Route>
      <Route exact path="/dashboard/projects/addproject" component={AddProject}></Route> 
      <Route exact path="/dashboard/stints/addstint" component={AddStint}></Route>
      <Route exact path="/dashboard/stints/editstint" component={AddStint}></Route>
      <Route exact path="/dashboard/projects/editproject" component={AddProject}></Route> 
      <Route exact path="/dashboard/projects" component={Project}></Route> 
      <Route exact path="/dashboard/stints" component={Stint}></Route>
      <Route exact path="/dashboard/projects/chart" component={Vict}></Route>
     

    </div>
    )
          }
export default Dashboard;