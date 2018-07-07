import KeepEdit from './keep-edit-cmp.js';

export default {
  name: 'keep-audio',
  props: ['data', 'id'],
  template: `
          <section class="keep-audio">
            <keep-edit :edit="editAudio" :deleteItem="deleteItem"></keep-edit>  
            <div class="item">
              <audio controls :src="audioUrl"></audio> 
            </div> 
             <div class="replace" v-if="isFormOpen">
              <form @submit.prevent="replaceAudio">
                <div class="input-container">  
                  <input type="url" v-model="newUrl">
                </div>
                <button class="btn" type="submit">Update</button>
              </form>
             </div>
          </section>
      `,

  data() {
    return {
      newUrl: this.data,
      isFormOpen: false
    };
  },

  methods: {
    editAudio() {
      this.isFormOpen = true;
    },
    replaceAudio() {
      this.isFormOpen = false;
      this.$emit('data-changed', { id: this.id, data: this.newUrl });
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    }
  },
  computed: {
    audioUrl() {
      return this.data;
    }
  },
  components: {
    KeepEdit
  }
};
