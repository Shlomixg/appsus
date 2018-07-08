export default {
  name: 'keep-form',
  props: ['submit', 'url'],
  template: `
        <section class="keep-form">

            <form ref="elForm" enctype="multipart/form-data" @submit.prevent="submit(newUrl)">
                <div class="input-container">  
                    <input type="url" v-model="newUrl">
                    <input type="file" name="image"/>
                    <input name="img" id="imgData" type="hidden"/>
                </div>
                <button class="btn" type="submit">Update</button>
            </form>

        </section>
    `,
  data() {
    return {
      newUrl: this.url
    };
  },
  beforeDestroy() {
    this.$refs.elForm.reset();
  }
};
