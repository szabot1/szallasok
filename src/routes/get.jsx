import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { isValid } from "../App";

export default function Get() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [place, setPlace] = useState();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

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
            Szallas: {id}
          </h1>

          <div className="flex justify-center flex-wrap gap-4">
            <div className="flex flex-col gap-4 w-1/2" key={place.id}>
              <div className="bg-white shadow-md p-4 rounded-md">
                <h2 className="text-xl font-semibold">{place.name}</h2>
                <p className="text-gray-500">{place.location}</p>

                <div className="mt-2 flex justify-between">
                  <a
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-150"
                    href={
                      place.hostname.startsWith("http")
                        ? place.hostname
                        : `https://${place.hostname}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Megtekint
                  </a>

                  <div className="flex flex-row gap-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                      {place.price} &euro;
                    </span>

                    <span className="bg-teal-500 text-white px-2 py-1 rounded-md">
                      {place.minimum_nights}
                    </span>
                  </div>
                </div>

                {isLoggedIn && (
                  <div className="flex flex-row justify-between mt-2">
                    <button
                      className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition-colors duration-150 flex items-center gap-1"
                      onClick={() => {
                        navigate(`/edit/${place.id}`);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-150 flex items-center gap-1"
                      onClick={() => {
                        fetch(`https://nodejs.sulla.hu/data/${place.id}`, {
                          method: "DELETE",
                        }).then(() => {
                          navigate("/get-all");
                        });
                      }}
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
