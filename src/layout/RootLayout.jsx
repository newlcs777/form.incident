import Sidebar from "../components/sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar sempre visível — NÃO some no mobile */}
      <Sidebar />

      {/* Conteúdo + rodapé */}
      <div className="flex flex-col flex-1 min-h-screen overflow-x-auto">

        {/* Conteúdo da página */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        {/* Rodapé fixo no final */}
        <footer className="py-4 text-center text-sm text-gray-500 border-t">
          Desenvolvido por <span className="font-semibold">Lucas Serralheiro Cardoso</span> — 2025
        </footer>

      </div>
    </div>
  );
}
