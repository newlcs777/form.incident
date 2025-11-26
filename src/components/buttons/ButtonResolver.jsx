export default function ButtonResolver({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
      >
        Resolver
      </button>
    );
  }
  