export default {
  template: `
        <section class="email-filter">
            <input type="text" v-model="filterBy.txt" placeholder="Search" @keydown="filterEmails" />
        </section>
    `,
  data() {
    return {
      filterBy: {
        txt: '',
        emailStatus: '',
        sortByDate: '',
        sortByTitle: ''
      }
    };
  },
  methods: {
    filterEmails() {
      this.$emit('doFilter', this.filterBy);
    }
  }
};
