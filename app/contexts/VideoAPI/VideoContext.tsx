import { createContext, useState, useEffect, type ReactNode } from "react";

// --- 1. Types minimums ---
export interface Video {
    id: number;
    titre: string;
    description: string;
    lien: string;
    miniature: string;
    categorie: 'verticale' | 'classique';
    duree: number;
    date_creation: string;
}

interface VideoContextValue {
    videos: Video[];
    loading: boolean;
    error: string | null;
}



// --- 2. Création du Contexte ---
export const VideoContext = createContext<VideoContextValue>({
    videos: [],
    loading: false,
    error: null,
});

// --- 3. Le Provider ---
export function VideoProvider({ children }: { children: ReactNode }) {

    // On conserve uniquement l'état des vidéos et l'état de chargement
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchVideos() {
        // Bloquer si déjà en chargement (pour éviter les doubles appels)
        if (videos.length > 0 || loading) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:3001/api/videos");

            if (!response.ok) {
                // Si le statut HTTP n'est pas 200-299
                throw new Error(`Erreur HTTP ${response.status}: Impossible de récupérer les vidéos.`);
            }

            const datas: Video[] = (await response.json()) as Video[];

            // Mise à jour de la liste
            setVideos(datas);

        } catch (err) {
            console.error(err);
            setError("Problème de connexion à l'API ou de serveur.");

        } finally {
            setLoading(false); // FIN du chargement, que ça ait réussi ou non
        }
    }

    // Appel au montage, comme votre useEffect
    useEffect(() => {
        fetchVideos();
    }, []);

    // --- 4. Retourne les données ---
    return (
        <VideoContext.Provider value={{videos, loading, error}}>
            {children}
        </VideoContext.Provider>
    );
}