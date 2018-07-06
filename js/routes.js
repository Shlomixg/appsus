import homePage from './pages/homepage-cmp.js';
import aboutPage from './pages/aboutpage-cmp.js';
import misterEmail from './pages/misterEmail-cmp.js';
import misterKeeper from './pages/misterKeep-cmp.js';
import emailDetails from './cmps/email/email-details-cmp.js';

export default [
  { path: '/', component: homePage },
  { path: '/about', component: aboutPage },
  { path: '/keep', component: misterKeeper },
  { path: '/email/:emailId?', component: misterEmail },
  { path: '*', redirect: '/' }
]