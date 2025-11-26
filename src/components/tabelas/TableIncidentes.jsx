export default function TableIncidentes({ incidentes }) {
    return (
      <div
        className="
          w-full max-w-5xl mx-auto
          bg-white rounded-xl shadow-sm border border-gray-200/60
          p-4 overflow-x-auto
        "
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0033A0] text-white text-sm">
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
            {incidentes.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-sm">
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
    );
  }
  