-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 04 déc. 2025 à 16:17
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fakeyt`
--
CREATE DATABASE IF NOT EXISTS `fakeyt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fakeyt`;

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_video` int(11) NOT NULL,
  `date_visonnage` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id`, `id_utilisateur`, `id_video`, `date_visonnage`) VALUES
(128, 17, 27, '2025-12-04 14:40:43'),
(242, 17, 18, '2025-12-04 14:59:03'),
(245, 17, 16, '2025-12-04 15:07:33'),
(246, 17, 44, '2025-12-04 15:11:03'),
(247, 17, 44, '2025-12-04 15:11:03'),
(248, 17, 19, '2025-12-04 15:11:24'),
(249, 17, 19, '2025-12-04 15:11:24'),
(251, 17, 1, '2025-12-04 15:12:05'),
(254, 17, 14, '2025-12-04 15:28:41');

-- --------------------------------------------------------

--
-- Structure de la table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `nom_playlist` varchar(255) NOT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `playlists`
--

INSERT INTO `playlists` (`id`, `id_utilisateur`, `nom_playlist`, `date_creation`) VALUES
(3, 17, 'sasa', '2025-12-04 15:12:04');

-- --------------------------------------------------------

--
-- Structure de la table `playlist_videos`
--

CREATE TABLE `playlist_videos` (
  `id` int(11) NOT NULL,
  `id_playlist` int(11) NOT NULL,
  `id_video` int(11) NOT NULL,
  `ordre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `playlist_videos`
--

INSERT INTO `playlist_videos` (`id`, `id_playlist`, `id_video`, `ordre`) VALUES
(3, 3, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `motdepasse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `pseudo`, `mail`, `motdepasse`) VALUES
(2, 'Endou', 'Daisuke', 'Mugentha', 'daisuke@email.com', '$2b$10$uS/UVQemZioCuK.PMDlIC.vOg/8NxO9HM9CwOwE4xYNIDO22/LGBu'),
(11, 'Altus', 'Jake', 'jakul', 'jake@email.com', '$2b$10$GYi5cIFduoiFjHcsvv5ciu5CgSX9v5LSqjdtAMJV7EvDSFKUT3qoy'),
(12, 'john', 'john', 'john12', 'john@john.fr', '$2b$10$hpdIv.4qAoHY6KCO/QiJLO/bagNJnkDd/wKjUEt.Cc.u6RWTvbI7K'),
(17, 'john', 'john', 'ABC123', 'johnabc@john.fr', '$2b$10$i0htjclVdYVlwwR.vzR6UO8FdGd45HwbpyvW.xfvLfU4n7PYAYhXW');

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `lien` varchar(500) NOT NULL,
  `miniature` varchar(500) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `videos`
--

INSERT INTO `videos` (`id`, `titre`, `description`, `lien`, `miniature`, `categorie`, `duree`, `date_creation`) VALUES
(1, 'visionnage1', 'Une longue description générée automatiquement pour la vidéo numéro 1 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 1.', 'video1.mp4', 'miniature1.png', 'verticale', 15, '2021-03-14 00:00:00'),
(2, 'visionnage2', 'Une longue description générée automatiquement pour la vidéo numéro 2 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 2.', 'video2.mp4', 'miniature2.png', 'verticale', 31, '2022-11-22 00:00:00'),
(3, 'visionnage3', 'Une longue description générée automatiquement pour la vidéo numéro 3 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 3.', 'video3.mp4', 'miniature3.png', 'verticale', 17, '2024-06-08 00:00:00'),
(4, 'visionnage4', 'Une longue description générée automatiquement pour la vidéo numéro 4 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 4.', 'video4.mp4', 'miniature4.png', 'verticale', 21, '2023-02-19 00:00:00'),
(5, 'visionnage5', 'Une longue description générée automatiquement pour la vidéo numéro 5 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 5.', 'video5.mp4', 'miniature5.png', 'verticale', 6, '2020-09-27 00:00:00'),
(6, 'visionnage6', 'Une longue description générée automatiquement pour la vidéo numéro 6 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 6.', 'video6.mp4', 'miniature6.png', 'verticale', 1, '2025-12-03 00:00:00'),
(7, 'visionnage7', 'Une longue description générée automatiquement pour la vidéo numéro 7 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 7.', 'video7.mp4', 'miniature7.png', 'verticale', 6, '2021-04-11 00:00:00'),
(8, 'visionnage8', 'Une longue description générée automatiquement pour la vidéo numéro 8 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 8.', 'video8.mp4', 'miniature8.png', 'verticale', 14, '2023-07-18 00:00:00'),
(9, 'visionnage9', 'Une longue description générée automatiquement pour la vidéo numéro 9 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 9.', 'video9.mp4', 'miniature9.png', 'verticale', 11, '2022-10-25 00:00:00'),
(10, 'visionnage10', 'Une longue description générée automatiquement pour la vidéo numéro 10 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 10.', 'video10.mp4', 'miniature10.png', 'verticale', 11, '2020-01-09 00:00:00'),
(11, 'visionnage11', 'Une longue description générée automatiquement pour la vidéo numéro 11 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 11.', 'video11.mp4', 'miniature11.png', 'verticale', 29, '2025-03-16 00:00:00'),
(12, 'visionnage12', 'Une longue description générée automatiquement pour la vidéo numéro 12 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 12.', 'video12.mp4', 'miniature12.png', 'verticale', 43, '2024-08-02 00:00:00'),
(13, 'visionnage13', 'Une longue description générée automatiquement pour la vidéo numéro 13 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 13.', 'video13.mp4', 'miniature13.png', 'verticale', 8, '2021-05-21 00:00:00'),
(14, 'visionnage14', 'Une longue description générée automatiquement pour la vidéo numéro 14 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 14.', 'video14.mp4', 'miniature14.png', 'verticale', 20, '2023-06-30 00:00:00'),
(15, 'visionnage15', 'Une longue description générée automatiquement pour la vidéo numéro 15 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 15.', 'video15.mp4', 'miniature15.png', 'verticale', 24, '2022-09-07 00:00:00'),
(16, 'visionnage16', 'Une longue description générée automatiquement pour la vidéo numéro 16 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 16.', 'video16.mp4', 'miniature16.png', 'classique', 14, '2021-02-13 00:00:00'),
(17, 'visionnage17', 'Une longue description générée automatiquement pour la vidéo numéro 17 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 17.', 'video17.mp4', 'miniature17.png', 'classique', 20, '2024-12-28 00:00:00'),
(18, 'visionnage18', 'Une longue description générée automatiquement pour la vidéo numéro 18 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 18.', 'video18.mp4', 'miniature18.png', 'classique', 21, '2020-05-04 00:00:00'),
(19, 'visionnage19', 'Une longue description générée automatiquement pour la vidéo numéro 19 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 19.', 'video19.mp4', 'miniature19.png', 'classique', 14, '2023-11-10 00:00:00'),
(20, 'visionnage20', 'Une longue description générée automatiquement pour la vidéo numéro 20 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 20.', 'video20.mp4', 'miniature20.png', 'classique', 8, '2025-03-29 00:00:00'),
(21, 'visionnage21', 'Une longue description générée automatiquement pour la vidéo numéro 21 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 21.', 'video21.mp4', 'miniature21.png', 'classique', 32, '2021-07-17 00:00:00'),
(22, 'visionnage22', 'Une longue description générée automatiquement pour la vidéo numéro 22 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 22.', 'video22.mp4', 'miniature22.png', 'classique', 6, '2022-02-06 00:00:00'),
(23, 'visionnage23', 'Une longue description générée automatiquement pour la vidéo numéro 23 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 23.', 'video23.mp4', 'miniature23.png', 'classique', 9, '2020-08-14 00:00:00'),
(24, 'visionnage24', 'Une longue description générée automatiquement pour la vidéo numéro 24 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 24.', 'video24.mp4', 'miniature24.png', 'classique', 44, '2024-10-31 00:00:00'),
(25, 'visionnage25', 'Une longue description générée automatiquement pour la vidéo numéro 25 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 25.', 'video25.mp4', 'miniature25.png', 'classique', 30, '2025-01-12 00:00:00'),
(26, 'visionnage26', 'Une longue description générée automatiquement pour la vidéo numéro 26 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 26.', 'video26.mp4', 'miniature26.png', 'classique', 42, '2023-04-23 00:00:00'),
(27, 'visionnage27', 'Une longue description générée automatiquement pour la vidéo numéro 27 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 27.', 'video27.mp4', 'miniature27.png', 'classique', 59, '2021-09-03 00:00:00'),
(28, 'visionnage28', 'Une longue description générée automatiquement pour la vidéo numéro 28 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 28.', 'video28.mp4', 'miniature28.png', 'classique', 6, '2020-06-20 00:00:00'),
(29, 'visionnage29', 'Une longue description générée automatiquement pour la vidéo numéro 29 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 29.', 'video29.mp4', 'miniature29.png', 'classique', 5, '2025-12-05 00:00:00'),
(30, 'visionnage30', 'Une longue description générée automatiquement pour la vidéo numéro 30 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 30.', 'video30.mp4', 'miniature30.png', 'classique', 18, '2024-03-08 00:00:00'),
(31, 'visionnage31', 'Une longue description générée automatiquement pour la vidéo numéro 31 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 31.', 'video31.mp4', 'miniature31.png', 'classique', 6, '2022-07-27 00:00:00'),
(32, 'visionnage32', 'Une longue description générée automatiquement pour la vidéo numéro 32 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 32.', 'video32.mp4', 'miniature32.png', 'classique', 19, '2023-11-04 00:00:00'),
(33, 'visionnage33', 'Une longue description générée automatiquement pour la vidéo numéro 33 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 33.', 'video33.mp4', 'miniature33.png', 'classique', 11, '2025-04-16 00:00:00'),
(34, 'visionnage34', 'Une longue description générée automatiquement pour la vidéo numéro 34 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 34.', 'video34.mp4', 'miniature34.png', 'classique', 59, '2021-01-30 00:00:00'),
(35, 'visionnage35', 'Une longue description générée automatiquement pour la vidéo numéro 35 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 35.', 'video35.mp4', 'miniature35.png', 'classique', 9, '2020-08-22 00:00:00'),
(36, 'visionnage36', 'Une longue description générée automatiquement pour la vidéo numéro 36 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 36.', 'video36.mp4', 'miniature36.png', 'classique', 19, '2022-05-11 00:00:00'),
(37, 'visionnage37', 'Une longue description générée automatiquement pour la vidéo numéro 37 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 37.', 'video37.mp4', 'miniature37.png', 'classique', 11, '2024-09-18 00:00:00'),
(38, 'visionnage38', 'Une longue description générée automatiquement pour la vidéo numéro 38 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 38.', 'video38.mp4', 'miniature38.png', 'classique', 9, '2023-07-09 00:00:00'),
(39, 'visionnage39', 'Une longue description générée automatiquement pour la vidéo numéro 39 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 39.', 'video39.mp4', 'miniature39.png', 'classique', 21, '2021-10-01 00:00:00'),
(40, 'visionnage40', 'Une longue description générée automatiquement pour la vidéo numéro 40 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 40.', 'video40.mp4', 'miniature40.png', 'classique', 13, '2020-12-15 00:00:00'),
(41, 'visionnage41', 'Une longue description générée automatiquement pour la vidéo numéro 41 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 41.', 'video41.mp4', 'miniature41.png', 'classique', 16, '2025-04-02 00:00:00'),
(42, 'visionnage42', 'Une longue description générée automatiquement pour la vidéo numéro 42 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 42.', 'video42.mp4', 'miniature42.png', 'classique', 6, '2023-06-26 00:00:00'),
(43, 'visionnage43', 'Une longue description générée automatiquement pour la vidéo numéro 43 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 43.', 'video43.mp4', 'miniature43.png', 'classique', 11, '2024-08-13 00:00:00'),
(44, 'visionnage44', 'Une longue description générée automatiquement pour la vidéo numéro 44 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 44.', 'video44.mp4', 'miniature44.png', 'classique', 18, '2020-02-19 00:00:00'),
(45, 'visionnage45', 'Une longue description générée automatiquement pour la vidéo numéro 45 afin de fournir un texte conséquent pour les besoins du projet. Cette description se termine par le numéro 45.', 'video45.mp4', 'miniature45.png', 'classique', 59, '2022-11-07 00:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_video` (`id_video`);

--
-- Index pour la table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_playlist` (`id_playlist`),
  ADD KEY `id_video` (`id_video`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Index pour la table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=255;

--
-- AUTO_INCREMENT pour la table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historique_ibfk_2` FOREIGN KEY (`id_video`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD CONSTRAINT `playlist_videos_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlist_videos_ibfk_2` FOREIGN KEY (`id_video`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
