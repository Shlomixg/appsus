export default {
  name: 'keep-audio',
  props: ['data', 'id'],
  template: `
          <section class="keep-audio">
            <div class="btn btn-edit" @click="editAudio"> 
              <i class="fas fa-pencil-alt"></i>
            </div>
            <audio controls :src="audioUrl"></audio> 
             
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
    }
  },
  computed: {
    audioUrl() {
      return this.data;
    }
  }
};
