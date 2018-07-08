import KeepPreview from './keep-preview-cmp.js';
import KeepDetails from './keep-details-cmp.js';

export default {
  name: 'keep-list',
  props: ['keeps'],
  template: `
          <section class="keep-list">
              <keep-preview 
                  v-for="keep in keeps"
                  :key="keep.id" 
                  :keep="keep"
                  @click.native="onKeepSelect(keep.id)"></keep-preview>
          </section>
      `,
  methods: {
    onKeepSelect(keepId) {
      this.$router.push(`/keep/${keepId}/details`);
    }
  },
  components: {
    KeepPreview,
    KeepDetails
  }
};
