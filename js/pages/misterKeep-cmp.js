import { getKeeps } from '../services/keep-service.js';
import KeepList from '../cmps/misterKeep/keep-list-cmp.js';

export default {
  name: 'mister-keep',
  template: `
        <section class="mister-keep">
          <div class="wrapper" v-if="keeps">
            <keep-list :keeps="keeps"></keep-list>    
          </div>
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
  components: {
    KeepList
  }
};
