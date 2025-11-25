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

      // ===========================
      //   REABRIR INCIDENTE
      // ===========================
      if (status === "Não resolvido") {
        incident.status = "Não resolvido";
        incident.fechamento = null;   // Remove horário
        return;
      }

      // ===========================
      //   RESOLVER INCIDENTE
      // ===========================
      incident.status = "Resolvido";

      // ************* CASO 1: PRIMEIRA RESOLUÇÃO *************
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

      // ************* CASO 2: JÁ EXISTE FECHAMENTO *************
      // Resolver novamente NÃO muda a data
      if (!fechamentoManual) {
        return;
      }

      // ************* CASO 3: EDIÇÃO MANUAL *************
      incident.fechamento = fechamentoManual;

      incident.historicoFechamentos.push({
        editadoEm: new Date().toISOString(),
        novoFechamento: fechamentoManual,
        origem: "Manual",
      });
    },
  },
});

export const { addIncident, updateIncidentStatus } = incidentsSlice.actions;
export default incidentsSlice.reducer;
