<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Tracker" />
    </h1>
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
  computed: {
    textoBotao(): string {
      return this.modoEscuroAtivo
        ? "Desativar modo escuro"
        : "Ativar modo escuro";
    },
  },
});
</script>

<style scoped lang="scss">
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
