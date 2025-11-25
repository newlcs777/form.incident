export default function ButtonStatus({ status, onClick }) {
  const resolved = status === "Resolvido";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 text-sm font-semibold rounded-md text-white transition
        ${resolved ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
      `}
      style={{ width: "110px" }} // largura fixa para NÃO quebrar layout
    >
      {resolved ? "Reabrir" : "Resolver"}
    </button>
  );
}
