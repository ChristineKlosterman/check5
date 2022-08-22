<template>
  <nav class="navbar navbar-expand-lg navbar-secondary bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon bg-light rounded" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-light lighten-30 selectable text-uppercase">
            Home
          </router-link>
        </li>
      </ul>
      <div class="m-3">
        <SearchForm />
      </div>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import SearchForm from './SearchForm.vue';
export default {
  setup() {
    return {};
  },
  components: { SearchForm }
};
</script>

<style scoped>
</style>
