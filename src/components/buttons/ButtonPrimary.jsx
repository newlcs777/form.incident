
//botão padrão//

export default function ButtonPrimary({ children, ...props }) {
    return (
      <button
        {...props}
        className="
          w-full
          bg-[#0033A0]
          hover:bg-[#002970]
          text-white
          font-semibold
          py-3
          rounded-lg
          transition
        "
      >
        {children}
      </button>
    );
  }
  