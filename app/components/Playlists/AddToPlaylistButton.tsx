"use client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Playlist {
  id: number;
  nom_playlist: string;
}

interface Props {
  videoId: number;
}

export default function AddToPlaylistButton({ videoId }: Props) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<{ id: number } | null>(null);

  // Récupérer l'utilisateur
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Charger les playlists de l'utilisateur
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/playlists/${user.id}`);
        const data = await res.json();
        setPlaylists(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur chargement playlists :", err);
      }
    };
    load();
  }, [user]);

  // Ajouter la vidéo à une playlist
  const addToPlaylist = async (id_playlist: number) => {
    try {
      const res = await fetch("http://localhost:3001/api/playlist_videos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_playlist, id_video: videoId }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Erreur ajout vidéo :", err);
      alert("Erreur lors de l'ajout de la vidéo");
    }
  };

  if (!user) return null;

  return (
    <div className="mt-2 p-4 flex gap-2 flex-wrap">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 w-full">Ajouter à une playlist :</h3>

      {/* Boutons des playlists existantes */}
      {playlists.map((pl) => (
        <button
          key={pl.id}
          className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition duration-150 cursor-pointer text-sm"
          onClick={() => addToPlaylist(pl.id)}
        >
          {pl.nom_playlist}
        </button>
      ))}
      {/* Lien + pour créer une nouvelle playlist */}
      <NavLink
        to="/profil#playlists"
        className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-600 transition duration-150 text-sm flex items-center justify-center">
          +
      </NavLink>
    </div>
  );
}