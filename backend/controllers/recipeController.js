const getData = require("../utils/getData");
const setData = require("../utils/setData");

const crypto = require("crypto");

const data = getData();

exports.getAllRecipes = (req, res) => {
  let recipes = [...data];

  // If a search parameter is added, filter
  if (req.query.search) {
    const search = req.query.search.toLowerCase();

    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  // If there is an order parameter, sort the data accordingly
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "All recipes taken",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  // Search for the element with id in the array
  const found = data.find((i) => i.id === req.params.id);

  // If the product is not available, give an error
  if (!found) {
    res.status(404).json({
      message: "The element with the id you were looking for was not found. ",
    });
  }
  // Return reply
  res.status(200).json({ message: "Recipes taken", recipe: found });
};

exports.deleteRecipe = (req, res) => {
  // Find the order of the element to be deleted
  const index = data.findIndex((i) => i.id === req.params.id);
  // Remove element from array
  data.splice(index, 1);

  // Update json file
  setData(data);

  // Return reply
  res.status(204).json({ message: "Recipes deleted" });
};

exports.createRecipe = (req, res) => {
  // isteğin body'sine eriş
  const newRecipe = req.body;
  console.log(newRecipe);

  // Check data

  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Please fill in all values" });
  }

  // Add id
  newRecipe.id = crypto.randomUUID();

  // Update recipes thread
  data.push(newRecipe);

  setData(data);

  res.status(200).json({ message: "Recipe created", newRecipe });
};
