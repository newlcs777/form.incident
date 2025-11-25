import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo da página */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
