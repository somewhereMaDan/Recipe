import express from "express"
import mongoose from "mongoose";
import { RecipeModal } from '../models/Recipes.js'
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModal.find({});
    res.json(response);
  }
  catch (err) {
    res.json(err);
  }
})


router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModal(req.body)
  try {
    const response = await recipe.save();
    res.json(response);
  }
  catch (err) {
    res.json(err);
  }
})

router.put("/", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    const recipe = await RecipeModal.findById(req.body.recipeID)
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes, recipe })
  }
  catch (err) {
    res.json(err);
  }
})

router.get("/savedRecipies/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user.savedRecipes })
  } catch (error) {
    res.json(error)
  }
})

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    // This will find the only id's which will be in the user.savedRecipes (meaning which are saved recipes by user) 
    const savedRecipes = await RecipeModal.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes })
  } catch (error) {
    res.json(error)
  }
})

export { router as recipeRouter }