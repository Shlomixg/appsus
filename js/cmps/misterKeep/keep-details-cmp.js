import { getKeepById, saveKeep } from '../../services/keep-service.js';
import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';
import KeepAudio from './keep-audio-cmp.js';
import keepTodo from './keep-todo-cmp.js';

export default {
  name: 'keep-details',
  template: `
        <section class="keep-details" v-if="keep">
            <div class="header">
                <h3 contenteditable="true" ref="elTitle" v-html="keep.title" @blur="onTitleChange()"></h3>
                <a class="btn btn-close" @click="$router.push({ path: '/keep' })">Close</a> 
            </div>
            
            <article class="cmps-wrapper" >
                
                <component class="keep-cmp" 
                  v-for="cmp in keep.cmps"
                  :key="cmp.id"
                  :is="cmp.type"
                  :data="cmp.data"
                  :id="cmp.id"
                  @data-changed="onDataChange" ></component>
                
            </article>    
            
            <div class="keep-controls flex align-items-center space-around">
                <i class="far fa-image" title="New Image Item"></i>
                <i class="far fa-map" title="New Map item"></i>
                <i class="fas fa-microphone" title="New Audio item"></i>
                <i class="far fa-list-alt" title="New Todo list"></i>
                <i class="far fa-file-alt" title="New Text item"></i>
                <i class="far fa-trash-alt" title="Delete Keep"></i>
                <i class="fas fa-thumbtack" title="Pin Keep"></i>
                <i class="fas fa-palette" title="Change Background"></i>
            </div>
        </section>
    `,
  data() {
    return {
      keep: null
    };
  },
  methods: {
    onDataChange(newData) {
      // find cmp by id
      let cmp = this.keep.cmps.find(({ id }) => id === newData.id);
      // update data
      cmp.data = newData.data;
      // save
      saveKeep(this.keep, this.keep.id);
    },
    onTitleChange() {
      this.keep.title = this.$refs.elTitle.innerText;
      saveKeep(this.keep, this.keep.id);
    }
  },
  created() {
    getKeepById(this.$route.params.keepId).then(keep => {
      this.keep = keep;
    });
  },
  components: {
    KeepImg,
    KeepTxt,
    KeepAudio,
    keepTodo
  }
};
