// Express import
const express = require("express");
const cors = require("cors");

// Routes imports
const recipeRouter = require("./routes/recipeRoutes");

// Create an express app
const app = express();

// Middleware import that solves cors error
app.use(cors());

// Middleware that translates data in the body
app.use(express.json());

// Introduce recipe routes to the server
app.use("/api/recipes", recipeRouter);

app.listen(4000, () => {
  console.log(`Server 4000. portta ayağa kalktı`);
});
