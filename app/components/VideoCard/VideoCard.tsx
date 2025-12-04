import React from 'react';
import { Link } from 'react-router';
import type { Video } from '~/contexts/VideoAPI/VideoContext'; 
import { useContext } from 'react';

interface VideoCardProps {
    video: Video;
    className?: string;
    // cardWidth ne peut plus être une chaîne CSS arbitraire (ex: '30%') 
    // à moins d'utiliser des classes utilitaires spécifiques ou des styles inline pour la largeur.
    // On va laisser le composant parent gérer la grille.
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {    
    const isVerticale = video.categorie === 'verticale';
    
    // Détermine la classe de ratio Tailwind à utiliser
    // Si votre Tailwind est configuré : aspect-9/16 pour verticale, aspect-video (16/9) pour classique.
    // Si votre Tailwind n'est pas configuré pour 9/16, vous devrez utiliser une classe personnalisée ou une hauteur fixe.
    const aspectRatioClass = isVerticale ? 'aspect-9/16' : 'aspect-video';

    return (
        // Remplacement de style={} par className="..."
        <article 
            key={video.id} 
            className={`border border-gray-300 dark:border-zinc-800 dark:hover:shadow-zinc-800 rounded-lg overflow-hidden shadow-md 
                        w-full hover:shadow-lg max-w-[50vh] transition-shadow duration-200`}
        >
            
                
      
                <div className={`relative ${aspectRatioClass}`}>
                    <img 
                        src={`../../../assets/miniatures/${video.miniature}`} 
                        alt={`Miniature de ${video.titre}`} 
                        // La classe 'object-cover' garantit que l'image remplit le conteneur sans étirement
                        className="absolute inset-0 w-full h-full object-cover" 
                    />
                </div>
                
           
            
            <div className="p-3">
                {/* Affichage du Titre */}
                <Link to={`/Desktop/${video.id}`}>
                <h3 className="text-base font-semibold leading-tight mb-1 truncate">
                    {video.titre}
                </h3>
                 </Link>
                {!isVerticale && (
                    <>
                        {/* Affiche Durée et Description seulement pour les classiques */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 my-1">
                            Durée : {video.duree} secondes 
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 my-1">
                            Posté le : {new Date(video.date_creation).toLocaleDateString()}
                        </p>
                        {/* Utilisation de "line-clamp-2" pour limiter la description à deux lignes */}
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                            {video.description}
                        </p>
                    </>
                )}
                
            </div>
        </article>
    );
};



export const ShortVideoCard: React.FC<VideoCardProps> = ({ video }) => {
    
    const isVerticale = video.categorie === 'verticale';
    
    // Détermine la classe de ratio Tailwind à utiliser
    // Si votre Tailwind est configuré : aspect-9/16 pour verticale, aspect-video (16/9) pour classique.
    // Si votre Tailwind n'est pas configuré pour 9/16, vous devrez utiliser une classe personnalisée ou une hauteur fixe.
    const aspectRatioClass = isVerticale ? 'aspect-9/16' : 'aspect-video';

    return (
        // Remplacement de style={} par className="..."
        <article 
            key={video.id} 
            className={`border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-md 
                        w-full hover:shadow-lg dark:hover:shadow-zinc-800 max-w-[50vh] transition-shadow duration-200`}
        >
            
                
      
                <div className={`relative ${aspectRatioClass}`}>
                    <iframe
                        src={`../../../assets/videos/${video.lien}`}
                        title={video.titre}
                        className="w-full h-full border-0"
                        allowFullScreen
                    ></iframe>
                </div>
                
           
            
            <div className="p-3">
                {/* Affichage du Titre */}
                <Link to={`/desktop/${video.id}`}>
                <h3 className="text-base text-center font-semibold leading-tight mb-1 truncate">
                    {video.titre}
                </h3>
                 </Link>
                {!isVerticale && (
                    <>
                        {/* Affiche Durée et Description seulement pour les classiques */}
                        <p className="text-sm text-gray-600 my-1">
                            Durée : {video.duree} secondes 
                        </p>
                        {/* Utilisation de "line-clamp-2" pour limiter la description à deux lignes */}
                        <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                            {video.description}
                        </p>
                    </>
                )}
                
            </div>
        </article>
    );
};