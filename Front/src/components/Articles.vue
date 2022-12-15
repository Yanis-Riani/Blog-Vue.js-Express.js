<template>
  <section id="search-section">
    <div class="search-wrapper panel-heading col-sm-12">
      <input type="text" v-model="search" placeholder="Rechercher" id="searchbar"/>
    </div>
  </section>
  <section>
    <div class="heading">
      <div class="li-categories">
        <p id="title-categories">Catégorie : </p>
        <li>
          <button class="select-category" v-on:click="setCat('')">Aucune</button>
        </li>
        <li v-for="cat in categories" :key="cat.id">
          <button class="select-category" v-on:click="setCat(cat)">
            {{ cat.name }}
          </button>
        </li>
      </div>
    </div>
    <div>
      <input id="input-fav" type="checkbox" @change="getFav($event)">
      <label for="input-fav">Favoris seulement</label>
    </div>
  </section>
  <section>
    <hr />
    <div v-if="isLoading" class="lds-dual-ring"></div>
    <div v-for="p in filteredPosts" :key="p.id" class="article-wrapper">
      <a v-bind:href="'/article/'+p.id"><h2>{{ p.id }} - {{ p.title }}</h2></a>
      <div class="category">
        <p class="p-category" v-for="c in p.categories" :key="c.id">{{ c }}</p>
      </div>
      <div v-html="getBeggining(p.content)"></div>
      <div>
        <div>
          <button class="addFav" v-on:click="addFav(p.id)">Ajouter aux favoris</button>
          <router-link :to="{ name: 'Article', params: { id: p.id }}" class="readmore">Lire Plus</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Articles',
  
  data() {
    return {
      post: [],
      isLoading: false,
      search: '',
      category: '',
      categories: [],
      onlyFav: false,
      favId: [],
    };
  },
  methods: {
    getPosts(id = null) {
      this.isLoading = true;
      UserService.getArticles()
      .then((response) => {
        this.post = response.data;
        this.isLoading = false;
      });
    },
    getCat() {
      UserService.getCategories()
      .then((response) => {
        this.categories = response.data;
      });
    },
    setCat(cat) {
      if (cat == '') this.category = '';
      else {
        console.log(cat);
        this.category = cat.name;
        this.getPosts(cat.id);
      }
    },
    getFav(event) {
      if (!event.target.checked) {
        this.onlyFav = false;
        return;
      }
      UserService.getFav(this.$store.state.auth.user.id)
      .then((response) => {
        this.favId = response.data;
      });
      this.onlyFav = true;
    },
    addFav(idP) {
      let fav = {
        articleid: idP,
        fav: 1,
      };
      UserService.putFav(this.$store.state.auth.user.id, idP, fav)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getBeggining(content) {
      let res = content.split(' ', 50);
      let res2 = res.join(' ');
      if (res2.length < content.length) res2 += '...';
      return res2;
    },
  },
      computed: {
        //searchBar
        filteredPosts() {
          return this.post.filter((p) => {
            let valid = false;
            if (p.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1)
            valid = true;
            if (valid && this.onlyFav) {
              for (let i = 0; i < this.favId.length; i++) {
                if (p.id == this.favId[i].articleId) {
                  valid = true;
                  break;
                }
                else valid = false;
              }
            }
            if (this.category == '' || this.category == 'None') return valid;
            if (valid && p.categories.includes(this.category))
            return true;
            return false;
          });
        },
      },
      created () {
        this.getPosts();
        this.getCat();
      },
    };
  </script>
  
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  
  #search-section {
    margin-top: 40px;
    margin-left: -40px;
    margin-right: -40px;
  }
  .search-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    margin-bottom: 40px;
  }
  
  #searchbar {
    width: 100%;
    padding: 10px;
    font-size: 1.1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  .article-wrapper {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .article-wrapper h2 {
    margin: 0 0 20px;
  }
  .article-wrapper p {
    margin: 0 0 10px;
  }
  .article-wrapper p:last-child {
    margin-bottom: 0;
  } 
  .article-wrapper .category {
    margin-bottom: 20px;
  }
  .article-wrapper .category p {
    display: inline-block;
    margin: 0 10px 0 0;
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border-radius: 4px;
  }
  .article-wrapper .category p:last-child {
    margin-right: 0;
  }
  .article-wrapper .category p:hover {
    background-color: #2b7a57;
  }
  .article-wrapper .category p:active {
    background-color: #2b7a57;
  }
  .article-wrapper .category p:focus {
    background-color: white;
    color: #42b983;
    border: 1px solid #42b983;
  }
  .article-wrapper .category p:active {
    background-color: #2b7a57;
  }
  .article-wrapper .category p:disabled {
    background-color: #ccc;
    color: white;
    cursor: not-allowed;
  }
  .article-wrapper .category p:disabled:hover {
    background-color: #ccc;
  }
  .article-wrapper .category p:disabled:active {
    background-color: #ccc;
  }
  .article-wrapper .category p:disabled:focus {
    background-color: #ccc;
    color: white;
    border: 1px solid #ccc;
  }
  .article-wrapper .category p:disabled:active {
    background-color: #ccc;
  }
  .article-wrapper .category p:disabled:focus {
    background-color: #ccc;
    color: white;
    border: 1px solid #ccc;
  }
  .article-wrapper .category p:disabled:active {
    background-color: #ccc;
  }
  .article-wrapper:hover{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    background-color: aquamarine;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .select-category {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  .select-category:hover {
    background-color: #2b7a57;
  }
  
  .select-category:focus {
    background-color: white;
    color: #42b983;
    border: 1px solid #42b983;
  }
  
  .select-category:active {
    background-color: #2b7a57;
  }
  
  .select-category:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .select-category:disabled:hover {
    background-color: #ccc;
  }
  
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid rgb(0, 0, 0);
    border-color: rgb(68, 68, 68) transparent rgb(68, 68, 68) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  .category {
    color: #42b983;
    font-size: 0.8em;
    margin: 10px 0;
    
  }
  
  .p-category {
    display: inline;
    margin: 0 10px;
  }
  
  .addFav {
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  .addFav:hover {
    background-color: #2b7a57;
  }
  
  #input-fav, #fav{
    margin: 0 10px;
  }
  
  #title-categories {
    margin: 0 10px;
    color: #42b983;
  }
.readmore {
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.1em;
  }  
  
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
