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
                :submit="replaceImg"
                v-model="newUrl"
                :isFormOpen="isFormOpen"></keep-form>
          </section>
      `,

  data() {
    return {
      newUrl: this.data,
      isFormOpen: false
    };
  },

  methods: {
    valueChanged() {
      console.log(arguments);
    },
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
    KeepEdit,
    KeepForm
  }
};
