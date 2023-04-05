<template>
  <div class="article">
    <h1>{{ article.title }}</h1>
    <div class="category">
      <p class="p-category" v-for="c in article.categories" :key="c.id">{{ c }}</p>
    </div>
    <div class="content" v-html="article.content"></div>
  </div>
  
  <section class="comment-like">
    <!-- <div class="like">
      <button v-on:click="Like">Liker</button><div>0</div>
    </div> -->
    <div class="like">
      <button v-on:click="Like">Liker</button><div>{{ like }}</div>
    </div>
    <div class="comment">
      <h2>Commentaires</h2>
      <div class="comment-post">
        <div ref="editor" class="quillEditor"></div>
        <button class="PushButton" v-on:click="SaveComment">
          Publier le commentaire
        </button>
        <p v-html="info"></p>
      </div>
      <div class="comment-wrapper">
        <div class="comment-item" v-for="c in comments" :key="c.id">
          <div class="comment-header">
            <p class="comment-author">{{ c.creator }} - {{ c.createdAt }}</p>
          </div>
          <div class="comment-content">
            <div v-html="c.content"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { tSMethodSignature } from '@babel/types';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import UserService from '../services/user.service';
export default {
  name: 'Article',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      id: null,
      article: [],
      comments: null,
      editor: null,
      like: 0
    };
  },
  
  created() {
    this.id = this.$route.params.id;
    this.getArticle();
    this.getComments();
    this.getLike();
  },
  
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
        ['bold', 'italic', 'underline'],
        [
        { list: 'ordered' },
        { list: 'bullet' },
        ],
        ['link'],
        ],
      },
      placeholder: "Contenu du commentaire",
      theme: 'snow',
      formats: ['bold', 'underline', 'header', 'italic', 'link'],
    });
    this.editor.root.innerHTML = this.modelValue;
  },
  
  methods: {
    getArticle() {
      UserService.getArticle(this.id)
      .then((response) => {
        this.article = response.data;
      });
    },
    getComments() {
      UserService.getComments(this.id)
      .then((response) => {
        this.comments = response.data;
      })
    },
    SaveComment() {
      var comment = {
        content: this.editor.root.innerHTML,
        creator: this.$store.state.auth.user.id,
      };
      UserService.postComment(comment, this.id)
      .then(function (response) {
        console.log(response);
        this.info = '<p>Commentaire publié</p>';
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getLike() {
      UserService.getLike(this.id)
      .then((response) => {
        this.like = response.data.like;
      })
    },
    Like() {
      if (this.like == 1) {
        var val = 0;
      } else {
        var val = 1;
      }
      UserService.putLike(this.$store.state.auth.user.i, this.id, {like: val})
      .then((response) => {
        this.like = response.data.like;
      })
    }
  },
}

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

.quillEditor {
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}

.comment-item {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.like {
  display: inline-block;
  vertical-align: middle;
  margin: 10px 0;
}
</style>
