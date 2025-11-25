import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addIncident, updateIncidentStatus } from "../store/incidentsSlice";

import SelectUnidade from "../components/SelectUnidade";
import SelectSecretaria from "../components/SelectSecretaria";
import SelectTipoIncidente from "../components/SelectTipoIncidente";
import TextareaDescricao from "../components/TextareaDescricao";

import ButtonPrimary from "../components/ButtonPrimary";
import IncidentCard from "../components/IncidentCard";
import InputWrapper from "../components/InputWrapper";

export default function RegisterIncident() {
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incidents.incidents);

  const [unidade, setUnidade] = useState("");
  const [secretaria, setSecretaria] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingFechamento, setEditingFechamento] = useState("");

  // ======================================
  // SALVAR NOVO INCIDENTE
  // ======================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!unidade || !tipo || !descricao || !secretaria) {
      alert("Preencha todos os campos!");
      return;
    }

    dispatch(
      addIncident({
        id: Date.now(),
        unidade,
        secretaria,
        tipo,
        descricao,
        status: "Não resolvido",
        data: new Date().toISOString(),
        fechamento: null,
        historicoFechamentos: [],
      })
    );

    setUnidade("");
    setSecretaria("");
    setTipo("");
    setDescricao("");
  };

  // ======================================
  // RESOLVER / REABRIR (CORRIGIDO!)
  // ======================================
  const toggleStatus = (item) => {
    const novoStatus =
      item.status === "Resolvido" ? "Não resolvido" : "Resolvido";

    // Reabrir — funciona normal
    if (novoStatus === "Não resolvido") {
      dispatch(
        updateIncidentStatus({
          id: item.id,
          status: "Não resolvido",
        })
      );
      setEditingId(null);
      setEditingFechamento("");
      return;
    }

    // Resolver — NÃO cria outra data se já existir
    dispatch(
      updateIncidentStatus({
        id: item.id,
        status: "Resolvido",
        fechamentoManual: item.fechamento || new Date().toISOString(),
      })
    );
  };

  // ======================================
  // EDITAR FECHAMENTO
  // ======================================
  const handleEditClick = (item) => {
    if (editingId === item.id) {
      setEditingId(null);
      setEditingFechamento("");
      return;
    }

    setEditingId(item.id);

    const base = item.fechamento ? new Date(item.fechamento) : new Date();
    setEditingFechamento(base.toISOString().slice(0, 16));
  };

  // ======================================
  // SALVAR FECHAMENTO EDITADO
  // ======================================
  const handleSaveFechamento = (id) => {
    if (!editingFechamento) return;

    dispatch(
      updateIncidentStatus({
        id,
        status: "Resolvido",
        fechamentoManual: new Date(editingFechamento).toISOString(),
      })
    );

    setEditingId(null);
    setEditingFechamento("");
  };

  // ======================================
  // RENDER
  // ======================================
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-[#0033A0] mb-4 text-center">
          Registrar Incidente
        </h2>

        <div className="flex justify-center gap-6 mb-10">
          <Link to="/register" className="text-[#0033A0] font-semibold hover:underline underline-offset-4">
            Registrar Incidente
          </Link>

          <Link to="/relatorio-unidade" className="text-gray-700 font-semibold hover:underline underline-offset-4">
            Relatório dos Incidentes
          </Link>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <InputWrapper label="Unidade">
              <SelectUnidade value={unidade} onChange={(e) => setUnidade(e.target.value)} />
            </InputWrapper>

            <InputWrapper label="Secretaria">
              <SelectSecretaria value={secretaria} onChange={(e) => setSecretaria(e.target.value)} />
            </InputWrapper>

            <InputWrapper label="Tipo">
              <SelectTipoIncidente value={tipo} onChange={(e) => setTipo(e.target.value)} />
            </InputWrapper>

            <InputWrapper label="Descrição">
              <TextareaDescricao value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </InputWrapper>

            <ButtonPrimary type="submit">Adicionar Incidente</ButtonPrimary>
          </form>
        </div>

        {/* LISTA */}
        <div className="mt-14 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-[#0033A0] mb-6 text-center">
            Incidentes Registrados
          </h3>

          {incidents.length === 0 ? (
            <p className="text-gray-600">Nenhum incidente registrado.</p>
          ) : (
            <div className="space-y-5 w-full max-w-xl">
              {incidents.map((item) => (
                <IncidentCard
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editingFechamento={editingFechamento}
                  onToggleStatus={toggleStatus}
                  onEditClick={handleEditClick}
                  onChangeFechamento={setEditingFechamento}
                  onSaveFechamento={handleSaveFechamento}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
