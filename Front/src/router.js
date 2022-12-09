import { createWebHistory, createRouter } from 'vue-router';
import Articles from './components/Articles.vue';
import NewArticle from './components/ArticleCreation.vue';
import NewCategory from './components/AddCategory.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
// lazy-loaded
const Profile = () => import('./components/Profile.vue');
const BoardAdmin = () => import('./components/BoardAdmin.vue');

const routes = [
  {
    path: '/',
    name: 'Articles',
    component: Articles,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/new',
    component: NewArticle,
  },
  {
    path: '/newCat',
    component: NewCategory,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/admin',
    name: 'admin',
    component: BoardAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
