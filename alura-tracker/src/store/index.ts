import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./mutations-types";
import { INotificacao } from "@/interfaces/INotificacao";
import { projeto, ProjetosState } from "./modulos/projeto";
import { tarefa } from "./modulos/tarefa";
import { TarefasState } from "./modulos/tarefa";

export interface State {
  notificacoes: INotificacao[];
  tarefa: TarefasState;
  projeto: ProjetosState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notificacoes: [],
    tarefa: { tarefas: [] },
    projeto: { projetos: [] },
  },
  mutations: {
    [NOTIFICAR](state, notificacao: INotificacao) {
      state.notificacoes.push(notificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id !== notificacao.id
        );
      }, 3000);
    },
  },
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
