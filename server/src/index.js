// const express = require("express")
import express from 'express'
import cors from 'cors'
// we user cors to setup the rules between frontend and backend
import mongoose from 'mongoose'

import { userRouter } from '../routes/users.js'
import { recipeRouter } from '../routes/recipes.js'

const app = express();

app.use(express.json())
// whenever you send data from the frontend it'll convert into json
app.use(cors());

// whatever endpoints we're creating over "users.js", it'll automatically start with "/auth"
app.use("/auth",userRouter);
app.use("/recipes",recipeRouter);

mongoose.connect("mongodb+srv://root:root@recipes.73abpk5.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(5555, () => console.log("SERVER STARTED"));

