import KeepPreview from './keep-preview-cmp.js';
export default {
  name: 'keep-list',
  props: ['keeps'],
  template: `
          <section class="keep-list">
              <keep-preview 
                  v-for="keep in keeps"
                  :key="keep.id" 
                  :keep="keep"
                  @click.native="onKeepSelect(kepp.id)"></keep-preview>
          </section>
      `,
  methods: {
    onKeepSelect(keepId) {
      this.$router.push(`/keep/${keepId}`);
    }
  },
  components: {
    KeepPreview
  }
};
