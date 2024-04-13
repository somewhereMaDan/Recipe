import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

export function Home() {
  const userID = useGetUserID()
  const [Recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([])
  const [Loading, setLoading] = useState(true)
  const [cookies, _] = useCookies(["access_Token"])

  const init = async (e) => {
    try {
      const response = await axios.get("http://localhost:5555/recipes");
      setRecipes(response.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  const fetchSavedRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/recipes/savedRecipies/ids/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }
  useEffect(() => {
    init();
    if(cookies.access_Token) fetchSavedRecipe();
  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:5555/recipes",
        {
          recipeID,
          userID
        },
        { headers: { authorization: cookies.access_Token } }
      );
      setSavedRecipes(response.data.savedRecipes)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }
  if (Loading) {
    return <h1>Loading...</h1>
  }

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id)
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {
          Recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <button onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}>
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>
                <div className='instructions'>
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}