import React, { useContext } from 'react';
import { VideoContext } from '~/contexts/VideoAPI/VideoContext';
import { ShortVideoCard } from '../VideoCard/VideoCard';
import { Navigate } from 'react-router';

export default function ShortList() {

    const { videos, loading, error } = useContext(VideoContext);

    // Filtrer uniquement les vidéos verticales (Shorts)
    const shorts = videos.filter(v => v.categorie === 'verticale');
    console.log(shorts);

    // Vérification de l'état
    if (loading || videos.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4 mt-6 min-h-screen">

                <button className="bg-red-700 p-4 rounded-4xl animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path
                            d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                    </svg>
                </button>
                <p className="animate-pulse">Chargement des shorts...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center">
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

    if (shorts.length === 0) {
        // Redirection si aucun Short n'est trouvé
        return <Navigate to="/" replace />;
    }

   return (
        // 1. Conteneur principal de la PAGE (min-h-screen pour le fond)
        // On retire 'h-screen' et 'overflow-hidden' pour laisser le scroll naturel se faire
        <div className="w-full min-h-screen bg-gray-100 dark:bg-zinc-900  py-10">
            
            {/* 2. Colonne centrale qui limite la largeur */}
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">
                
                {shorts.map((video) => (
                    // 3. Conteneur de chaque Short
                    // Plus de hauteur fixe ici, le contenu prend sa place
                    <div 
                        key={video.id} 
                        className="w-full flex justify-center"
                    >
                        <ShortVideoCard 
                            video={video} 
                         
                            className="" 
                        />
                    </div>
                ))}
                
            </div>
        </div>
    );
}