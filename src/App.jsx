import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Dashboard from "./pages/Dashboard.jsx";
import RegisterIncident from "./pages/RegisterIncident.jsx";
import ForumIncidentes from "./pages/ForumIncidentes.jsx";
import RelatorioUnidade from "./pages/RelatorioUnidade.jsx";

// Corrigido — gráfico agora está dentro da pasta grafico
import GraficoIncidentes from "./components/grafico/GraficoIncidentes.jsx";

// Layout
import RootLayout from "./layout/RootLayout.jsx";

export default function App() {

  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>

          {/* PÁGINA INICIAL VAZIA */}
          <Route path="/" element={<div></div>} />

          <Route path="/register" element={<RegisterIncident />} />

          <Route path="/incidentes" element={<ForumIncidentes />} />

          <Route path="/relatorio-unidade" element={<RelatorioUnidade />} />

          <Route path="/grafico" element={<GraficoIncidentes />} />

        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
