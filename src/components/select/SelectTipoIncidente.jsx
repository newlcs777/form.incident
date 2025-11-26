// src/components/SelectTipoIncidente.jsx
import React from "react";

export default function SelectTipoIncidente({ value, onChange }) {
  const tipos = [
    // TI e Sistema
    "Sistema fora",
    "Lentidão",
    "Falha de login",
    "Erro interno",
    "Acesso bloqueado",
    "Atualização pendente",
    "Falha no sistema de senhas",
    "Falha no agendamento",
    "Problema no TOTEM",
    "Problema na biometria",

    // Infraestrutura
    "Infraestrutura",
    "Equipamento quebrado",
    "Computador não liga",
    "Impressora não funciona",
    "Problema em terminal de autoatendimento",
    "Cabo desconectado / Rede física",
    "Ar-condicionado com problema",
    "Cadeira/mesa quebrada",
    "Iluminação com falha",
    "Vazamento de água",

    // Rede / Internet
    "Internet fora",
    "Wi-Fi instável",
    "Rede lenta",
    "Queda de energia",

    // Operacional
    "Falha na chamada",
    "Erro no atendimento",
    "Falta de material",
    "Demora excessiva no atendimento",
  ];

  return (
    <select
      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
      value={value}
      onChange={onChange}
    >
      <option value="">Tipo de incidente</option>

      {tipos.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
