<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ADICIONAR_PROJETO, ATUALIZAR_PROJETO } from "@/store/mutations-types";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "FormularioProjetos",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((p) => p.id === this.id);
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ATUALIZAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.store.commit("notificar", {
        tipo: TipoNotificacao.Sucesso,
        titulo: "Sucesso!",
        texto: "Projeto salvo com sucesso!",
      });
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
