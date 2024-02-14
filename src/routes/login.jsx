import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    event.persist();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "admin") {
      setIsInvalid(false);
      localStorage.setItem("loggedIn", "true");
      navigate("/get-all");
    } else {
      setIsInvalid(true);
    }
  }

  return (
    <main className="min-h-dvh w-full h-full flex flex-col">
      <h1 className="text-center text-3xl mt-4 mb-8 font-semibold">
        Bejelentkezes
      </h1>

      <div className="mx-auto w-1/2 bg-white shadow-md p-4 rounded-md">
        {isInvalid && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded-md">
            Hibas felhasznalonev vagy jelszo
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Felhasznalonev"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150"
          />

          <input
            type="password"
            name="password"
            placeholder="Jelszo"
            className="w-full p-2 border-2 border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors duration-150 mt-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-150 mx-auto block"
          >
            Bejelentkezes
          </button>
        </form>
      </div>
    </main>
  );
}
