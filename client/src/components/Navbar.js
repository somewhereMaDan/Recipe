import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const [cookies, setCokkies] = useCookies(["access_Token"])
  const navigate = useNavigate();

  const logout = () => {
    setCokkies("access_Token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }
  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>

      {!cookies.access_Token ? (
        <Link to="/auth">Login/Register</Link>
      ) :
        <>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      }
    </div>
  )
}