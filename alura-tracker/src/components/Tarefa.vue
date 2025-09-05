<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">Descrição da Tarefa</div>
      <div class="column">
        <Cronometro :tempo-em-segundos="15" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
export default defineComponent({
  name: "TarefaVue",
  components: {
    Cronometro,
  },
});
</script>

<style lang="scss" scoped>
.box {
  background: #faf0ca;
}
</style>
