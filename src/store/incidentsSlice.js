import { createSlice } from "@reduxjs/toolkit";

const incidentsSlice = createSlice({
  name: "incidents",
  initialState: {
    incidents: [],
  },
  reducers: {
    addIncident: (state, action) => {
      state.incidents.push(action.payload);
    },

    updateIncidentStatus: (state, action) => {
      const { id, status, fechamentoManual } = action.payload;

      const incident = state.incidents.find((item) => item.id === id);
      if (!incident) return;

      if (!incident.historicoFechamentos) {
        incident.historicoFechamentos = [];
      }

      // ========================================================
      //              NOVO STATUS: EM ANDAMENTO
      // ========================================================
      if (status === "Em andamento") {
        incident.status = "Em andamento";

        // Mantém a data de fechamento caso já exista
        // porque ainda não está resolvido em definitivo
        return;
      }

      // ========================================================
      //                     REABRIR INCIDENTE
      // ========================================================
      if (status === "Não resolvido") {
        incident.status = "Não resolvido";
        incident.fechamento = null; // Remove a data
        return;
      }

      // ========================================================
      //                     RESOLVER INCIDENTE
      // ========================================================
      if (status === "Resolvido") {
        incident.status = "Resolvido";

        // -------- CASO 1: PRIMEIRA RESOLUÇÃO --------
        if (!incident.fechamento && !fechamentoManual) {
          const agora = new Date().toISOString();

          incident.fechamento = agora;

          incident.historicoFechamentos.push({
            editadoEm: agora,
            novoFechamento: agora,
            origem: "Automático",
          });

          return;
        }

        // -------- CASO 2: JÁ EXISTE FECHAMENTO (NÃO ALTERA) --------
        if (!fechamentoManual) {
          return;
        }

        // -------- CASO 3: FECHAMENTO EDITADO MANUALMENTE --------
        incident.fechamento = fechamentoManual;

        incident.historicoFechamentos.push({
          editadoEm: new Date().toISOString(),
          novoFechamento: fechamentoManual,
          origem: "Manual",
        });

        return;
      }
    },
  },
});

export const { addIncident, updateIncidentStatus } = incidentsSlice.actions;
export default incidentsSlice.reducer;
