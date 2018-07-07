export default {
  template: `
        <section class="email-filter">
            <div>
                <input type="text" v-model="filterBy.txt" placeholder="Search" @input="filterEmails" />
                <input type="radio" id="all" value="" v-model="filterBy.emailStatus" @click="filterEmails">
                <label for="all">All</label>
                <input type="radio" id="read" value="read" v-model="filterBy.emailStatus" @click="filterEmails">
                <label for="read">Read</label>
                <input type="radio" id="unread" value="unread" v-model="filterBy.emailStatus" @click="filterEmails">
                <label for="unread">Unread</label>
            </div>
            <div>
                <label for="sort">Sort by:</label>
                <select id="sort"
                        v-model="filterBy.sortBy"
                        @change="filterEmails">
                    <option value="date" selected>Date</option>
                    <option value="subject">Subject</option>
                </select>
                <i :class="sorting"
				    @click="filterBy.sortIsAsc = !filterBy.sortIsAsc"></i>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                sortBy: 'date',
                sortIsAsc: true,
                txt: '',
                emailStatus: '',
                sortByDate: '',
                sortByTitle: '',
            }
        }
    },
    computed: {
        sorting() {
			return (this.filterBy.sortIsAsc) ? 'fas fa-sort-up' : 'fas fa-sort-down';
		}
    },
    methods: {
        filterEmails() {
            this.$emit('doFilter', this.filterBy);
        }
    }
  }
};
