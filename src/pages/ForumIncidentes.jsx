import React, { useState } from "react";
import { useSelector } from "react-redux";
import FiltrosForum from "../components/filtros/FiltrosForum";

export default function ForumIncidentes() {
  const incidents = useSelector((state) => state.incidents.incidents);
  const [unidadeFiltro, setUnidadeFiltro] = useState("");

  const incidentesFiltrados = incidents.filter(
    (item) => !unidadeFiltro || item.unidade === unidadeFiltro
  );

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-xl"> 
        {/* TÍTULO COMPACTO */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Fórum de Incidentes – Rede Descomplica SP
        </h1>

        {/* FILTROS */}
        <div className="mb-4">
          <FiltrosForum unidade={unidadeFiltro} setUnidade={setUnidadeFiltro} />
        </div>

        {/* LISTA */}
        {incidentesFiltrados.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">
            Nenhum incidente encontrado para este filtro.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {incidentesFiltrados.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white border border-gray-200 
                  rounded-xl p-4 shadow-sm 
                  hover:shadow transition
                "
              >
                {/* TÍTULO */}
                <h2 className="text-lg font-semibold text-gray-900 text-center leading-tight">
                  {item.unidade} — {item.tipo}
                </h2>

                {/* DESCRIÇÃO */}
                <p className="text-gray-700 text-center mt-1 text-sm leading-snug">
                  {item.descricao}
                </p>

                {/* STATUS E DATA */}
                <div className="mt-3">
                  <p className="text-gray-900 font-medium text-sm">
                    Status:{" "}
                    <span
                      className={`
                        px-2 py-1 rounded-md text-white text-xs
                        ${
                          item.status === "Resolvido"
                            ? "bg-green-600"
                            : item.status === "Em andamento"
                            ? "bg-orange-500"
                            : "bg-red-600"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.data).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
