import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_PROJETO,
  ALTERA_TAREFA,
  ATUALIZAR_PROJETO,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  NOTIFICAR,
  REMOVER_PROJETO,
} from "./mutations-types";
import { INotificacao } from "@/interfaces/INotificacao";
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  EXCLUIR_PROJETO,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "./actions-types";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      };
      state.projetos.push(projeto);
    },
    [ATUALIZAR_PROJETO](state, projetoAtualizado: IProjeto) {
      const index = state.projetos.findIndex(
        (projeto) => projeto.id === projetoAtualizado.id
      );
      if (index !== -1) {
        state.projetos[index].nome = projetoAtualizado.nome;
      }
    },
    [REMOVER_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((projeto) => projeto.id !== id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
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
    [NOTIFICAR](state, notificacao: INotificacao) {
      state.notificacoes.push(notificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id !== notificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get("/projetos").then((response) => {
        commit(DEFINIR_PROJETOS, response.data);
      });
    },
    [CADASTRAR_PROJETO](_, nomeDoProjeto: string) {
      return http.post("/projetos", { nome: nomeDoProjeto });
    },
    [ALTERAR_PROJETO](_, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [EXCLUIR_PROJETO](_, id: string) {
      return http.delete(`/projetos/${id}`);
    },
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
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
