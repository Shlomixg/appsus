import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';

export default {
  name: 'keep-list',
  props: ['keeps'],
  template: `
          <section class="keep-list">
              <div v-for="keep in keeps"
                   :key="keep.id"
                   class="keep-items">

                <component v-for="cmp in keep.cmps" :key="cmp.id" :is="cmp.type" :data="cmp.data"></component>
              
              </div>
          </section>
      `,

  components: {
    KeepImg,
    KeepTxt
  }
};
