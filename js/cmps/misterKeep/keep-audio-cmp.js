export default {
  name: 'keep-audio',
  props: ['data'],
  template: `
          <section class="keep-audio">
            <div class="btn btn-edit" @click="editAudio"> 
              <i class="fas fa-pencil-alt"></i>
            </div>
            <audio controls ref="elAudio">
                <source type="audio/mpeg" :src="url"/>
            </audio> 
             
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
      url: this.data,
      newUrl: this.data,
      isFormOpen: false
    };
  },

  methods: {
    editAudio() {
      this.isFormOpen = true;
    },
    replaceAudio() {
      this.url = this.newUrl;
      this.$refs.elAudio.load();
      console.log('this.$refs: ', this.$refs);
      this.isFormOpen = false;
    }
  }
};
