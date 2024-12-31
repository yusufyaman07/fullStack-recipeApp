import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import NotFounded from "../../components/notFounded";
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");

  const debounceTerm = useDebounce(searchTerm, 300);

  const params = {
    search: debounceTerm,
    order,
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", debounceTerm, order],
    queryFn: () => api.get("/api/recipes", { params }).then((res) => res.data),
  });

  return (
    <main className="flex-1 p-4 overflow-auto bg-gray-200">
      {/* Form */}
      <section>
        <div className="flex items-center gap-3 p-2 overflow-hidden bg-white rounded-lg shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="w-full outline-none"
          />
        </div>
      </section>
      {/*  */}
      <section>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="my-5 text-3xl">{data.results} recipe founded</h1>

              <select
                onChange={(e) => setOrder(e.target.value)}
                className="p-2 rounded-md"
                defaultValue=""
                aria-label="Sort by duration"
              >
                <option value="" disabled>
                  By duration
                </option>
                <option value="asc">Growing</option>
                <option value="desc">Decreasing</option>
              </select>
            </div>
            {data.recipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {data.recipes.map((recipe) => (
                  <Card key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="tv-container">
                <NotFounded />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
