import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faPlay,
	faCirclePlay,
  faCirclePause,
	faMusic,
	faMicrophone,
	faBackwardStep,
	faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

import { Home } from "./pages/home/index.jsx";
import { Artists } from "./pages/artists/index.jsx";
import { Artist } from "./pages/artist/index.jsx";
import { Songs } from "./pages/songs/index.jsx";
import { Song } from "./pages/song/index.jsx";

library.add(faPlay, faCirclePlay, faCirclePause, faMusic, faMicrophone, faBackwardStep, faForwardStep);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route index element={<Home />} />
					<Route path="artists" element={<Artists />} />
					<Route path="artist/:id" element={<Artist />} />
					<Route path="songs" element={<Songs />} />
					<Route path="song/:id" element={<Song />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
