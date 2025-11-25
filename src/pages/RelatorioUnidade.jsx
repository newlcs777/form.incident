import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// COMPONENTES REUTILIZADOS
import InputWrapper from "../components/InputWrapper";
import SelectUnidade from "../components/SelectUnidade";
import SelectSecretaria from "../components/SelectSecretaria";
import { calcularTempoAberto } from "../utils/calcularTempoAberto";

export default function RelatorioUnidade() {
  const incidents = useSelector((state) => state.incidents.incidents);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [secretariaSelecionada, setSecretariaSelecionada] = useState("");
  const [filtroTempo, setFiltroTempo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // ================================
  //       FILTROS - MODELO SÊNIOR
  // ================================
  const aplicarFiltros = () => {
    const filtros = [
      (item) =>
        !unidadeSelecionada || item.unidade === unidadeSelecionada,

      (item) =>
        !secretariaSelecionada || item.secretaria === secretariaSelecionada,

      (item) => {
        if (filtroTempo !== "1d") return true;
        const limite = new Date();
        limite.setDate(limite.getDate() - 1);
        return new Date(item.data) >= limite;
      },

      (item) => {
        if (filtroTempo !== "7d") return true;
        const limite = new Date();
        limite.setDate(limite.getDate() - 7);
        return new Date(item.data) >= limite;
      },

      (item) => {
        if (filtroTempo !== "15d") return true;
        const limite = new Date();
        limite.setDate(limite.getDate() - 15);
        return new Date(item.data) >= limite;
      },

      (item) => {
        if (filtroTempo !== "personalizado") return true;

        const dataItem = new Date(item.data);

        if (dataInicio && dataItem < new Date(dataInicio)) return false;
        if (dataFim && dataItem > new Date(dataFim)) return false;

        return true;
      }
    ];

    return incidents.filter((item) =>
      filtros.every((fn) => fn(item))
    );
  };

  const incidentesFiltrados = aplicarFiltros();

  // ================================
  //       EXPORTAÇÃO EXCEL
  // ================================
  function exportarExcel() {
    const dados = incidentesFiltrados.map((item) => ({
      Unidade: item.unidade,
      Secretaria: item.secretaria,
      Tipo: item.tipo,
      Status: item.status,
      Descrição: item.descricao,
      Aberto_em: new Date(item.data).toLocaleString("pt-BR"),
      Fechado_em: item.fechamento
        ? new Date(item.fechamento).toLocaleString("pt-BR")
        : "-",
      Tempo_total: item.fechamento
        ? calcularTempoAberto(item.data, item.fechamento)
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "relatorio_incidentes.xlsx");
  }

  // ================================
  //        RENDERIZAÇÃO
  // ================================
  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-[#0033A0] text-center mb-10">
        Relatório por Unidade
      </h1>

      {/* FILTROS */}
      <div className="
        w-full max-w-3xl mx-auto bg-white
        p-6 rounded-xl shadow border mb-10
        flex flex-col gap-6
      ">

        <InputWrapper label="Filtrar por Unidade">
          <SelectUnidade
            value={unidadeSelecionada}
            onChange={(e) => setUnidadeSelecionada(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper label="Filtrar por Secretaria">
          <SelectSecretaria
            value={secretariaSelecionada}
            onChange={(e) => setSecretariaSelecionada(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper label="Filtrar por Tempo">
          <select
            value={filtroTempo}
            onChange={(e) => setFiltroTempo(e.target.value)}
            className="
              w-full p-3 border border-gray-300 rounded-lg
              bg-gray-50 focus:ring-2 focus:ring-[#0033A0]
            "
          >
            <option value="">Sem filtro</option>
            <option value="1d">Último 1 dia</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="15d">Últimos 15 dias</option>
            <option value="personalizado">Intervalo personalizado</option>
          </select>
        </InputWrapper>

        {filtroTempo === "personalizado" && (
          <div className="flex flex-col gap-4">
            <InputWrapper label="Data Início">
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </InputWrapper>

            <InputWrapper label="Data Fim">
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </InputWrapper>
          </div>
        )}

      </div>

      {/* BOTÃO EXCEL */}
      <button
        onClick={exportarExcel}
        className="
          w-full max-w-3xl mx-auto mb-6
          bg-[#0033A0] hover:bg-[#002970]
          text-white font-semibold p-3 rounded-lg
          transition block
        "
      >
        Baixar Relatório em Excel
      </button>

      {/* TABELA */}
      <div className="
        w-full max-w-3xl mx-auto
        bg-white rounded-xl shadow border
        p-4 overflow-x-auto
      ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0033A0] text-white">
              <th className="p-3">Unidade</th>
              <th className="p-3">Secretaria</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Status</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Aberto em</th>
              <th className="p-3">Fechado em</th>
              <th className="p-3">Tempo Total</th>
            </tr>
          </thead>

          <tbody>
            {incidentesFiltrados.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.unidade}</td>
                <td className="p-3">{item.secretaria}</td>
                <td className="p-3">{item.tipo}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.descricao}</td>
                <td className="p-3">
                  {new Date(item.data).toLocaleString("pt-BR")}
                </td>
                <td className="p-3">
                  {item.fechamento
                    ? new Date(item.fechamento).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td className="p-3">
                  {item.fechamento
                    ? calcularTempoAberto(item.data, item.fechamento)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
