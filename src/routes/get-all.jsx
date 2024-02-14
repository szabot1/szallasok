import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";
import { Loader2 } from "lucide-react";
import { isValid } from "../App";

export default function List() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const navigate = useNavigate();

  const [places, setPlaces] = useState();

  useEffect(() => {
    fetch("https://nodejs.sulla.hu/data")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.filter((place) => isValid(place)));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="min-h-dvh w-full h-full flex flex-col">
      {!places && <Loader2 className="w-6 h-6 animate-spin mx-auto mt-4" />}

      {places && (
        <>
          <h1 className="text-center text-3xl mt-4 mb-8 font-semibold flex flex-row gap-4 items-center justify-center">
            Szallasok
            {isLoggedIn ? (
              <>
                <button
                  className="text-lg bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors duration-150 flex items-center gap-1"
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Uj
                </button>

                <button
                  className="text-lg bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-150 flex items-center gap-1"
                  onClick={() => {
                    localStorage.removeItem("loggedIn");
                    window.location.reload();
                  }}
                >
                  Kijelentkezes
                </button>
              </>
            ) : (
              <button
                className="text-lg bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors duration-150 flex items-center gap-1"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Bejelentkezes
              </button>
            )}
          </h1>

          <div className="flex justify-center flex-wrap gap-4">
            {places.map((place) => (
              <div
                className="flex flex-col gap-4 w-full mx-4 lg:mx-0 lg:w-1/4"
                key={place.id}
              >
                <div
                  className="bg-white shadow-md p-4 rounded-md hover:-translate-y-0.5 hover:scale-105 transition-transform duration-150 cursor-pointer"
                  onClick={() => {
                    navigate(`/get/${place.id}`);
                  }}
                >
                  <h2 className="text-xl font-semibold">{place.name}</h2>
                  <p className="text-gray-500">{place.location}</p>

                  <div className="mt-2 flex justify-between">
                    <div className="flex flex-row gap-2">
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

                      {isLoggedIn && (
                        <>
                          <button
                            className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition-colors duration-150 flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit/${place.id}`);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-150 flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              fetch(
                                `https://nodejs.sulla.hu/data/${place.id}`,
                                {
                                  method: "DELETE",
                                }
                              ).then(() => {
                                setPlaces(
                                  places.filter((p) => p.id !== place.id)
                                );
                              });
                            }}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex flex-row gap-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                        {place.price} &euro;
                      </span>

                      <span className="bg-teal-500 text-white px-2 py-1 rounded-md">
                        {place.minimum_nights}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
