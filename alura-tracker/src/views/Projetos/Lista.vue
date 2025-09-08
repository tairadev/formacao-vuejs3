<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <div class="fas fa-plus"></div>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="removerProjeto(projeto.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { EXCLUIR_PROJETO, OBTER_PROJETOS } from "@/store/actions-types";

export default defineComponent({
  name: "ListaView",
  setup() {
    const store = useStore();

    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
  methods: {
    removerProjeto(id: string) {
      this.store
        .dispatch(EXCLUIR_PROJETO, id)
        .then(() => this.store.dispatch(OBTER_PROJETOS))
        .catch((erro: Error) => console.error(erro));
    },
  },
});
</script>
