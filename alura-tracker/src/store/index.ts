import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
  },
  mutations: {
    adicionarProjeto(state, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      };
      state.projetos.push(projeto);
    },
    atualizarProjeto(state, projetoAtualizado: IProjeto) {
      const index = state.projetos.findIndex(
        (projeto) => projeto.id === projetoAtualizado.id
      );
      if (index !== -1) {
        state.projetos[index].nome = projetoAtualizado.nome;
      }
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
