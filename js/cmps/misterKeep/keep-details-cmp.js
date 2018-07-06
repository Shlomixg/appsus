import { getKeepById } from '../../services/keep-service.js';
import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';

export default {
  name: 'keep-details',
  template: `
        <section class="keep-details">
            Details 
            <div class="wrapper" v-if="keep">
                
                <component v-for="cmp in keep.cmps" :key="cmp.id" :is="cmp.type" :data="cmp.data"></component>
                
            </div>    
            
            <div class="keep-controls flex align-items-center space-around">
                <i class="far fa-image "></i>
                <i class="far fa-map "></i>
                <i class="fas fa-microphone "></i>
                <i class="far fa-trash-alt "></i>
                <i class="fas fa-thumbtack "></i>
                <i class="fas fa-palette "></i>
            </div>
        </section>
    `,
  data() {
    return {
      keep: null
    };
  },
  created() {
    getKeepById(this.$route.params.keepId).then(keep => {
      this.keep = keep;
    });
  },
  components: {
    KeepImg,
    KeepTxt
  }
};
