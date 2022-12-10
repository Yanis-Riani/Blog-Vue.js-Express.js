import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getAdminBoard() {
    return axios.get(API_URL + 'user/all', { headers: authHeader() });
  }

  getArticles(id = null) {
    if (!id) {
      return axios.get(API_URL + 'article/all', { headers: authHeader() });
    }
    console.log('id', id);
    return axios.get(API_URL + 'article/category/' + id, { headers: authHeader() });
  }

  getCategories() {
    return axios.get(API_URL + 'category/all', { headers: authHeader() });
  }

  addCategory(category) {
    return axios.post(API_URL + 'category/add', category, { headers: authHeader() });
  }

  postArticle(article) {
    return axios.post(API_URL + 'article/add', article, { headers: authHeader() });
  }

  getFav(idU) {
    return axios.get(API_URL + 'user/fav/' + idU, { headers: authHeader() });
  }

  putFav(idU, idP, fav) {
    return axios.put(API_URL + 'likeFav/' + idU + '/' + idP, fav, { headers: authHeader() });
  }
}

export default new UserService();
