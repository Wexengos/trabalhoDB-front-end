import { BrowserRouter, Routes, Route } from "react-router-dom";

import GerenciamentoAvisos from "./pages/GerenciamentoAvisos";
import GerenciamentoUsuarios from "./pages/GerenciamentoUsuarios";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GerenciamentoAvisos />} path="/" />
        <Route element={<GerenciamentoUsuarios />} path="/users" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
