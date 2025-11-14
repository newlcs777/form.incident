import React from "react";

export default function ForumIncidentes({ incidents = [] }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Fórum de Incidentes – Rede Descomplica SP
      </h1>

      {incidents.length === 0 && (
        <p className="text-gray-600">Nenhum incidente registrado no momento.</p>
      )}

      <div className="flex flex-col gap-4">
        {incidents.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {item.unidade} — {item.tipo}
            </h2>

            <p className="text-gray-700 mb-3">{item.descricao}</p>

            <p className="text-gray-900 font-medium mb-2">
              Status:{" "}
              <span
                className={`px-3 py-1 rounded-md text-white text-sm ${
                  item.status === "Resolvido"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {item.status}
              </span>
            </p>

            <p className="text-xs text-gray-500">{item.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
