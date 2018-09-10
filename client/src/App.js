import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

//Css
import './App.css';

//Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dasboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';

//Check for token
if (localStorage.jwtToken) {
  //Set the auth Token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className='App'>
            <Navbar />
              <Route exact path='/' component={ Landing } />
              <div className='container'>
                <Route exact path='/register' component={ Register } />
                <Route exact path='/login' component={ Login } />
                <Route exact path='/dashboard' component={ Dashboard } />
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
