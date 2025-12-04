"use client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

// Structure d'une entrée d'historique
interface HistoryEntry {
  id_video: number;
  titre: string;
  miniature?: string;
  jour: string;
}

export default function History() {
    const [history, setHistory] = useState<Record<string, HistoryEntry[]>>({});
    const [user, setUser] = useState<{ id: number } | null>(null);

    // Chargement de user depuis sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    //  Chargement de l'historique depuis l'API
    const loadHistory = async () => {
        if (!user) return;

        const res = await fetch(`http://localhost:3001/api/historique/${user.id}`);
        const data: HistoryEntry[] = await res.json();

        // Regrouper par jour
        const grouped: Record<string, HistoryEntry[]> = {};

        data.forEach((entry) => {
        const day = entry.jour; // déjà envoyé par le backend

        if (!grouped[day]) grouped[day] = [];

        // supprimer doublon
        grouped[day] = grouped[day].filter(
            (v) => v.id_video !== entry.id_video
        );

        // mettre la vidéo vue le plus récemment en premier
        grouped[day].unshift(entry);
        });

        setHistory(grouped);
    };

    // ---- 3) Charger l'historique dès que user est prêt
    useEffect(() => {
        if (user) loadHistory();
    }, [user]);

    // ---- 4) Supprimer l'historique utilisateur
    const clearHistory = async () => {
        if (!user) return;

        await fetch(`http://localhost:3001/api/historique/${user.id}`, {
        method: "DELETE",
        });

        setHistory({});
    };

    return (
        <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Mon historique</h2>

                {user && (
                <button
                    onClick={clearHistory}
                    className="bg-red-600 text-white rounded-2xl px-2 py-0.5 cursor-pointer hover:bg-red-700 transition duration-150">
                    Supprimer l’historique
                </button>
                )}
            </div>

            {Object.keys(history).length === 0 && (
                <p className="mt-3">Aucune vidéo vue.</p>
            )}

            {/* Affichage par jour */}
            {Object.entries(history).map(([day, videos]) => (
                <div key={day} className="mt-4">
                    <h3 className="font-semibold"> Le {new Date(day).toLocaleDateString("fr-FR")} :</h3>

                    <ul className="ml-4 mt-2 list-disc">
                        {videos.map((v) => (
                            <NavLink to={`/desktop/${v.id_video}`} key={v.id_video}>
                                <div className="flex items-center my-1 gap-3  bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 p-2 rounded-md dark:hover:bg-zinc-600 transition">
                                    <img src={`../../../assets/miniatures/${v.miniature}`} className="w-24 h-16 object-cover rounded" alt={v.titre}/>
                                    <p className="text-sm font-medium">{v.titre}</p>
                                </div>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}