import { useState } from "react";
import type { FormEvent } from "react";

export default function RegisterForm() {

  // Message affiché pour notifier l'utilisateur (succès ou erreur)
  const [message, setMessage] = useState("");

  /**
   * handleSubmit()
   * Elle récupère les valeurs du formulaire et les envoie à l’API d’inscription.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // e.currentTarget représente le <form>, ce qui permet de lire ses champs
    const form = e.currentTarget;

    // Objet contenant toutes les données à envoyer au backend
    const data = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      prenom: (form.elements.namedItem("prenom") as HTMLInputElement).value,
      pseudo: (form.elements.namedItem("pseudo") as HTMLInputElement).value,
      mail: (form.elements.namedItem("mail") as HTMLInputElement).value,
      motdepasse: (form.elements.namedItem("motdepasse") as HTMLInputElement).value,
    };

    // Envoi au backend Node
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    // On affiche le message renvoyé par le backend
    setMessage(json.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-zinc-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-800 shadow p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl text-black dark:text-white font-bold text-center">Inscription</h1>

        {/* Champ NOM */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="nom" className="text-black dark:text-white font-medium">Nom :</label>
          <input
            id="nom"
            name="nom"
            type="text"
            placeholder="Votre nom"
            required
            className="border bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 border-gray-500 p-2 w-full rounded placeholder-gray-400"
          />
        </div>

        {/* Champ PRENOM */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="prenom" className="text-black dark:text-white font-medium">Prénom :</label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            placeholder="Votre prénom"
            required
            className="border bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 border-gray-500 p-2 w-full rounded placeholder-gray-400"
          />
        </div>

        {/* Champ PSEUDO */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="pseudo" className="text-black dark:text-white font-medium">Pseudo :</label>
          <input
            id="pseudo"
            name="pseudo"
            type="text"
            placeholder="Votre pseudonyme"
            required
            className="border bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 border-gray-500 p-2 w-full rounded placeholder-gray-400"
          />
        </div>

        {/* Champ EMAIL */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="mail" className="text-black dark:text-white font-medium">Email :</label>
          <input
            id="mail"
            name="mail"
            type="email"
            placeholder="Votre mail"
            required
            className="border bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 border-gray-500 p-2 w-full rounded placeholder-gray-400"
          />
        </div>

        {/* Champ MOT DE PASSE */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="motdepasse" className="text-black dark:text-white font-medium">Mot de passe :</label>
          <input
            id="motdepasse"
            name="motdepasse"
            type="password"
            placeholder="Votre mot de passe"
            required
            className="border bg-gray-50 dark:bg-neutral-800 dark:placeholder-gray-300 border-gray-500 p-2 w-full rounded placeholder-gray-400"
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$"
            title="6 caractères minimum, incluant une majuscule, une minuscule et un chiffre"
          />
        </div>

        <button className="bg-red-600 text-white w-full py-2 font-semibold rounded hover:bg-red-700 transition duration-150">
          Créer un compte
        </button>

        {message && (
          <p className="text-center text-green-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}