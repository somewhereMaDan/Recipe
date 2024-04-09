import express from "express"
import mongoose from "mongoose";
import { RecipeModal } from '../models/Recipes.js'
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModal.find({});
    res.json(response);
  }
  catch {
    res.json(err);
  }
})


router.post("/", async (req, res) => {
  const recipe = new RecipeModal(req.body)
  try {
    const response = await recipe.save();
    res.json(response);
  }
  catch {
    res.json(err);
  }
})

router.put("/", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    const recipe = await RecipeModal.findById(req.body.recipeID)
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes , recipe})
  }
  catch {
    res.json(err);
  }
})

export { router as recipeRouter }