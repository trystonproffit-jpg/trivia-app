import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import './styles/App.css';
import PortalBackground from "./components/PortalBackground";

function App() {
  return (
     <> 
        <PortalBackground />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes> 
    </>
  )
}

export default App;