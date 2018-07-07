export default {
  name: 'keep-edit',
  props: ['edit', 'deleteItem'],
  template: `
        <section class="keep-edit">
            <i class="fas fa-pencil-alt" v-if="edit" @click="edit"></i>
            <i class="far fa-trash-alt" @click="deleteItem"></i>
        </section>
    `
};
