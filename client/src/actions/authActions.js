import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS } from './types'


//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })  
    );
};

//Login  - Get user token
export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data
      //Set token to localStorage
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}