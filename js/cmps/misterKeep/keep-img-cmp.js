export default {
  name: 'keep-img',
  props: ['data', 'id'],
  template: `
          <section class="keep-img">
            <div class="btn btn-edit" @click="editImg"> 
              <i class="fas fa-pencil-alt"></i>
            </div>
             <img :src="url">
             
             <div class="replace" v-if="isFormOpen">
              <form  enctype="multipart/form-data" @submit.prevent="replaceImg">
                <div class="input-container">  
                  <input type="url" v-model="newUrl">
                  <input type="file" name="image"/>
                  <input name="img" id="imgData" type="hidden"/>
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
    editImg() {
      this.isFormOpen = true;
    },
    replaceImg() {
      this.url = this.newUrl;
      this.isFormOpen = false;
    }
  }
};
