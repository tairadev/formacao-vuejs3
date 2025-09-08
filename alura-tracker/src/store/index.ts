import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_PROJETO,
  ATUALIZAR_PROJETO,
  NOTIFICAR,
  REMOVER_PROJETO,
} from "./mutations-types";
import { INotificacao } from "@/interfaces/INotificacao";

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
    [NOTIFICAR](state, notificacao: INotificacao) {
      state.notificacoes.push(notificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id !== notificacao.id
        );
      }, 3000);
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
