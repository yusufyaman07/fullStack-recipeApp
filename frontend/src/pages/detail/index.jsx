import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack, IoTrashSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";

const DetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get(`api/recipes/${id}`).then((res) => res.data.recipe),
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/api/recipes/${id}`),

    onSuccess: () => {
      navigate("/");
      toast.success("Recipe successfully deleted");
    },

    onError: () => {
      toast.success("Create an error when deleting recipe");
    },
  });

  return (
    <div className="flex-1 h-screen p-5 overflow-auto bg-gray-200">
      {/* Top */}
      <div className="flex justify-between">
        <Link
          disabled={isLoading}
          to={-1}
          className="flex items-center gap-4 p-1 text-xl rounded-md hover:bg-gray-300"
        >
          <IoArrowBack />
          Back
        </Link>
        <button
          onClick={() => deleteMutation.mutate()}
          className="flex items-center gap-3 px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
        >
          <IoTrashSharp />
          {isLoading ? "Loading" : "Delete"}
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <div className="flex flex-col max-w-5xl gap-10 m-auto my-10">
          {<h1 className="text-3xl font-bold">{data.recipeName} </h1>}
          <div className="flex gap-4">
            <span className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg">
              {data.category}{" "}
            </span>
            <span className="flex items-center gap-3 px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg">
              <FaRegClock /> {data.recipeTime}
            </span>
          </div>
          <img
            className="rounded-lg max-h-[400px]"
            src={data.image}
            alt={data.recipeName}
          />

          <div>
            <h1 className="mb-4 text-2xl font-bold text-red-400">Materials</h1>
            <ul className="text-lg font-semibold">
              {data.ingredients.map((i, index) => (
                <li key={index}>{i} </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="mb-4 text-2xl font-bold text-red-400">Recipe</h1>
            <ol className="text-lg font-semibold list-decimal ps-4">
              {data.instructions.map((i, index) => (
                <li key={index}>{i} </li>
              ))}
            </ol>
          </div>

          <div>
            <h1 className="mb-4 text-2xl font-bold text-red-400">
              Presentation suggestion
            </h1>
            <p>{data.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
