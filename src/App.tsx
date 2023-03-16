import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BuildingViewer } from "./components/building/building-viewer";
import { LoginForm } from "./components/user/login-form";
import { MapViewer } from "./components/map/map-viewer";
import { ContextProvider } from "./middleware/context-provider";

function App() {
    return (
        <ContextProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/building" element={<BuildingViewer />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/map" element={<MapViewer />} />
                    </Routes>
                </div>
            </Router>
        </ContextProvider>
    );
}

export default App;
