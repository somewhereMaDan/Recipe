import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const [cookies, setCokkies] = useCookies(["Access_Token"])
  const navigate = useNavigate();
  // console.log(cookies.Access_Token)

  const logout = () => {
    setCokkies("Access_Token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      {!cookies.Access_Token ? (<Link to="/auth">Login/Register</Link>) : <button onClick={logout}>Logout</button>}
    </div>
  )
}