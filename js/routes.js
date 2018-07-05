import homePage from './pages/homepage-cmp.js';
import aboutPage from './pages/aboutpage-cmp.js';
import misterEmail from './pages/misterEmail-cmp.js';

import misterKeeper from './pages/misterKeep-cmp.js';
import keepDetails from './cmps/misterKeep/keep-details-cmp.js';

// import bookDetails from './pages/book-details-cmp.js';

export default [
  { path: '/', component: homePage },
  { path: '/about', component: aboutPage },
  { path: '/email', component: misterEmail },
  { path: '/keep', component: misterKeeper },
  { path: '/keep/:keepId', component: keepDetails },
  { path: '*', redirect: '/' }
];
