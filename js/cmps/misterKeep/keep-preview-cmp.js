import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';
import KeepAudio from './keep-audio-cmp.js';
import keepTodo from './keep-todo-cmp.js';

export default {
  name: 'keep-preview',
  props: ['keep'],
  template: `
            <section class="keep-preview">
                <h3>{{keep.title}}</h3>
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
    return {
      cmps: this.keep.cmps.slice(0, 2)
    };
  },
  components: {
    KeepImg,
    KeepTxt,
    KeepAudio,
    keepTodo
  }
};
