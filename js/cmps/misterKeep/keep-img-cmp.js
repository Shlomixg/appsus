import KeepEdit from './keep-edit-cmp.js';

export default {
  name: 'keep-img',
  props: ['data', 'id'],
  template: `
          <section class="keep-img">
            <keep-edit :edit="editImg" :deleteItem="deleteItem"></keep-edit>  
              <div class="item"> 
                <img :src="imgUrl">
             </div>
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
      newUrl: this.data,
      isFormOpen: false
    };
  },

  methods: {
    editImg() {
      this.isFormOpen = true;
    },
    replaceImg() {
      this.isFormOpen = false;
      this.$emit('data-changed', { id: this.id, data: this.newUrl });
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    }
  },
  computed: {
    imgUrl() {
      return this.data;
    }
  },
  components: {
    KeepEdit
  }
};
