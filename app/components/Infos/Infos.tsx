"use client";
import { useEffect, useState } from "react";

export default function Infos() {
  const [user, setUser] = useState<any | null>(null);

  // Récupère l'utilisateur connecté
  useEffect(() => {
    const u = sessionStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) return <p className="bg-red-700 rounded-4xl px-2 w-fit text-white">Aucun utilisateur connecté</p>;

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Mes informations</h2>

      <p><strong>Pseudo :</strong> {user.pseudo}</p>
      <p><strong>Nom :</strong> {user.nom}</p>
      <p><strong>Prénom :</strong> {user.prenom}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
}