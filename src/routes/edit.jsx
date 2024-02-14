import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { isValid } from "../App";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    fetch("https://nodejs.sulla.hu/data/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (isValid(data)) {
          setPlace(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    event.persist();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const hostname = formData.get("hostname");
    const location = formData.get("location");
    const price = formData.get("price");
    const minimum_nights = formData.get("minimum_nights") + " nights";

    fetch("https://nodejs.sulla.hu/data/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        hostname,
        location,
        price: parseInt(price),
        minimum_nights,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/get/${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="min-h-dvh w-full h-full flex flex-col">
      {!place && <Loader2 className="w-6 h-6 animate-spin mx-auto mt-4" />}

      {place && (
        <>
          <h1 className="text-center text-3xl mt-4 mb-8 font-semibold flex flex-row gap-4 items-center justify-center">
            <button
              className="text-lg bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-150 flex items-center gap-1"
              onClick={() => {
                navigate("/get-all");
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Vissza
            </button>
            Szallas szerkesztese: {place.id}
          </h1>

          <div className="mx-auto w-1/2 bg-white shadow-md p-4 rounded-md">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nev"
                defaultValue={place.name}
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150"
              />

              <input
                type="text"
                name="hostname"
                placeholder="Hostname"
                defaultValue={place.hostname}
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
              />

              <input
                type="text"
                name="location"
                placeholder="Helyszin"
                defaultValue={place.location}
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
              />

              <input
                type="number"
                name="price"
                placeholder="Ar"
                defaultValue={place.price}
                min="1"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
              />

              <input
                type="number"
                name="minimum_nights"
                placeholder="Minimum ejszakak szama"
                defaultValue={place.minimum_nights.split(" ")[0]}
                min="1"
                className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-150 mx-auto block"
              >
                Szerkesztes
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
