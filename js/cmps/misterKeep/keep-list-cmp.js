import KeepPreview from './keep-preview-cmp.js';
import KeepDetails from './keep-details-cmp.js';

export default {
  name: 'keep-list',
  props: ['keeps', 'isGrid'],
  template: `
          <section class="keep-list">
          <masonry :cols="cols" :gutter="30">
              <keep-preview 
                  v-for="keep in keepsToShow"
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
    keepsToShow() {
      return this.keeps.sort(keep1 => {
        return !keep1.isPinned;
      });
    },
    cols() {
      if (this.isGrid) return 3;
      else return 1;
    }
  },
  components: {
    KeepPreview,
    KeepDetails
  }
};
