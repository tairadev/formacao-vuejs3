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
import useNotificador from "@/hooks/notificador";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/actions-types";

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
      const projeto = this.store.state.projeto.projetos.find(
        (p) => p.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    async salvar() {
      const edit = Boolean(this.id);

      const action = edit ? ALTERAR_PROJETO : CADASTRAR_PROJETO;
      const payload = edit
        ? { id: this.id, nome: this.nomeDoProjeto }
        : this.nomeDoProjeto;

      const mensagem = edit
        ? "O projeto foi alterado com sucesso!"
        : "O projeto foi cadastrado com sucesso!";

      try {
        await this.store.dispatch(action, payload);

        this.notificar(TipoNotificacao.Sucesso, "Excelente!", mensagem);
        this.nomeDoProjeto = "";
        this.$router.push("/projetos");
      } catch (erro) {
        this.notificar(
          TipoNotificacao.Erro,
          "Ops!",
          "Não foi possível salvar o projeto."
        );
        console.error(erro);
      }
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
