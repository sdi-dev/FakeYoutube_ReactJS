import {type Video, VideoContext} from '~/contexts/VideoAPI/VideoContext';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router";


export default function SearchBar() {

    const { videos, loading, error } = useContext(VideoContext);

    const [query, setQuery] = useState('');
    const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
    const [searchExecuted, setSearchExecuted] = useState(false);

    useEffect(() => {
        setFilteredVideos(videos ?? []);
        setSearchExecuted(false);
    }, [videos])

     function handleSearch() {
        const search = document.getElementById('searchBar') as HTMLInputElement;
        if (!search) {
            console.error('Element de recherche introuvable');
            return;
        }

        setQuery(search.value);

        // setQuery(query + "");
        const queryPropre = query.trim().toLowerCase();
        if (queryPropre === ""){
            setSearchExecuted(false)
            return;
            // Si la requête est vide, on ne fait rien
        }

        const results = (videos ?? []).filter((video) =>
            (video.titre ?? '').toLowerCase().includes(queryPropre)
        );

        setFilteredVideos(results);
        console.log(filteredVideos);

        setSearchExecuted(true);

    }

    //Si c'est encore en train de charger et qu'aucune video est dispo
    if (loading && videos.length === 0) {
        return (
            <div>
            {/*    Vide */}
            </div>
        );
    }

    return (
        <div id="blocSearch" className="max-w-7xl mx-auto px-4 py-6">
            {/* Recherche de vidéos */}
            <h2 className="text-2xl font-bold mb-2 text-center">Recherchez une vidéo</h2>
            <div className="flex justify-center items-center gap-4">
                <input
                    id="searchBar"
                    className="border w-full border-red-700 p-2 rounded-lg"
                    type="search"
                    placeholder="Rechercher ..."
                    value={query}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSearchExecuted(false);}
                    }
                />
                <button className="bg-red-700 py-2 rounded-md px-1 text-white hover:bg-red-800 transition duration-150" id="btnSearch" onClick={() => handleSearch()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </button>
            </div>
            {/* Résultats de la recherche */}
            <div id="searchResults" className="mt-6">
                {searchExecuted && (
                    <>
                        <h3 className="text-xl font-semibold mb-4">
                            Résultats de la recherche pour "{query}" :
                        </h3>
                        {filteredVideos.length > 0 ? (
                            <ul className="space-y-4">
                                {filteredVideos.map((video) => (
                                    <li key={video.id} className="border border-gray-200 rounded-lg p-4">
                                        <Link to={`/desktop/${video.id}`}>
                                        <h4 className="text-lg font-bold">
                                            {video.titre}
                                        </h4>
                                        <img src={`../../../assets/miniatures/${video.miniature}`} alt={video.titre} className="w-24 h-16 object-cover rounded"/>
                                        </Link>
                                        <p className="text-sm text-gray-700 dark:text-white">Durée : {video.duree} secondes</p>
                                        <p className="mt-2">{video.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune vidéo trouvée correspondant à votre recherche. 😢</p>
                        )}
                    </>
                )}
            </div>
        </div>


    );
}