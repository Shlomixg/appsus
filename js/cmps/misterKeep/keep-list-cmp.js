import KeepPreview from './keep-preview-cmp.js';
import KeepDetails from './keep-details-cmp.js';

export default {
  name: 'keep-list',
  props: ['keeps', 'isGrid'],
  template: `
          <section class="keep-list">
          <masonry :cols="cols" :gutter="30">
              <keep-preview 
                  v-for="keep in keeps"
                  :key="keep.id" 
                  :keep="keep"
                  @click.native="onKeepSelect(keep.id)"></keep-preview>
                  </masonry>
          </section>
      `,
  methods: {
    onKeepSelect(keepId) {
      this.$router.push(`/keep/${keepId}/details`);
    }
  },
  computed: {
    cols() {
      let width = window.innerWidth;
      if (this.isGrid) return 3;
      else return 1;
    }
  },
  components: {
    KeepPreview,
    KeepDetails
  }
};
