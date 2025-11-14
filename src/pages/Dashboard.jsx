import { useState } from "react";
import RegisterIncident from "./RegisterIncident";

export default function Dashboard() {
  const [incidentes, setIncidentes] = useState([]);

  const handleAddIncident = (novo) => {
    setIncidentes((prev) => [novo, ...prev]);
  };

  const handleToggleStatus = (id) => {
    setIncidentes((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === "Aberto" ? "Resolvido" : "Aberto" }
          : i
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header simples */}
      <nav className="flex gap-4 text-blue-700 font-medium mb-6">
        <a href="/register" className="hover:underline">Registrar Incidente</a>
        <a href="/incidentes" className="hover:underline">Ver Incidentes</a>
      </nav>

      {/* FORMULÁRIO */}
      <RegisterIncident onAddIncident={handleAddIncident} />

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
        Incidentes Registrados
      </h2>

      {incidentes.length === 0 ? (
        <p className="text-gray-600">Nenhum incidente registrado ainda.</p>
      ) : (
        <ul className="space-y-4">
          {incidentes.map((i) => (
            <li
              key={i.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <strong className="text-gray-900">{i.unidade}</strong> — {i.tipo}
              <br />

              <span className="text-gray-700">{i.descricao}</span>
              <br />

              <small className="text-gray-500">
                Status:{" "}
                <span
                  className={`font-bold ${
                    i.status === "Aberto" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {i.status}
                </span>{" "}
                | {i.data}
              </small>

              <br />

              <button
                onClick={() => handleToggleStatus(i.id)}
                className={`mt-3 px-4 py-2 rounded-lg text-white font-medium ${
                  i.status === "Aberto" ? "bg-green-600" : "bg-yellow-600"
                }`}
              >
                {i.status === "Aberto"
                  ? "Marcar como Resolvido"
                  : "Reabrir"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
