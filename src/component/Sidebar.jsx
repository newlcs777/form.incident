import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
        w-64 
        h-screen 
        bg-white 
        border-r 
        border-gray-200 
        shadow-sm 
        px-6 
        py-8 
        flex 
        flex-col
      "
    >
      {/* Título */}
      <h2 className="text-[18px] font-semibold text-[#1E1E1E] mb-8 tracking-tight">
        Gestão de Conhecimento
      </h2>

      {/* Menu */}
      <nav className="flex flex-col gap-1 text-[15px] font-medium">

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
              px-3 py-2 rounded-md flex items-center gap-2
              transition-all
              ${isActive
                ? "bg-[#E5EEFF] text-[#0044CC] border-l-4 border-[#0044CC] pl-2"
                : "text-gray-700 hover:bg-gray-100"}
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

        {/* ➤ NOVA ROTA DO GRÁFICO */}
        <NavLink
          to="/grafico"
          className={({ isActive }) =>
            `
              px-3 py-2 rounded-md flex items-center gap-2 mt-1
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

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `
              px-3 py-2 rounded-md flex items-center gap-2 mt-4
              transition-all
              ${isActive
                ? "bg-[#0044CC] text-white"
                : "text-gray-700 hover:bg-gray-100"}
            `
          }
        >
          Registrar Incidente
        </NavLink>
      </nav>
    </aside>
  );
}
