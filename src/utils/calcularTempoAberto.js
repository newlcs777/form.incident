
export function calcularTempoAberto(abertura, fechamento) {
    if (!abertura || !fechamento) return "";
  
    const inicio = new Date(abertura);
    const fim = new Date(fechamento);
  
    const diff = fim - inicio;
  
    const horas = Math.floor(diff / 3600000);     // 1 hora = 3.600.000 ms
    const minutos = Math.floor((diff % 3600000) / 60000);  // 1 min = 60.000 ms
  
    return `${horas}h ${minutos}min`;
  }
  