import { getKeeps, newKeep } from '../services/keep-service.js';
import KeepList from '../cmps/misterKeep/keep-list-cmp.js';

export default {
  name: 'mister-keep',
  template: `
        <section class="mister-keep container">
          <div class="wrapper" v-if="keeps">
            <keep-list :keeps="keeps"></keep-list>    
          </div>
          <router-view :key="$route.fullPath"></router-view>
          <button class="btn" @click="addNewKeep">New Keep</button>
        </section>
    `,
  data() {
    return {
      keeps: null
    };
  },
  created() {
    getKeeps().then(keeps => {
      this.keeps = keeps;
    });
  },
  methods: {
    addNewKeep() {
      newKeep().then(keepId => {
        this.$router.push({ path: `/keep/${keepId}` });
      });
    }
  },
  components: {
    KeepList
  }
};
