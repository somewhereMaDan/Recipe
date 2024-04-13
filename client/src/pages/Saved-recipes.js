import axios from 'axios';
import { React, useEffect, useId, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';

export function SavedRecipes() {
  const userID = useGetUserID()
  const [SavedRecipes, setSavedRecipes] = useState([]);
  const [Loading, setLoading] = useState(true)

  const fetchSavedRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/recipes/savedRecipes/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSavedRecipe();
  }, [])

  if (Loading) {
    return <h1>Loading...</h1>
  }


  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {
          SavedRecipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
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