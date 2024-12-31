// Express import
const express = require("express");

// Functions import
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const getData = require("../utils/getData");

//  Define routes
const router = express.Router();

router.route("/").get(getAllRecipes).post(createRecipe);
router.route("/:id").get(getRecipe).delete(deleteRecipe);

module.exports = router;
