import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginForm() {

  // Message renvoyé par le backend (erreur ou succès)
  const [message, setMessage] = useState("");

  /* Récupère les données du formulaire et tente une connexion via l'API.
    puis stocke l'utilisateur dans sessionStorage. */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Données envoyées au backend
    const data = {
      mail: (form.elements.namedItem("mail") as HTMLInputElement).value,
      motdepasse: (form.elements.namedItem("motdepasse") as HTMLInputElement).value,
    };

    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setMessage(json.message);

    // Si la connexion réussit : on sauvegarde l'utilisateur
    if (json.success && json.user) {
      sessionStorage.setItem("user", JSON.stringify(json.user));
      window.location.href = "/";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-zinc-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-800 shadow p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl text-black dark:text-white font-bold text-center">Connexion</h1>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="mail" className="text-black dark:text-white font-medium">Email :</label>
          <input
            id="mail"
            name="mail"
            type="email"
            placeholder="Votre mail"
            required
            className="border border-gray-500 placeholder-gray-400 bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="motdepasse" className="text-black dark:text-white font-medium">Mot de passe :</label>
          <input
            id="motdepasse"
            name="motdepasse"
            type="password"
            placeholder="Votre mot de passe"
            required
            className="border border-gray-500 placeholder-gray-400 bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 p-2 w-full rounded"
          />
        </div>

        <button className="bg-red-600 text-white font-semibold w-full py-2 rounded hover:bg-red-700">
          Se connecter
        </button>

        {message && (
          <p className="text-center text-red-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}