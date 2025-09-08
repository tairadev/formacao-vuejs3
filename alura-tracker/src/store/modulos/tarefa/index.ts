import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { State } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/actions-types";
import { ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/mutations-types";
import { Module } from "vuex";

export interface TarefasState {
  tarefas: ITarefa[];
}

export const tarefa: Module<TarefasState, State> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas) {
      state.tarefas = tarefas;
    },
    [ALTERA_TAREFA](state, tarefaAtualizada: ITarefa) {
      const index = state.tarefas.findIndex(
        (tarefa) => tarefa.id === tarefaAtualizada.id
      );
      if (index !== -1) {
        state.tarefas[index] = tarefaAtualizada;
      }
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get("/tarefas").then((response) => {
        commit(DEFINIR_TAREFAS, response.data);
      });
    },
    [CADASTRAR_TAREFA]({ dispatch }, tarefa: ITarefa) {
      return http.post("/tarefas", tarefa).then(() => {
        dispatch(OBTER_TAREFAS);
      });
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => {
        commit(ALTERA_TAREFA, tarefa);
      });
    },
  },
};
