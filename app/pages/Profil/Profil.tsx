import Infos from "~/components/Infos/Infos";
import History from "~/components/History/History";
import Playlists from "~/components/Playlists/Playlists";

export default function ProfilPage() {
  return (
    <main className="min-h-screen">
        <div className="p-6 max-w-4xl mx-auto">
            {/* Infos utilisateur */}
            <section className="mb-8">
                <Infos />
            </section>

            {/* Playlists */}
            <section className="mb-8">
                <Playlists />
            </section>

            {/* Historique */}
            <section className="mb-8">
                <History />
            </section>
        </div>
    </main>
  );
}