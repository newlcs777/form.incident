//(Salvar / Cancelar)//

export function ButtonSalvar({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-xs rounded-md bg-[#0033A0] text-white"
      >
        Salvar horário
      </button>
    );
  }
  
  export function ButtonCancelar({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700"
      >
        Cancelar
      </button>
    );
  }
  