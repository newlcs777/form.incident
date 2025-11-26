// src/components/buttons/ButtonExcel.jsx
import React from "react";

export default function ButtonExcel({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center justify-center gap-2
        bg-[#0033A0]
        hover:bg-[#002970]
        text-white
        font-medium
        px-4 py-2
        rounded-md
        shadow-sm
        text-sm
        transition
        w-auto
      "
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-4 h-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v12m0 0l4-4m-4 4l-4-4M6 20h12' />
      </svg>

      Baixar Excel
    </button>
  );
}
