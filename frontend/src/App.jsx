import { Routes, Route } from "react-router-dom";
import Landing from "./Landing.jsx";
import IdeaApp from "./IdeaApp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<IdeaApp />} />
    </Routes>
  );
}
