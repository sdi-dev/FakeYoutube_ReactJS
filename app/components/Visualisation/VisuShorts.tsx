import ShortList from "../ShortList/Shortlist";
import { VideoProvider } from "~/contexts/VideoAPI/VideoContext";
export default function Shorts() {
    return (
        <>
            <VideoProvider>
                <ShortList />
            </VideoProvider>
        </>
    );
}