<template>
  <div class="article">
    <h1>{{ article.title }}</h1>
    <div class="category">
      <p class="p-category" v-for="c in article.categories" :key="c.id">{{ c }}</p>
    </div>
    <div class="content" v-html="article.content"></div>
  </div>
</template>
  
  <script>
  import UserService from '../services/user.service';
  export default {
    name: 'Article',

    data() {
        return {
            id: null,
            article: null,
        };
    },

    created() {
        this.id = this.$route.params.id;
        this.getArticle();
    },

    methods: {
        getArticle() {
            UserService.getArticle(this.id)
            .then((response) => {
                this.article = response.data;
            });
        }
    }
  };
  </script>
  
 
<style scoped>
.article {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 20px;
}

.category {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.p-category {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
}

.content {
  margin-top: 20px;
  font-size: 1.1em;
  line-height: 1.5em;
}

</style>
  