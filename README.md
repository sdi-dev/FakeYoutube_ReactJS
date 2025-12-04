# Mini Clone YouTube -- Projet React

##  Présentation et Objectif

Ce projet consiste en la réalisation d'un mini clone de YouTube avec
**React**, en groupe.\
L'application reprend les fonctionnalités essentielles : affichage de
vidéos, visualisation, playlists, shorts, historique, recherche et
gestion d'utilisateur.

------------------------------------------------------------------------

##  Fonctionnalités Réalisées

###  Page d'accueil

-   Liste d'au moins de toutes les vidéos.\
-   Chaque vidéo possède sa page dédiée avec un lecteur vidéo.\
-   Les vidéos sont stockées en **local (assets)**.

###  Pages vidéos

-   Lecture individuelle des vidéos avec leur titre, description, .\
-   Possibilité d'ajouter une vidéo dans une **playlist personnelle**.

###  Shorts

-   Une page dédiée avec **15 vidéos verticales minimum**.\
-   Scroll continu ou dynamique entre les vidéos.

###  Barre de recherche

-   Permet de rechercher une vidéo par titre (partiel ou complet).

###  Historique

-   Chaque vidéo visionnée ajoute son URL dans la table `historique`.\
-   Historique consultable à tout moment lorsqu'un utilisateur est
    connecté.

###  Playlists

-   Un utilisateur connecté peut accéder à sa playlist depuis n'importe
    quelle page.\
-   Données stockées en BDD (`playlists` et `playlist_videos`).

### Inscription  

-   Création d’un compte enregistré dans la table (`utilisateurs`).\
-   Le mot de passe est haché avec bcrypt.



###  Connexion utilisateur

-   Connexion via `sessionStorage` en récupérant les informations de l'utilisateur depuis la base de données.\
-   Stockage du pseudo et de l'identifiant pour gérer l'accès aux pages .

------------------------------------------------------------------------

##  Base de Données -- fakeyt

  -----------------------------------------------------------------------
  Table                         Colonnes
  ----------------------------- -----------------------------------------
  **utilisateurs**              id, nom, prenom, pseudo, mail,
                                mot_de_passe

  **videos**                    id, titre, miniature, description, lien,
                                duree, date_creation

  **playlists**                 id, id_utilisateur, nom_playlist,
                                date_creation

  **playlist_videos**           id, id_playlist, id_video, ordre

  **historique**                id, id_utilisateur, id_video,
                                date_visionnage
  -----------------------------------------------------------------------

Les vidéos sont stockées localement dans **assets/**.

------------------------------------------------------------------------

##  Backend (Node.js)

Backend construit avec :\
- **express** - **cors** - **mysql** - **bcrypt**

### Installation des dépendances

``` sh
bun install
```

### Installation de la base de données

Importer le fichier SQL fourni :

``` sql
SOURCE fakeyt.sql;
```

------------------------------------------------------------------------

##  Répartition des tâches

### Jordan

-   Création de la base de données
-   Pages : inscription, connexion, profil

### Adam

-   Mise en place de l'arborescence du projet
-   Création des pages : vidéos, shorts, page d'accueil

### Yanis

-   Style global de toutes les pages
-   Intégration de la barre de recherche
-   Mise en place du responsive pour chaque page

------------------------------------------------------------------------
