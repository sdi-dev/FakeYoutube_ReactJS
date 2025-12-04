"use client"; // indique que ce composant est un Client Component

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [user, setUser] = useState<any | null>(null); // user côté client
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Récupère l'utilisateur depuis sessionStorage uniquement côté client
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-red-700 text-white flex items-center justify-between px-4 py-3 shadow-md relative">
      <div className="flex items-center">
          <NavLink to="/" className="cursor-pointer">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 2000.000000 2000.000000"
                   preserveAspectRatio="xMidYMid meet" className="h-10 w-10">

                  <g transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
                     fill="#ffffff" stroke="none">
                      <path d="M8957 15614 c-1 -2 -318 -8 -702 -13 -385 -6 -851 -15 -1035 -21
-184 -5 -416 -12 -515 -15 -99 -3 -288 -10 -420 -15 -132 -6 -357 -15 -500
-20 -893 -35 -1521 -79 -1785 -126 -347 -62 -667 -200 -920 -397 -305 -237
-477 -472 -629 -857 -153 -387 -243 -770 -286 -1215 -8 -88 -20 -203 -25 -255
-21 -203 -64 -778 -82 -1100 -6 -113 -13 -712 -15 -1425 -5 -1234 3 -1629 37
-2070 5 -66 12 -158 15 -205 34 -487 85 -985 125 -1200 73 -398 211 -819 357
-1090 201 -373 545 -667 968 -825 239 -89 391 -123 755 -170 107 -13 206 -27
219 -31 31 -7 195 -20 476 -39 394 -25 640 -36 1235 -55 173 -5 394 -12 490
-15 313 -10 992 -25 1590 -34 322 -6 664 -13 760 -16 452 -13 1226 -16 1835
-6 1209 21 2075 40 2510 56 83 3 272 10 420 15 313 11 698 27 835 35 171 10
581 34 745 45 588 36 902 106 1225 273 266 137 547 381 698 605 223 330 438
984 492 1495 5 51 16 157 25 237 29 270 59 641 80 990 60 970 62 2636 5 3645
-16 284 -58 815 -85 1060 -8 77 -20 185 -25 240 -5 55 -15 127 -21 160 -132
716 -343 1229 -630 1529 -317 332 -714 542 -1174 621 -195 33 -417 54 -875 80
-443 26 -618 34 -1030 49 -217 8 -438 18 -490 20 -52 3 -180 8 -285 11 -104 3
-345 9 -535 15 -678 20 -1692 33 -2752 35 -593 1 -1079 1 -1081 -1z m-561
-3223 c5 -5 56 -34 114 -64 377 -195 604 -314 696 -363 45 -24 112 -59 150
-79 38 -19 76 -39 84 -44 8 -5 33 -18 55 -28 22 -11 74 -37 115 -60 77 -41
215 -114 465 -243 167 -86 320 -167 470 -246 61 -31 157 -82 215 -112 58 -29
116 -60 130 -68 24 -13 234 -123 555 -289 407 -211 462 -240 487 -257 14 -10
30 -18 35 -18 4 0 22 -7 38 -16 44 -24 327 -172 548 -286 42 -22 77 -44 77
-48 0 -4 -48 -32 -107 -62 -268 -138 -353 -182 -418 -218 -38 -21 -146 -77
-240 -125 -219 -113 -360 -186 -515 -267 -177 -92 -388 -201 -585 -303 -217
-112 -412 -213 -545 -283 -58 -31 -177 -93 -265 -138 -269 -139 -364 -188
-510 -264 -134 -69 -257 -133 -590 -305 -133 -69 -337 -175 -435 -227 -19 -10
-38 -18 -42 -18 -5 0 -8 999 -8 2220 0 1221 4 2220 8 2220 4 0 12 -4 18 -9z"/>
                  </g>
              </svg>
          </NavLink>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-6 text-lg">
        <NavLink to="/"><button className="hover:text-red-400 transition cursor-pointer">Vidéos</button></NavLink>
        <NavLink to="/mobile/none"><button className="hover:text-red-400 transition cursor-pointer">Shorts</button></NavLink>
          <NavLink to="/profil#playlists"><button className="hover:text-red-400 transition cursor-pointer">Playlists</button></NavLink>

        {!user && (
          <>
            <button className="hover:text-red-400 transition cursor-pointer">
              <NavLink to="/register">Inscription</NavLink>
            </button>
            <button className="hover:text-red-400 transition cursor-pointer">
              <NavLink to="/login">Connexion</NavLink>
            </button>
          </>
        )}

        {user && (
          <div className="relative">
              <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-neutral-300 bg-white text-black px-2 py-0.5 rounded-lg transition duration-100 cursor-pointer"
              >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#1f1f1f"
                      className="h-6 w-6"
                  >
                      <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                  </svg>
                  <span>{user.pseudo}</span>
              </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 top-9.5 bg-white dark:bg-zinc-900 border border-zinc-700 rounded-b-lg p-4 w-48 shadow-lg z-10">
                  <p className="rounded-4xl bg-green-700 w-fit p-1.5"></p>
                  <p className="text-sm dark:text-gray-300 text-gray-700">{user.nom} {user.prenom}</p>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-2">{user.email}</p>
                <NavLink to="/profil"><button className="w-full text-left text-blue-400 hover:underline mb-2 cursor-pointer">Mon profil</button></NavLink>
                <NavLink to="/profil#playlists"><button className="w-full text-left text-blue-400 hover:underline mb-2 cursor-pointer">Mes playlists</button></NavLink>
                <button onClick={handleLogout} className="text-red-400 hover:underline cursor-pointer">Déconnexion</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Burger Mobile */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 rounded-b-lg bg-white dark:bg-zinc-900 w-56 p-4 border border-gray-700 md:hidden flex flex-col gap-3 z-10">
          <button className="hover:text-red-400 dark:text-white text-zinc-800 transition cursor-pointer">
              <NavLink to="/">
                  Vidéos
              </NavLink>
          </button>
          <button className="hover:text-red-400 dark:text-white text-zinc-800 transition cursor-pointer">
                <NavLink to="/mobile/none">
                    Shorts
                </NavLink>
          </button>
            <button className="hover:text-red-400 dark:text-white text-zinc-800 transition cursor-pointer">
                <NavLink to="/profil#playlists">Mes playlists</NavLink>
            </button>

          {!user && (
            <>
              <button className="hover:text-red-400 transition cursor-pointer">
                  <NavLink to="/register">Inscription</NavLink>
              </button>
              <button className="hover:text-red-400 transition cursor-pointer">
                    <NavLink to="/login">Connexion</NavLink>
              </button>
            </>
          )}

          {user && (
            <>
                <p className="rounded-4xl bg-green-700 w-fit p-1.5"></p>
              <p className="text-gray-700 dark:text-gray-400 border-b border-gray-700 pb-2">
                {user.nom} {user.prenom}<br />
                <span className="text-gray-500 dark:text-gray-600 text-sm">{user.email}</span>
              </p>
              <button className="text-blue-400 hover:underline mb-2 cursor-pointer">
                    <NavLink to="/profil">Mon profil</NavLink>
              </button>
              <button onClick={handleLogout} className="text-red-400 hover:underline cursor-pointer">Déconnexion</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}