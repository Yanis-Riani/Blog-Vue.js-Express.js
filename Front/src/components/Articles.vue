<template>
  <div class="search-wrapper panel-heading col-sm-12">
    <input type="text" v-model="search" placeholder="Rechercher" id="searchbar"/>
  </div>
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
    <input id="input-fav" type="checkbox" v-on:click="getFav()">
    <label for="input-fav">Favoris seulement</label>
  </div>
  <hr />
  <div v-if="isLoading" class="lds-dual-ring"></div>
  <div v-for="p in filteredPosts" :key="p.id">
    <h2>{{ p.id }} - {{ p.title }}</h2>
    <div class="category">
      <p class="p-category" v-for="c in p.categories" :key="c.id">{{ c }}</p>
    </div>
    <div v-html="p.content"></div>
    <div>
    <div>
      <button class="addFav" v-on:click="addFav(p.id)">Ajouter aux favoris</button>
    </div>
      <!-- <div>
        <button class="readMore" v-on:click="readMore(p.id)">Lire plus</button>
      </div> -->
    </div>
  </div>
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


      console.log(cat);
    },
    getFav() {
     
    },
    addFav(id) {
      axios
        .put('http://localhost:8080/likeFav/' + idU + id, { fav: 1})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // readMore(id) {
    //   fetch('http://localhost:8080/article/' + id)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.post[data.id].content = data.content
    //   });
    // }
  },
  computed: {
    //searchBar
    filteredPosts() {
      return this.post.filter((p) => {
        let valid = false;
        if (p.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1)
          valid = true;
        // return valid;
        if (this.category == '' || this.category == 'None') return valid;
        if (valid && p.categories.includes(this.category))
          return true;
        return false;
      });
    },
  },
  mounted() {
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

.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
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

.readMore {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1em;
}

.readMore:hover {
  background-color: #2b7a57;
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
