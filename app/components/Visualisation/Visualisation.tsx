import React, { useContext, useEffect } from 'react';
import { useParams, Navigate } from 'react-router';
import { VideoContext } from '~/contexts/VideoAPI/VideoContext';
import AddToPlaylistButton from "~/components/Playlists/AddToPlaylistButton";

export default function Visualisation() {

    // -------------------------------
    // 1. Récupération de l'ID vidéo
    // -------------------------------
    const { id } = useParams<{ id: string | undefined }>();

    if (!id) {
        console.error("ID manquant dans l'URL, redirection.");
        return <Navigate to="/" replace />;
    }

    const videoId = parseInt(id, 10);


    // -------------------------------
    // 2. Chargement des vidéos via context
    // -------------------------------
    const { videos, loading } = useContext(VideoContext);

    if (loading || videos.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4 mt-6">

                <button className="bg-red-700 p-4 rounded-4xl animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path
                            d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                    </svg>
                </button>
                <p className="animate-pulse">Chargement des données vidéo...</p>
            </div>
        );
    }

    const video = videos.find(v => v.id === videoId);

    if (!video) return <Navigate to="/" replace />;


    // -------------------------------
    // 3. Récupérer le user côté client
    // -------------------------------
    const user = typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("user") || "null")
        : null;


    // -------------------------------
    // 4. Ajouter automatiquement à l'historique
    // -------------------------------
    useEffect(() => {
        if (!user) return; // pas connecté → pas d'historique

        // Appel API pour ajouter la vidéo au backend
        fetch("http://localhost:3001/api/historique", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_utilisateur: user.id,
                id_video: videoId
            }),
        })
        .catch(err => console.error("Erreur ajout historique :", err));

    }, [user, videoId]);


    // -------------------------------
    // 5. Affichage de la vidéo
    // -------------------------------
    const isVerticale = video.categorie === 'verticale';
    const aspectRatioClass = isVerticale ? 'aspect-9/16 max-w-sm' : 'aspect-video max-w-4xl';

    return (
        <div className="min-h-screen dark:bg-zinc-900">
            <div className="flex justify-center p-5 dark:bg-zinc-900">
                <div className={`bg-gray-100 border-red-400 dark:bg-zinc-800 shadow-xl rounded-lg ${aspectRatioClass}`}>

                    {/* Titre */}
                    <h1 className="text-3xl font-bold p-4 text-center">{video.titre}</h1>

                    {/* Conteneur de la Vidéo (simulé ici avec un iframe pour l'exemple) */}
                    <div className="p-4 h-full w-full">
                        <iframe
                            src={`../../../assets/videos/${video.lien}`}
                            title={video.titre}
                            className="w-full h-full border-0"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* Informations supplémentaires */}
                    <div className="p-4 mt-2 border-t border-gray-200 dark:border-gray-500 ">
                        <p className="text-lg">{video.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-50 mt-2"><span className="font-bold">Durée:</span> {video.duree} secondes</p>
                    </div>

                    {/* Bouton pour ajouter une nouvelle vidéo dans une playlist*/}
                    <AddToPlaylistButton videoId={videoId} />
                </div>
            </div>
        </div>
    );
}