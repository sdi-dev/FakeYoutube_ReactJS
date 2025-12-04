import React, { useContext } from 'react';
import { VideoContext, type Video } from '~/contexts/VideoAPI/VideoContext';
import { VideoCard } from '../VideoCard/VideoCard';

export function VideoList() {

    const { videos, loading, error } = useContext(VideoContext);
    console.log("Vidéos:", videos);

    //Si c'est encore entrain de charger et que aucune vide est dispo 
    if (loading && videos.length === 0) {
        return (
            <div className="flex flex-col justify-center min-h-screen items-center gap-4 mt-6">

                <button className="bg-red-700 p-4 rounded-4xl animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path
                            d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                    </svg>
                </button>
                <p className="animate-pulse">Chargement des vidéos...</p>
            </div>
        );
    }

    //Si ya une erreur on affiche l'erreur
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-700 mx-2 w-fit p-4 text-white rounded-lg">
                    <div className="flex gap-2 items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <h2 className="font-bold text-2xl">Erreur</h2>
                    </div>
                    <div>
                        {error}
                        <p>Vérifiez que l'API est démarrée sur le port 3001.</p>
                    </div>
                </div>
            </div>
        );
    }

    //sinon ya des données du coup on affiche les données
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">Vidéos Classiques</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos
                    .filter(v => v.categorie === 'classique')
                    .map((video: Video) => (
                        // La carte prend automatiquement la taille définie par la grille
                        // 'col-span-1' n'est pas nécessaire ici car elle est implicite
                        <VideoCard key={video.id} video={video} />
                    ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Shorts</h2>
            <div className="grid  grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6   gap-y-10  pb-4">
                {videos
                    .filter(v => v.categorie === 'verticale')
                    .map((video: Video) => (
                        // On retire la classe w-48 et flex-shrink-0 : 
                        // La grille gère la largeur automatiquement et uniformément
                        <VideoCard key={video.id} video={video} />
                    ))}
            </div>
        </div>
    );
}