import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Páginas
import Dashboard from "./pages/Dashboard.jsx";
import RegisterIncident from "./pages/RegisterIncident.jsx";
import ForumIncidentes from "./pages/ForumIncidentes.jsx";
import RelatorioUnidade from "./pages/RelatorioUnidade.jsx";

// Componentes
import GraficoIncidentes from "./components/GraficoIncidentes.jsx";

// Layout
import RootLayout from "./layout/RootLayout.jsx";

export default function App() {
  const [incidents, setIncidents] = useState([]);

  function addIncident(novo) {
    setIncidents((prev) => [...prev, novo]);
  }

  function updateIncidentStatus(id, status) {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  }

  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          
          {/* Dashboard inicial */}
          <Route path="/" element={<Dashboard />} />

          {/* Registrar incidente — MANTÉM SUAS PROPS */}
          <Route
            path="/register"
            element={
              <RegisterIncident
                onAddIncident={addIncident}
                incidents={incidents}
                onUpdateStatus={updateIncidentStatus}
              />
            }
          />

          {/* Fórum de incidentes — REMOVIDA A PROP incidents */}
          <Route path="/incidentes" element={<ForumIncidentes />} />

          {/* Relatório por unidade — REMOVIDA A PROP incidents */}
          <Route path="/relatorio-unidade" element={<RelatorioUnidade />} />

          {/* Novo gráfico — REMOVIDA A PROP incidents */}
          <Route path="/grafico" element={<GraficoIncidentes />} />

        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
