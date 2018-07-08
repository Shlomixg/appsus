import KeepEdit from './keep-edit-cmp.js';
import KeepForm from './keep-form-cmp.js';

export default {
  name: 'keep-img',
  props: ['data', 'id', 'preview'],
  template: `
          <section class="keep-img">
            <keep-edit v-if="!preview" :edit="editImg" :deleteItem="deleteItem"></keep-edit>  
              <div class="item"> 
                <img :src="imgUrl">
             </div>
             <keep-form 
                v-if="isFormOpen"
                :submit="replaceImg"
                :url="imgUrl"
                ></keep-form>
          </section>
      `,

  data() {
    return {
      imgUrl: this.data,
      isFormOpen: !this.data && !this.preview
    };
  },

  methods: {
    valueChanged() {
      console.log(arguments);
    },
    editImg() {
      this.isFormOpen = !this.isFormOpen;
    },
    replaceImg(newUrl) {
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
