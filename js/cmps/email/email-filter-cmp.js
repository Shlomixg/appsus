export default {
    props: ['unread-count', 'emails-count'],
    template: `
        <section class="email-filter">
            <div class="filter-controls flex space-between align-items-center">
                <span class="search-wrapper">
                    <input type="text" class="searchEmails" v-model="filterBy.txt" placeholder="Search" @input="filterEmails" />
                </span>
                <span class="radio-group">
                    <input type="radio" id="all" value="" v-model="filterBy.emailStatus" @click="filterEmails">
                    <label for="all">
                        <i class="fas fa-home" title="All Emails"></i>
                    </label>

                    <input type="radio" id="read" value="read" v-model="filterBy.emailStatus" @click="filterEmails">
                    <label for="read">
                        <i class="far fa-envelope-open" title="Read Emails"></i>
                    </label>

                    <input type="radio" id="unread" value="unread" v-model="filterBy.emailStatus" @click="filterEmails">
                    <label for="unread">
                        <i class="far fa-envelope" title="Unread Emails"></i>
                    </label>  
                </span>
            </div>
            <div class="filter-controls flex space-between align-items-center">
                <span>
                    Unread: {{unreadCount}} / {{emailsCount}}
                </span>
                <span>
                    <select id="sort"
                            v-model="filterBy.sortBy"
                            @change="filterEmails">
                        <option value="" disabled selected>Sort By</option>
                        <option value="date" selected>Date</option>
                        <option value="subject">Subject</option>
                    </select>
                    <i :class="sorting"
                        :title="sortingTitle"
                        @click="changeSortOrder"></i>
                </span>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                sortBy: '',
                sortIsAsc: false,
                txt: '',
                emailStatus: '',
            }
        }
    },
    computed: {
        sorting() {
            return (this.filterBy.sortIsAsc) ? 'fas fa-caret-up' : 'fas fa-caret-down';
        },
        sortingTitle() {
            return (this.filterBy.sortIsAsc) ? 'Ascending' : 'Descending';
        }
    },
    methods: {
        filterEmails() {
            this.$emit('doFilter', this.filterBy);
        },
        changeSortOrder() {
            if (!this.filterBy.sortBy) return;
            this.filterBy.sortIsAsc = !this.filterBy.sortIsAsc;
            this.filterEmails();
        }
    }
};
