// src/components/SelectUnidade.jsx
import React from "react";

export default function SelectUnidade({ value, onChange }) {
  const unidades = [
    // Unidades enviadas por você
    "Itaim Paulista",
    "Itaquera",
    "Parelheiros",
    "Aricanduva",
    "Guaianases",
    "Pirituba",
    "Itaim Bibi",
    "Penha",
    "São Mateus",
    "Capão Redondo",

    // Rede completa Descomplica SP
    "São Miguel Paulista",
    "Cidade Tiradentes",
    "Sapopemba",
    "Vila Prudente",
    "Santo Amaro",
    "Capela do Socorro",
    "M’Boi Mirim",
    "Campo Limpo",
    "Butantã",
    "Lapa",
    "Freguesia do Ó",
    "Casa Verde",
    "Santana",
    "Vila Maria",
    "Sé",
    "Mooca",
    "Ipiranga",
    "Vila Mariana",
    "Jabaquara",
  ];

  return (
    <select
      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
      value={value}
      onChange={onChange}
    >
      <option value="">Selecione a unidade</option>
      {unidades.map((u) => (
        <option key={u} value={u}>
          {u}
        </option>
      ))}
    </select>
  );
}
