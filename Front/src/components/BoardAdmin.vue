<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Panel Administrateur</h3>
    </header>
    <div v-for="c in content" :key="c.id">
      <p>Id : {{ c.id }}</p>
      <ul>
        <li>Nom d'utilisateur : {{ c.username }}</li>
        <li>Email : {{ c.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'Admin',
  data() {
    return {
      content: [],
    };
  },
  mounted() {
    UserService.getAdminBoard()
    .then((response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
