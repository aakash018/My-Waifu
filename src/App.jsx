
import './App.css';
// import SignUpForm from './Components/SignUpForm/SignUpForm';
import SignUp from "./Pages/SignUp/SignUp"
import Login from "./Pages/Login/Login"
import AuthProvider from './Context/AuthContext';
import Home from "./Pages/Home/Home";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from './Components/PrivateRoute';

function App() {
    
    return (
      <main>
          <AuthProvider>
          <Router>
            <Switch>
            {/* <Route path="/" component={Home} exact /> */}
            <PrivateRoute path="/" component={Home} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/forgot-password" component={ForgotPassword} exact/>
            <Route path="/signup" component={SignUp} exact/>
          </Switch>
          </Router>
          </AuthProvider>
      </main>
  )
}

export default App;
