import KeepEdit from './keep-edit-cmp.js';
import KeepForm from './keep-form-cmp.js';

export default {
  name: 'keep-audio',
  props: ['data', 'id', 'preview'],
  template: `
          <section class="keep-audio">
            <keep-edit v-if="!preview" :edit="editAudio" :deleteItem="deleteItem"></keep-edit>  
            <div class="item">
              <audio controls :src="audioUrl" v-if="audioUrl"></audio> 
            </div> 
              <keep-form 
                  v-if="isFormOpen"
                  :submit="replaceAudio"
                  :url="audioUrl">
              </keep-form>
           </div>
          </section>
      `,

  data() {
    return {
      audioUrl: this.data,
      isFormOpen: !this.data && !this.preview
    };
  },

  methods: {
    editAudio() {
      this.isFormOpen = !this.isFormOpen;
    },
    replaceAudio(newUrl) {
      this.isFormOpen = false;
      this.$emit('data-changed', { id: this.id, data: newUrl });
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    }
  },
  components: {
    KeepEdit,
    KeepForm
  }
};
