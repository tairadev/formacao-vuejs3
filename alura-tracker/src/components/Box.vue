<template>
  <div class="box has-text-weight-bold">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxVue",
});
</script>

<style lang="scss" scoped>
.box {
  background: #faf0ca;
  color: #22223b;
}
</style>
