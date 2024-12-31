import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select/creatable";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Layout = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
};

const CreatePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/recipes", newRecipe),
    onSuccess: () => {
      toast.success("New recipe created");
      navigate("/");
    },
    onError: () => {
      toast.error("Recipe could not be created");
    },
  });

  const handleSubmit = (e) => {
    const index = Math.round(Math.random() * 89 + 10);
    e.preventDefault();
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,
      image: `https://picsum.photos/5${index}`,
    };

    mutate(newRecipe);
  };

  return (
    <div className="flex-1 h-screen p-4 overflow-auto bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-2xl gap-10 m-auto my-20"
      >
        <h1 className="text-3xl font-bold text-red-400">Create New Recipe</h1>

        <Layout label="Recipe Title">
          <input
            type="text"
            className="p-2 rounded-md focus:outline-red-400"
            name="recipeName"
            required
          />
        </Layout>

        <Layout label="Recipe Category">
          <input
            type="text"
            className="p-2 rounded-md focus:outline-red-400"
            name="category"
            required
          />
        </Layout>

        <Layout label="Recipe Time">
          <input
            type="number"
            className="p-2 rounded-md focus:outline-red-400"
            name="recipeTime"
            required
            min={3}
            max={500}
          />
        </Layout>

        <Layout label="Materials">
          <Select
            isMulti
            required
            onChange={(options) => setIngredients(options.map((i) => i.value))}
          />
        </Layout>

        <Layout label="Recipe Steps (pay attention to the order)">
          <Select
            isMulti
            required
            onChange={(options) => setInstructions(options.map((i) => i.value))}
          />
        </Layout>

        <Layout label="Presentation Suggestion">
          <textarea
            className="p-2 rounded-md focus:outline-red-400"
            name="servingSuggestion"
            required
          />
        </Layout>

        <div className="flex justify-end gap-6">
          <Link
            to={"/"}
            className="px-4 py-2 text-lg font-semibold text-white bg-gray-400 rounded-md hover:bg-gray-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 text-lg font-semibold text-white bg-red-400 rounded-md hover:bg-red-500"
          >
            {isLoading ? "Loading" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
