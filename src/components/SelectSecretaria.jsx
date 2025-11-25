// src/components/SelectSecretaria.jsx
import React from "react";

export default function SelectSecretaria({ value, onChange }) {
  const secretarias = [
    "ENEL",
    "SABESP",
    "Prodam",
    "Defesa Civil",
    "Educação",
    "Saúde",
    "Assistência Social",
    "Cultura",
    "Segurança Urbana",
    "Trabalho e Renda",
    "Zeladoria Urbana",
    "CET",
    "Iluminação Pública",
    "Outros",
  ];

  return (
    <select
      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
      value={value}
      onChange={onChange}
    >
      <option value="">Selecione a secretaria</option>

      {secretarias.map((sec) => (
        <option key={sec} value={sec}>
          {sec}
        </option>
      ))}
    </select>
  );
}
