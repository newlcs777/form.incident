import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Páginas
import Dashboard from "./pages/Dashboard.jsx";
import RegisterIncident from "./pages/RegisterIncident.jsx";
import ForumIncidentes from "./pages/ForumIncidentes.jsx";

// Componentes
import GraficoIncidentes from "./component/GraficoIncidentes.jsx";

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

          {/* Registrar incidente */}
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

          {/* Fórum de incidentes */}
          <Route
            path="/incidentes"
            element={<ForumIncidentes incidents={incidents} />}
          />

          {/* Novo gráfico */}
          <Route
            path="/grafico"
            element={<GraficoIncidentes incidents={incidents} />}
          />

        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
