import { getKeeps } from '../services/keep-service.js';
import KeepImg from '../cmps/misterKeep/keep-img-cmp.js';
import KeepTxt from '../cmps/misterKeep/keep-txt-cmp.js';

export default {
  name: 'mister-keep',
  template: `
        <section class="mister-keep">
            <div class="wrapper" v-if="keeps">
              <div v-for="keep in keeps" :key="keep.id" class="keep-items">

                <component v-for="cmp in keep.cmps" :key="cmp.id" :is="cmp.type" :data="cmp.data"></component>
              
              </div>
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
    KeepImg,
    KeepTxt
  }
};
