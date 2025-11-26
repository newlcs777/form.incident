export default function ButtonEdit({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          text-[12px]
          font-semibold
          text-green-700
          border
          border-green-300
          bg-green-50
          hover:bg-green-100
          px-3
          py-1
          rounded-md
          transition
          w-auto
          inline-flex
          items-center
          justify-center
        "
      >
        Editar
      </button>
    );
  }
  