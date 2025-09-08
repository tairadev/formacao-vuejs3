<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Tracker" />
    </h1>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
});
</script>

<style scoped lang="scss">
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  nav {
    ul {
      li {
        margin: 4px 0;
        .link {
          color: #fff;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
