import InputWrapper from "./InputWrapper";
import ButtonStatus from "./ButtonStatus";
import { ButtonSalvar, ButtonCancelar } from "./ButtonPanel";
import { calcularTempoAberto } from "../utils/calcularTempoAberto";
import HistoricoFechamentos from "./HistoricoFechamentos";
import ButtonEditar from "./ButtonEditar";

export default function IncidentCard({
  item,
  editingId,
  editingFechamento,
  onToggleStatus,
  onEditClick,
  onChangeFechamento,
  onSaveFechamento,
}) {
  const isEditing = editingId === item.id;

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-900">
          {item.unidade}
          <span className="text-gray-600"> — {item.tipo}</span>
        </p>

        <ButtonStatus status={item.status} onClick={() => onToggleStatus(item)} />
      </div>

      {/* Secretaria */}
      <p className="text-gray-600 text-sm">
        <strong>Secretaria:</strong> {item.secretaria}
      </p>

      {/* Descrição */}
      <p className="text-gray-700 text-sm mt-2">{item.descricao}</p>

      {/* Abertura */}
      <p className="text-xs text-gray-500 mt-2">
        Aberto em: {new Date(item.data).toLocaleString()}
      </p>

      {/* Fechamento + botão Editar */}
      {item.fechamento && (
        <>
          <div className="flex items-center justify-between mt-3">
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
        className={`transition-all duration-300 overflow-hidden ${
          isEditing ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <InputWrapper label="Ajustar horário de fechamento:">
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
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
