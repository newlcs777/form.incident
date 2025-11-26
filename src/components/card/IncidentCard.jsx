import InputWrapper from "../inputs/InputWrapper";
import { ButtonSalvar, ButtonCancelar } from "../buttons/ButtonPanel";
import { calcularTempoAberto } from "../../utils/calcularTempoAberto";
import HistoricoFechamentos from "../historico/HistoricoFechamentos";
import ButtonEditar from "../buttons/ButtonEditar";

// BOTÕES
import ButtonResolver from "../buttons/ButtonResolver";
import ButtonReabrir from "../buttons/ButtonReabrir";
import ButtonEmAndamento from "../buttons/ButtonEmAndamento";

export default function IncidentCard({
  item,
  editingId,
  editingFechamento,
  onResolver,
  onReabrir,
  onAndamento,
  onEditClick,
  onChangeFechamento,
  onSaveFechamento,
}) {

  const isEditing = editingId === item.id;

  return (
    <div
      className="
        bg-white border border-gray-200
        p-4 sm:p-6
        rounded-xl shadow-sm
        hover:shadow-md transition
      "
    >

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-3">

        <div className="w-full">
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {item.unidade}
            <span className="text-gray-600"> — {item.tipo}</span>
          </p>

          {/* BADGE DE STATUS */}
          <span
            className={`
              px-3 py-1 mt-1 inline-block rounded-md text-white text-xs
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
        </div>

        {/* BOTÕES DE STATUS */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2">

          {item.status === "Não resolvido" && (
            <>
              <ButtonResolver onClick={() => onResolver(item)} />
              <ButtonEmAndamento onClick={() => onAndamento(item.id)} />
            </>
          )}

          {item.status === "Em andamento" && (
            <>
              <ButtonResolver onClick={() => onResolver(item)} />
              <ButtonReabrir onClick={() => onReabrir(item)} />
            </>
          )}

          {item.status === "Resolvido" && (
            <ButtonReabrir onClick={() => onReabrir(item)} />
          )}

        </div>
      </div>

      {/* Secretaria */}
      <p className="text-gray-600 text-xs sm:text-sm">
        <strong>Secretaria:</strong> {item.secretaria}
      </p>

      {/* Descrição */}
      <p className="text-gray-700 text-sm mt-2 leading-relaxed">
        {item.descricao}
      </p>

      {/* Abertura */}
      <p className="text-xs text-gray-500 mt-2">
        Aberto em: {new Date(item.data).toLocaleString()}
      </p>

      {/* Fechamento + botão Editar */}
      {item.fechamento && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-1">
            <span className="text-sm">
              <strong>Resolvido em:</strong>{" "}
              {new Date(item.fechamento).toLocaleString()}
            </span>

            <ButtonEditar onClick={() => onEditClick(item)} />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Tempo total aberto: {calcularTempoAberto(item.data, item.fechamento)}
          </p>
        </>
      )}

      {/* Painel Expansível de edição */}
      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${isEditing ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}
        `}
      >
        <InputWrapper label="Ajustar horário de fechamento:">
          <input
            type="datetime-local"
            className="
              w-full p-2 border border-gray-300
              rounded-lg bg-gray-50 text-sm
            "
            value={editingFechamento}
            onChange={(e) => onChangeFechamento(e.target.value)}
          />
        </InputWrapper>

        <div className="flex gap-2 mt-2 justify-end">
          <ButtonCancelar onClick={() => onEditClick(item)} />
          <ButtonSalvar onClick={() => onSaveFechamento(item.id)} />
        </div>
      </div>

      {/* Histórico de edições */}
      {item.historicoFechamentos?.length > 0 && (
        <HistoricoFechamentos historico={item.historicoFechamentos} />
      )}

    </div>
  );
}
