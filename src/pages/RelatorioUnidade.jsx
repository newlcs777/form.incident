import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// COMPONENTES REUTILIZADOS
import InputWrapper from "../components/inputs/InputWrapper";
import SelectUnidade from "../components/select/SelectUnidade";
import SelectSecretaria from "../components/select/SelectSecretaria";
import ButtonExcel from "../components/buttons/ButtonExcel";

import { calcularTempoAberto } from "../utils/calcularTempoAberto";

export default function RelatorioUnidade() {
  const incidents = useSelector((state) => state.incidents.incidents);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [secretariaSelecionada, setSecretariaSelecionada] = useState("");
  const [filtroTempo, setFiltroTempo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // ================================
  //            FILTROS
  // ================================
  const aplicarFiltros = () => {
    const filtros = [
      (item) => !unidadeSelecionada || item.unidade === unidadeSelecionada,
      (item) => !secretariaSelecionada || item.secretaria === secretariaSelecionada,

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

    return incidents.filter((item) => filtros.every((fn) => fn(item)));
  };

  const incidentesFiltrados = aplicarFiltros();

  // ================================
  //        EXPORTAÇÃO EXCEL
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
  //              RENDER
  // ================================
  return (
    <>
     
      {/* ================================
           CONTAINER DO RELATÓRIO
          ================================ */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">

        <h1 className="text-4xl font-bold text-[#0033A0] text-center mb-10">
          Relatório por Unidade
        </h1>

        {/* FILTROS */}
        <div
          className="
            w-full bg-white 
            p-4 md:p-6 rounded-xl shadow-sm 
            border border-gray-200/50 mb-8
            grid grid-cols-1 md:grid-cols-3 gap-6
          "
        >
          <div className="col-span-1">
            <InputWrapper label="Filtrar por Unidade">
              <SelectUnidade
                value={unidadeSelecionada}
                onChange={(e) => setUnidadeSelecionada(e.target.value)}
              />
            </InputWrapper>
          </div>

          <div className="col-span-1">
            <InputWrapper label="Filtrar por Secretaria">
              <SelectSecretaria
                value={secretariaSelecionada}
                onChange={(e) => setSecretariaSelecionada(e.target.value)}
              />
            </InputWrapper>
          </div>

          <div className="col-span-1">
            <InputWrapper label="Filtrar por Tempo">
              <select
                value={filtroTempo}
                onChange={(e) => setFiltroTempo(e.target.value)}
                className="
                  w-full p-2.5 border border-gray-300 rounded-lg
                  bg-gray-50 text-gray-700 text-sm
                  focus:ring-2 focus:ring-[#0033A0]
                "
              >
                <option value="">Sem filtro</option>
                <option value="1d">Último 1 dia</option>
                <option value="7d">Últimos 7 dias</option>
                <option value="15d">Últimos 15 dias</option>
                <option value="personalizado">Intervalo personalizado</option>
              </select>
            </InputWrapper>
          </div>

          {filtroTempo === "personalizado" && (
            <>
              <div className="col-span-1">
                <InputWrapper label="Data Início">
                  <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </InputWrapper>
              </div>

              <div className="col-span-1">
                <InputWrapper label="Data Fim">
                  <input
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </InputWrapper>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex justify-center mt-6 mb-4">

<ButtonExcel onClick={exportarExcel} />
</div>

        {/* TABELA */}
        <div
          className="
            w-full 
            bg-white rounded-xl shadow-sm 
            border border-gray-200/60
            p-4 overflow-x-auto
          "
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0033A0] text-white text-sm uppercase tracking-wide">
                <th className="p-3 whitespace-nowrap">Unidade</th>
                <th className="p-3 whitespace-nowrap">Secretaria</th>
                <th className="p-3 whitespace-nowrap">Tipo</th>
                <th className="p-3 whitespace-nowrap">Status</th>
                <th className="p-3 whitespace-nowrap">Descrição</th>
                <th className="p-3 whitespace-nowrap">Aberto em</th>
                <th className="p-3 whitespace-nowrap">Fechado em</th>
                <th className="p-3 whitespace-nowrap">Tempo Total</th>
              </tr>
            </thead>

            <tbody>
              {incidentesFiltrados.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 text-sm transition"
                >
                  <td className="p-3 whitespace-nowrap">{item.unidade}</td>
                  <td className="p-3 whitespace-nowrap">{item.secretaria}</td>
                  <td className="p-3 whitespace-nowrap">{item.tipo}</td>
                  <td className="p-3 whitespace-nowrap">{item.status}</td>
                  <td className="p-3">{item.descricao}</td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(item.data).toLocaleString("pt-BR")}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {item.fechamento
                      ? new Date(item.fechamento).toLocaleString("pt-BR")
                      : "-"}
                  </td>
                  <td className="p-3 whitespace-nowrap">
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
    </>
  );
}
