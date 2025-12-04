import { VideoProvider } from "~/contexts/VideoAPI/VideoContext";
import Visualisation from "~/components/Visualisation/Visualisation";
export default function VisuDesktop() {
    return (
        <> <VideoProvider>
            <Visualisation />
            </VideoProvider>
        </>
    );
}