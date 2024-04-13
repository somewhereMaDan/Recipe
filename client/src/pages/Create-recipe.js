import { useState, React } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export function CreateRecipe() {
  const userID = useGetUserID();
  const navigate = useNavigate();
  
  const [cookies, _] = useCookies(["access_Token"])
  const [recipe, setrecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setrecipe({ ...recipe, [name]: value })
    // the the previous data will be unchanged only when the "handleChange" function is called 
    // name(which a key for an input) which will give value with event.target and ([key] : value), like this
    // recipe object will get updated.
  }

  const handleIngrediantChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients; // we're just taking the original array, so we could perform an update in it
    ingredients[index] = value
    setrecipe({ ...recipe, ingredients: ingredients })
    // here in "ingredients" array of recipe objects will get updated by new
    // "ingredients" array in which we updated the value of the index ingredients[index] = value
  }

  const addIngredient = () => {
    setrecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    // ...recipe this will remain same though what we put after the "," will update the "Recipe" Object
    // ingredients: [...recipe.ingredients, ] this will take all the previous ingredients data 
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/recipes", recipe, {
        headers: { authorization: cookies.access_Token }
      });
      alert("Recipe has been created");
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={handleChange} />
        {/* the "name" property in input will serve as key in the "recipe" object */}

        <label htmlFor='ingredients'>Ingredients</label>
        {
          recipe.ingredients.map((ingredient, index) => {
            return (
              <input
                key={index}
                type='text'
                name='ingredients'
                value={ingredient}
                onChange={(event) => handleIngrediantChange(event, index)}
              ></input>
            )
          })
        }
        <button onClick={addIngredient} type='button'>Add Ingredient</button>

        <label htmlFor='instructions'>Instructions</label>
        <input type='text' id='instructions' name='instructions' onChange={handleChange} />

        <label htmlFor='imageUrl'>Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />

        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />

        <button type='submit'>CreateRecipe</button>
      </form>
    </div>
  )
}
