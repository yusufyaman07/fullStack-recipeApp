import { Link } from "react-router-dom";
import { GoClock } from "react-icons/go";
const Card = ({ recipe }) => {
  return (
    <Link
      className="p-4 transition bg-white rounded-lg hover:bg-gray-100"
      to={`recipe/${recipe.id}`}
    >
      <div className="relative">
        <img
          className="rounded-lg h-[150px] w-full object-cover"
          src={recipe.image}
          alt="image"
        />

        <p className="absolute flex items-center gap-2 p-1 font-semibold bg-white rounded-lg bottom-1 left-1">
          <GoClock />
          <span>{recipe.recipeTime} minutes </span>
        </p>
      </div>

      <h2 className="my-3 text-lg font-semibold">{recipe.recipeName} </h2>
      <p className="text-gray-500">{recipe.category} </p>
      <p className="flex gap-3 mt-3">
        <span className="p-1 bg-gray-300 rounded-md line-clamp-1">
          {recipe.ingredients[0]}
        </span>
        {recipe.ingredients[1] && (
          <span className="p-1 bg-gray-300 rounded-md line-clamp-1">
            {recipe.ingredients[1]}
          </span>
        )}
      </p>
    </Link>
  );
};

export default Card;
