import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is default valut which we put for hashing

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  // this will save the newUser inside the DB 
  res.json({ message: "User Registered Successfully" });
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  console.log(user)

  if (!user) {
    return res.json({ message: "User doesn't exist!" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  // this will compare the password given by the user (password) by the password which is stored in DB (user.password)

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  // this is how we generate a token, in this case we have sign for user_id(which mongoDB by default created)
  // and this "secret" string we'll use whenever we want to verify a user (to authenticate)

  res.json({ token, userID: user._id });
})

export { router as userRouter };