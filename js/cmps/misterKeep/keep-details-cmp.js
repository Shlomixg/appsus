import { getKeepById, saveKeep } from '../../services/keep-service.js';
import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';
import KeepAudio from './keep-audio-cmp.js';

export default {
  name: 'keep-details',
  template: `
        <section class="keep-details" v-if="keep">
            <div class="header">
                <h3>{{keep.title}}</h3>
                <a class="btn btn-close" @click="$router.push({ path: '/keep' })">Close</a> 
            </div>
            
            <article class="cmps-wrapper" >
                
                <component class="keep-cmp" 
                  v-for="cmp in cmps"
                  :key="cmp.id"
                  :is="cmp.type"
                  :data="cmp.data",
                  :id="cmp.id"></component>
                
            </article>    
            
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
      keep: null,
      cmps: null
    };
  },
  created() {
    getKeepById(this.$route.params.keepId).then(keep => {
      this.keep = keep;
      this.cmps = keep.cmps;
    });
  },
  components: {
    KeepImg,
    KeepTxt,
    KeepAudio
  }
};
