import { useState } from "react";

export default function HistoricoFechamentos({ historico = [] }) {
  if (!historico.length) return null;

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700 mb-1">
        Histórico de edições:
      </p>

      <ul className="text-sm text-gray-600 space-y-1">
        {historico.map((h, index) => (
          <li key={index}>
            • <span className="font-semibold">{h.origem}</span> —{" "}
            {new Date(h.novoFechamento).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
