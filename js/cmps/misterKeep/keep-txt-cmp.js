export default {
  name: 'keep-txt',
  props: ['data', 'id'],
  template: `
        <section class="keep-txt">
           <div contenteditable="true" ref="elTxt" v-html="data" @blur="onTxtChange()">
           </div> 
        </section>
    `,
  methods: {
    onTxtChange(ev) {
      let newData = this.$refs.elTxt.innerHTML;

      console.log(newData);
      this.$emit('data-changed', { id: this.id, data: newData });
    }
  }
};
