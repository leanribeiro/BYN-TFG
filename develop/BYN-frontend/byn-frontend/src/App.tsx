import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./scenes/Home";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* Ruta para la página principal */}
        </Routes>
      </div>
    </>
  );
}

export default App;
