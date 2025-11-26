export default function ButtonReabrir({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition"
      >
        Reabrir
      </button>
    );
  }
  