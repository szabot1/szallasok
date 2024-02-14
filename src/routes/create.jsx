import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Edit() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    event.persist();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const hostname = formData.get("hostname");
    const location = formData.get("location");
    const price = formData.get("price");
    const minimum_nights = formData.get("minimum_nights") + " nights";

    fetch("https://nodejs.sulla.hu/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        name,
        hostname,
        location,
        price: parseInt(price),
        minimum_nights,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/get-all`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="min-h-dvh w-full h-full flex flex-col">
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
        Szallas letrehozasa
      </h1>

      <div className="mx-auto w-1/2 bg-white shadow-md p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nev"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150"
          />

          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
          />

          <input
            type="text"
            name="location"
            placeholder="Helyszin"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
          />

          <input
            type="number"
            name="price"
            placeholder="Ar"
            min="1"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
          />

          <input
            type="number"
            name="minimum_nights"
            placeholder="Minimum ejszakak szama"
            min="1"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-150 mx-auto block"
          >
            Letrehozas
          </button>
        </form>
      </div>
    </main>
  );
}
