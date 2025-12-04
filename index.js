// index.js (backend)
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fakeyt",
});

// INSCRIPTION
app.post("/api/register", async (req, res) => {
  const { nom, prenom, pseudo, mail, motdepasse } = req.body;

  const hash = await bcrypt.hash(motdepasse, 10);

  await db.execute(
    "INSERT INTO utilisateurs (nom, prenom, pseudo, mail, motdepasse) VALUES (?, ?, ?, ?, ?)",
    [nom, prenom, pseudo, mail, hash]
  );

  res.json({ message: "Compte créé avec succès !" });
});

// CONNEXION
app.post("/api/login", async (req, res) => {
  const { mail, motdepasse } = req.body;

  const [rows] = await db.execute("SELECT * FROM utilisateurs WHERE mail = ?", [
    mail,
  ]);

  if (rows.length === 0)
    return res.json({ success: false, message: "Email introuvable" });

  const user = rows[0];
  const ok = await bcrypt.compare(motdepasse, user.motdepasse);

  if (!ok)
    return res.json({ success: false, message: "Mot de passe incorrect" });

  res.json({
    success: true,
    message: "Connexion réussie",
    user: {
      id: user.id,
      pseudo: user.pseudo,
      nom: user.nom,
      prenom: user.prenom,
      email: user.mail,
    },
  });
});


// --- Route API pour les vidéos ---
app.get("/api/videos", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM videos");
    res.json(rows);
  } catch (err) {
    console.error("Erreur BDD:", err);
    res.status(500).json({
      message: "Erreur serveur : impossible de récupérer les vidéos.",
    });
  }
});

// Récupérer l'historique d'un utilisateur
app.get("/api/historique/:id_utilisateur", async (req, res) => {
  const { id_utilisateur } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT 
          h.id, 
          h.id_video, 
          v.titre, 
          v.miniature, 
          v.duree, 
          v.categorie,
          h.date_visonnage,
          DATE(h.date_visonnage) AS jour
       FROM historique h
       JOIN videos v ON v.id = h.id_video
       WHERE h.id_utilisateur = ?
       ORDER BY h.date_visonnage DESC`,
      [id_utilisateur]
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur historique :", err);
    res.status(500).json({ message: "Erreur lors de la récupération de l'historique" });
  }
});

// Ajouter une vidéo à l'historique
app.post("/api/historique", async (req, res) => {
  const { id_utilisateur, id_video } = req.body;

  try {
    // Supprime l'entrée du jour s'il existe déjà (anti-spam)
    await db.execute(
      `DELETE FROM historique 
       WHERE id_utilisateur = ? 
       AND id_video = ? 
       AND DATE(date_visonnage) = CURDATE()`,
      [id_utilisateur, id_video]
    );

    // Insère une nouvelle entrée (la plus récente)
    await db.execute(
      `INSERT INTO historique (id_utilisateur, id_video)
       VALUES (?, ?)`,
      [id_utilisateur, id_video]
    );

    res.json({ message: "Vidéo ajoutée à l’historique" });
  } catch (err) {
    console.error("Erreur ajout historique :", err);
    res.status(500).json({ message: "Erreur lors de l'ajout" });
  }
});

// Supprimer tout l'historique
app.delete("/api/historique/:id_utilisateur", async (req, res) => {
  const { id_utilisateur } = req.params;

  try {
    await db.execute("DELETE FROM historique WHERE id_utilisateur = ?", [
      id_utilisateur,
    ]);

    res.json({ message: "Historique supprimé" });
  } catch (err) {
    console.error("Erreur suppression historique :", err);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

// --- Playlists d'un utilisateur ---
app.get("/api/playlists/:id_utilisateur", async (req, res) => {
  const { id_utilisateur } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM playlists WHERE id_utilisateur = ? ORDER BY date_creation DESC",
      [id_utilisateur]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération playlists" });
  }
});

// --- Créer une playlist ---
app.post("/api/playlists/create", async (req, res) => {
  const { id_utilisateur, nom_playlist } = req.body;
  if (!nom_playlist) return res.status(400).json({ message: "Nom obligatoire" });
  try {
    await db.execute(
      "INSERT INTO playlists (id_utilisateur, nom_playlist) VALUES (?, ?)",
      [id_utilisateur, nom_playlist]
    );
    res.json({ message: "Playlist créée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création playlist" });
  }
});

// --- Supprimer une playlist ---
app.delete("/api/playlists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM playlist_videos WHERE id_playlist = ?", [id]);
    await db.execute("DELETE FROM playlists WHERE id = ?", [id]);
    res.json({ message: "Playlist supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression playlist" });
  }
});

// --- Ajouter vidéo à playlist ---
app.post("/api/playlist_videos/add", async (req, res) => {
  const { id_playlist, id_video } = req.body;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM playlist_videos WHERE id_playlist = ? AND id_video = ?",
      [id_playlist, id_video]
    );
    if (rows.length > 0) return res.status(400).json({ message: "Vidéo déjà présente" });
    await db.execute("INSERT INTO playlist_videos (id_playlist, id_video) VALUES (?, ?)", [id_playlist, id_video]);
    res.json({ message: "Vidéo ajoutée à la playlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur ajout vidéo" });
  }
});

// --- Récupérer les vidéos d'une playlist ---
app.get("/api/playlists/videos/:id_playlist", async (req, res) => {
  const { id_playlist } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT v.id, v.titre, v.miniature, v.lien 
       FROM playlist_videos pv
       JOIN videos v ON pv.id_video = v.id
       WHERE pv.id_playlist = ?`,
      [id_playlist]
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur chargement vidéos playlist :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.listen(3001, () => console.log("API running on port 3001"));