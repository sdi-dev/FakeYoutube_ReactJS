import SearchBar from "~/components/ScriptSearch/ScriptSearch";
import { VideoList } from "~/components/VideoList/VideoList"; 
import { VideoProvider } from "~/contexts/VideoAPI/VideoContext";

export default function HomePage() {
    return (
        <VideoProvider>
            <SearchBar/>
            <VideoList/>
        </VideoProvider>
    );
}