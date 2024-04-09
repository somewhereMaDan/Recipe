import React, { useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

export function Auth() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [_, setCokkies] = useCookies(["Access_Token"])
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/auth/login", {
        username,
        password,
      })
        .then((res) => {
          setCokkies("Access_Token", res.data.token);
          window.localStorage.setItem("userID", res.data.userID);
          navigate("/")
        });
      // setCokkies("Access_Token", response.data.token)
      // window.localStorage.setItem("userID", response.data.userID);
      // navigate("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='auth-container'>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='username'> Username: </label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'> Password: </label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

const Register = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/auth/register", { username, password });
      setUsername("")
      setPassword("")
      alert("Registration Completed, now Login!")
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className='auth-container'>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor='username'> Username: </label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'> Password: </label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}