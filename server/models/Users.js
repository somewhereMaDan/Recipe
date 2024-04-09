import moongoose from 'mongoose'

const UserSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  savedRecipes: [{type: moongoose.Schema.Types.ObjectId, ref: "recipes"}]
})

export const UserModel = moongoose.model("users", UserSchema);

