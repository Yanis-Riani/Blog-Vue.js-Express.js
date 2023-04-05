import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '');
  }

  getAdminBoard() {
    return axios.get(API_URL + 'user/', { headers: authHeader() });
  }

  getArticle(id) { //id = id de l'article
    return axios.get(API_URL + 'article/' + id, { headers: authHeader() });
  }

  getArticles(id = null) { //id = id de la catégorie
    if (!id) {
      return axios.get(API_URL + 'article/', { headers: authHeader() });
    }
    return axios.get(API_URL + 'article/category/' + id, { headers: authHeader() });
  }

  getCategories() {
    return axios.get(API_URL + 'category/', { headers: authHeader() });
  }

  addCategory(category) {
    return axios.post(API_URL + 'category/', category, { headers: authHeader() });
  }

  postArticle(article) {
    return axios.post(API_URL + 'article/', article, { headers: authHeader() });
  }

  getFav(idU) {
    return axios.get(API_URL + 'user/fav/' + idU, { headers: authHeader() });
  }

  putFav(idU, idP, fav) {
    return axios.put(API_URL + 'likeFav/' + idU + '/' + idP, fav, { headers: authHeader() });
  }

  getLike(idP) {
    return axios.get(API_URL + 'article/like/' + idP, { headers: authHeader() });
  }

  putlike(idU, idP, like) {
    return axios.put(API_URL + 'likeFav/' + idU + '/' + idP, like, { headers: authHeader() });
  }

  getComments(id) {
    return axios.get(API_URL + 'article/comments/' + id, { headers: authHeader() });
  }

  postComment(comment, id) {
    return axios.post(API_URL + 'comment/' + id, comment, { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(API_URL + 'user/' + id, { headers: authHeader() });
  }
}

export default new UserService();
