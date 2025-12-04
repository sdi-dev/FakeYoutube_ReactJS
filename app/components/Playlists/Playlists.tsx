"use client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function Playlists() {
    const [user, setUser] = useState<{ id: number } | null>(null);
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [videos, setVideos] = useState<Record<number, any[]>>({});
    const [newName, setNewName] = useState("");

    // Charger l'utilisateur
    useEffect(() => {
        const u = sessionStorage.getItem("user");
        if (u) setUser(JSON.parse(u));
    }, []);

    // Charger playlists
    const loadPlaylists = async () => {
        if (!user) return;
        try {
        const res = await fetch(`http://localhost:3001/api/playlists/${user.id}`);
        setPlaylists(await res.json());
        } catch (err) {
        console.error("Erreur GET playlists :", err);
        }
    };

    useEffect(() => {
        if (user) loadPlaylists();
    }, [user]);

    // CRUD playlist
    const create = async () => {
        if (!user || !newName.trim()) return alert("Nom de playlist obligatoire");
        if (playlists.length >= 20) return alert("Maximum 20 playlists");

        try {
        await fetch("http://localhost:3001/api/playlists/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_utilisateur: user.id, nom_playlist: newName }),
        });
        setNewName("");
        loadPlaylists();
        } catch (e) {
            console.error("Erreur création playlist :", e);
        }
    };

    const remove = async (id: number) => {
        if (!confirm("Supprimer cette playlist ?")) return;
        await fetch(`http://localhost:3001/api/playlists/${id}`, { method: "DELETE" });
        loadPlaylists();
    };

    // Charger les vidéos d'une playlist
    const loadVideos = async (playlistId: number) => {
        try {
            const res = await fetch(`http://localhost:3001/api/playlists/videos/${playlistId}`);
            const data = await res.json();
            setVideos((prev) => ({ ...prev, [playlistId]: data }));
        } catch (e) {
            console.error("Erreur GET vidéos playlist :", e);
        }
    };

    // Si déconnecté
    if (!user) return (
        <div className="bg-amber-400 p-2 rounded-lg text-black text-center">
            <div className="flex gap-2 items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none"
                     viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h2 className="font-bold text-xl">Attention</h2>
            </div>
            <p className="pb-2">Vous devez vous connecter pour accéder à vos playlists.</p>
            <button className="text-white bg-black p-2 rounded-xl"><NavLink to="/login">Connexion</NavLink></button>
        </div>
    );

    return (
        <div id="playlists" className="bg-gray-100 dark:bg-zinc-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-3">Mes playlists</h2>

            {/* Création playlist */}
            <div className="flex gap-2 mb-4">
                <input
                    className="p-2 rounded-lg border border-gray-300 dark:border-zinc-600 placeholder:italic"
                    placeholder="Ma nouvelle playlist..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}/>
                <button onClick={create} className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-150">
                Créer
                </button>
            </div>

            {/* Liste */}
            {playlists.length === 0 && (
                <p className="text-sm text-gray-400">Vous n'avez encore aucune playlist.</p>
            )}

            <ul className="space-y-4">
                {playlists.map((p) => (
                <li key={p.id} className="p-3 bg-gray-200 dark:bg-zinc-700 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-semibold">{p.nom_playlist}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-300">
                                Créée le : {new Date(p.date_creation).toLocaleDateString()}
                            </p>
                        </div>

                        <button
                            onClick={() => remove(p.id)}
                            className="bg-red-600 text-white rounded-2xl px-2 py-0.5 cursor-pointer hover:bg-red-700 transition duration-150 text-sm">
                                Supprimer
                        </button>
                    </div>

                    {/* Charger vidéos */}
                    <button
                        onClick={() => loadVideos(p.id)}
                        className="mt-2 text-blue-400 underline text-sm cursor-pointer hover:text-blue-500 transition duration-150">
                            Afficher les vidéos
                    </button>

                    {/* Grille vidéos */}
                    {videos[p.id] && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                        {videos[p.id].map((v) => (
                        <NavLink
                            key={v.id}
                            to={`/desktop/${v.id}`}
                            className="block bg-gray-300 shadow-md rounded overflow-hidden hover:opacity-80 transition duration-150">
                                <img src={`../../../assets/miniatures/${v.miniature}`} alt={v.titre} className="w-full h-28 object-cover" />
                                <p className="text-xs p-1">{v.titre}</p>
                        </NavLink>
                        ))}
                    </div>
                    )}
                </li>
                ))}
            </ul>
        </div>
    );
}