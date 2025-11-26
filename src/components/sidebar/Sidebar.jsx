import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
        bg-white 
        border-r border-gray-200 
        shadow-sm 
        flex flex-col
        
        h-screen
        
        w-40 sm:w-48 md:w-64   /* ← Responsivo sem esconder */
        px-4 sm:px-5 md:px-6   /* ← Padding responsivo */
        py-6 sm:py-7 md:py-8
      "
    >
      {/* Título */}
      <h2 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mb-6 tracking-tight">
        Gestão de Conhecimento
      </h2>

      {/* Menu */}
      <nav className="flex flex-col gap-1 text-[13px] sm:text-[14px] md:text-[15px] font-medium">

        <div
          className="
            px-3 py-2 
            text-gray-700 
            rounded-md 
            cursor-pointer 
            hover:bg-gray-100 
            transition
          "
        >
          Comunicados
        </div>

        <NavLink
          to="/incidentes"
          className={({ isActive }) =>
            `
              px-3 py-2 rounded-md flex items-center gap-1 sm:gap-2
              transition-all
              ${
                isActive
                  ? "bg-[#E5EEFF] text-[#0044CC] border-l-4 border-[#0044CC] pl-2"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `
          }
        >
          Fórum de Incidentes
        </NavLink>

        <div
          className="
            px-3 py-2 
            text-gray-700 
            rounded-md 
            cursor-pointer 
            hover:bg-gray-100 
            transition
          "
        >
          Formação e Capacitação
        </div>

        <div
          className="
            px-3 py-2 
            text-gray-700 
            rounded-md 
            cursor-pointer 
            hover:bg-gray-100 
            transition
          "
        >
          Biblioteca
        </div>

        {/* ➤ Gráfico */}
        <NavLink
          to="/grafico"
          className={({ isActive }) =>
            `
              px-3 py-2 rounded-md flex items-center gap-1 sm:gap-2 mt-1
              transition-all
              ${
                isActive
                  ? "bg-[#E5EEFF] text-[#0044CC] border-l-4 border-[#0044CC] pl-2"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `
          }
        >
          Gráfico de Incidentes
        </NavLink>

        {/* Registrar Incidente */}
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `
              px-3 py-2 rounded-md flex items-center gap-1 sm:gap-2 mt-4
              transition-all
              ${
                isActive
                  ? "bg-[#0044CC] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `
          }
        >
          Registrar Incidente
        </NavLink>
      </nav>

      {/* Rodapé de assinatura */}
      <div className="mt-auto pt-4 text-[11px] text-gray-500">
        Desenvolvido por <br />
        Lucas Serralheiro Cardoso — 2025
      </div>
    </aside>
  );
}
