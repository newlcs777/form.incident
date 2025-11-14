import { useState } from "react";

export default function RegisterIncident({
  onAddIncident,
  incidents = [],
  onUpdateStatus,
}) {
  const [unidade, setUnidade] = useState("");
  const [secretaria, setSecretaria] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!unidade || !tipo || !descricao || !secretaria) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = {
      id: Date.now(),
      unidade,
      secretaria,
      tipo,
      descricao,
      status: "Não resolvido",
      data: new Date().toLocaleString(),
    };

    onAddIncident(novo);

    setUnidade("");
    setTipo("");
    setDescricao("");
    setSecretaria("");
  };

  const toggleStatus = (item) => {
    const novoStatus =
      item.status === "Resolvido" ? "Não resolvido" : "Resolvido";

    onUpdateStatus(item.id, novoStatus);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-6">

        {/* TÍTULO CENTRAL */}
        <h2 className="text-4xl font-bold text-[#0033A0] mb-10 text-center">
          Registrar Incidente
        </h2>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* UNIDADE */}
            <div>
              <label className="text-[#0033A0] font-semibold">Unidade</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0033A0]"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              >
                <option value="">Selecione a unidade</option>
                <option>Itaim Paulista</option>
                <option>Itaquera</option>
                <option>Parelheiros</option>
                <option>Aricanduva</option>
                <option>Guaianases</option>
                <option>Pirituba</option>
                <option>Itaim Bibi</option>
                <option>Penha</option>
                <option>São Mateus</option>
                <option>Capão Redondo</option>
              </select>
            </div>

            {/* SECRETARIA */}
            <div>
              <label className="text-[#0033A0] font-semibold">Secretaria</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0033A0]"
                value={secretaria}
                onChange={(e) => setSecretaria(e.target.value)}
              >
                <option value="">Selecione a secretaria</option>
                <option>ENEL</option>
                <option>SABESP</option>
                <option>Prodam</option>
                <option>Defesa Civil</option>
                <option>Educação</option>
                <option>Saúde</option>
                <option>Assistência Social</option>
                <option>Cultura</option>
                <option>Segurança Urbana</option>
                <option>Trabalho e Renda</option>
                <option>Zeladoria Urbana</option>
                <option>CET</option>
                <option>Iluminação Pública</option>
                <option>Outros</option>
              </select>
            </div>

            {/* TIPO */}
            <div>
              <label className="text-[#0033A0] font-semibold">Tipo</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0033A0]"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option>Selecione o tipo</option>
                <option>Tecnologia e Sistema</option>
                <option>Infraestrutura</option>
                <option>Limpeza e Manutenção</option>
                <option>Segurança e Acesso</option>
                <option>Operacional e Atendimento</option>
              </select>
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="text-[#0033A0] font-semibold">Descrição</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none focus:ring-[#0033A0]"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full bg-[#0033A0] hover:bg-[#002970] text-white font-semibold py-3 rounded-lg transition"
            >
              Adicionar Incidente
            </button>
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
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  {/* TOPO */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-900">
                      {item.unidade}
                      <span className="text-gray-600"> — {item.tipo}</span>
                    </p>

                    {/* BADGE */}
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-md ${
                        item.status === "Resolvido"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">
                    <strong>Secretaria:</strong> {item.secretaria}
                  </p>

                  <p className="text-gray-700 text-sm mt-2">{item.descricao}</p>

                  <p className="text-xs text-gray-500 mt-2">{item.data}</p>

                  {/* BOTÃO PEQUENO E ELEGANTE */}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => toggleStatus(item)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md text-white transition
                        ${
                          item.status === "Resolvido"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      {item.status === "Resolvido" ? "Reabrir" : "Resolver"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
