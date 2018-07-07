import KeepEdit from './keep-edit-cmp.js';

export default {
  name: 'keep-txt',
  props: ['data', 'id'],
  template: `
        <section class="keep-txt">
          <keep-edit :deleteItem="deleteItem"></keep-edit>  
           <div contenteditable="true"
                class="item"
                ref="elTxt"
                v-html="data"
                @blur="onTxtChange()">
           </div> 
        </section>
    `,
  methods: {
    onTxtChange(ev) {
      let newData = this.$refs.elTxt.innerHTML;

      console.log(newData);
      this.$emit('data-changed', { id: this.id, data: newData });
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    }
  },
  components: {
    KeepEdit
  }
};
