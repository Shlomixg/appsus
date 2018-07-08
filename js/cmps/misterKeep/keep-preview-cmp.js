import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';
import KeepAudio from './keep-audio-cmp.js';
import keepTodo from './keep-todo-cmp.js';
import { saveKeep } from '../../services/keep-service.js';
import eventBus, { DELETE_KEEP } from '../../services/event-bus-service.js';

export default {
  name: 'keep-preview',
  props: ['keep'],
  template: `
            <section class="keep-preview" :class="keep.backgroundColor">
                <div class="header"> 
                  <h3>{{keep.title}}</h3>
                  <div>
                    <i class="far fa-trash-alt" title="Delete Keep" @click.stop="deleteKeep"></i>
                    <i class="fas fa-thumbtack" title="Pin Keep" @click.stop="togglePin" :class="{pinned: keep.isPinned}"></i>
                  </div>
                </div>
                <component class="keep-cmp" 
                    v-for="cmp in cmps"
                    :key="cmp.id"
                    :is="cmp.type"
                    :data="cmp.data"
                    :id="cmp.id"
                    :preview="true"
                ></component>
            </section>
        `,
  data() {
    let cmps = this.keep.cmps.filter(cmp => cmp.type !== 'keep-audio');
    cmps = cmps.slice(0, 2);
    return {
      cmps
    };
  },
  methods: {
    deleteKeep() {
      eventBus.$emit(DELETE_KEEP, this.keep.id);
    },
    togglePin() {
      this.keep.isPinned = !this.keep.isPinned;
      saveKeep(this.keep, this.keep.id);
    }
  },
  components: {
    KeepImg,
    KeepTxt,
    KeepAudio,
    keepTodo
  }
};
