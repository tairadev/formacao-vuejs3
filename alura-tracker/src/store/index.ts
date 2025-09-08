import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_PROJETO,
  ATUALIZAR_PROJETO,
  DEFINIR_PROJETOS,
  NOTIFICAR,
  REMOVER_PROJETO,
} from "./mutations-types";
import { INotificacao } from "@/interfaces/INotificacao";
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  EXCLUIR_PROJETO,
  OBTER_PROJETOS,
} from "./actions-types";
import http from "@/http";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
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
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
