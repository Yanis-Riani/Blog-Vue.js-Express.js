<template>
    <form @submit.prevent="submit">

    <input type="text" class="cat" id="cat" placeholder="Nom de la catégorie" />
    </form>
      <button class="PushButton" v-on:click="AddCat">
        Ajouter la catégorie
      </button>
  </template>
  
  <script>
  import Quill from 'quill';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.bubble.css';
  import 'quill/dist/quill.snow.css';
  import UserService from '../services/user.service';
  
  
  export default {
    data() {
      return {
      };
    },
    methods: {
      AddCat() {
        var cat = {'name': document.getElementById('cat').value};
          UserService.addCategory(cat)
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
  
  .cat {
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 16px;
    color: black;
  }
  
  
  </style>
  
  