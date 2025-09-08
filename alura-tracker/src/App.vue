<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacoes,
  },
});
</script>

<style lang="scss">
main {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background: var(--bg-primario);
  color: var(--texto-primario);
  min-height: 100vh;
}
</style>
