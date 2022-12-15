<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      class="title"
      id="title"
      placeholder="Titre de l'article"
    />

    <select id="category">
      <option class="opt-cat" value="" selected disabled hidden>
        Catégorie de l'article
      </option>
    </select>
    
  </form>
  <div ref="editor" class="quillEditor"></div>
  <button class="PushButton" v-on:click="SaveArticle">
    Publier l'article
  </button>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import UserService from '../services/user.service';


export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      authors: null,
      categories: [],
      info: null,
    };
  },
  mounted() {
    // Get list of categories
    UserService.getCategories()
      .then((response) => {
        this.categories = response.data;
        console.log(this.categories)
      })
      .then((response) => {
        this.categories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category.name;
          option.text = category.name;
          document.getElementById('category').appendChild(option);
        });
      });

    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ header: '1' }, { header: '2' }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link'],
        ],
      },
      placeholder: "Contenu de l'article",
      theme: 'snow',
      formats: ['bold', 'underline', 'header', 'italic', 'link'],
    });
    this.editor.root.innerHTML = this.modelValue;
  },

  methods: {
    SaveArticle() {
      var selectCategory = document.getElementById('category');

      var article = {
        title: document.getElementById('title').value,
        content: this.editor.root.innerHTML,
        categories: [selectCategory.options[selectCategory.selectedIndex].value],
        creator: this.$store.state.auth.user.id,
      };
        UserService.postArticle(article)
        .then((response) => {
          this.$router.push('/');
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.category {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.PushButton {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
}

.PushButton:hover {
  background-color: #3b9d72;
}

.message {
  color: #42b983;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.quillEditor {
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}

.content {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.content:hover {
  background-color: #3b9d72;
}

.content a {
  color: white;
}

.content a:hover {
  color: white;
}

.content a:active {
  color: white;
}

.content a:visited {
  color: white;
}

.content a:link {
  color: white;
}

#category {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
}

#category:hover {
  background-color: #3b9d72;
}

#category a {
  color: white;
}



</style>

