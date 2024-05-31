import './App.css';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App () {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}>
          </Route> 
      </Switch>
    </Router>
  );
}

export default App;
