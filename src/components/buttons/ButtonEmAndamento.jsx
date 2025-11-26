export default function ButtonEmAndamento({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-xs font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition"
      >
        Andamento
      </button>
    );
  }
  