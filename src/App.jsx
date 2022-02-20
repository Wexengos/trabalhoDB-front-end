import { BrowserRouter, Routes, Route } from "react-router-dom";

import GerenciamentoAvisos from "./pages/GerenciamentoAvisos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GerenciamentoAvisos />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
