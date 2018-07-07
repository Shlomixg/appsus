export default {
  name: 'keep-form',
  props: ['submit', 'value', 'isFormOpen'],
  model: {
    prop: 'value',
    event: 'change'
  },
  template: `
        <section class="keep-form" v-if="isFormOpen">

            <form  enctype="multipart/form-data" @submit.prevent="submit">
                <div class="input-container">  
                    <input type="url" :value="value" @change="$emit('change', $event.target.value)">
                    <input type="file" name="image"/>
                    <input name="img" id="imgData" type="hidden"/>
                </div>
                <button class="btn" type="submit">Update</button>
            </form>

        </section>
    `
};
