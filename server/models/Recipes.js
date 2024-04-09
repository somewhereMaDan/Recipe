import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imgUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
})

// array of strings (ingredients)


export const RecipeModal = mongoose.model("recipes", RecipeSchema);