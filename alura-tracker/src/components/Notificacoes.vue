<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="classeNotificacao[notificacao.tipo]"
      v-for="(notificacao, indice) in notificacoes"
      :key="indice"
    >
      <div class="message-header">
        {{ notificacao.titulo }}
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "NotificacoesVue",
  data() {
    return {
      classeNotificacao: {
        [TipoNotificacao.Sucesso]: "is-success",
        [TipoNotificacao.Erro]: "is-danger",
        [TipoNotificacao.Info]: "is-warning",
      },
    };
  },
  setup() {
    const store = useStore();
    return { notificacoes: computed(() => store.state.notificacoes) };
  },
});
</script>

<style lang="scss" scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 1;
}
</style>
