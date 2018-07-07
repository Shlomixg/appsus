import emailService from '../services/email-service.js';
import { eventBus, DELETE_EMAIL } from '../services/event-bus-service.js';

import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailCompose from '../cmps/email/email-compose-cmp.js';
import emailFilter from '../cmps/email/email-filter-cmp.js';

export default {
    components: {
        emailList,
        emailDetails,
        emailStatus,
        emailCompose,
        emailFilter
    },
    template: `
        <section class="app-email container">
            <email-filter @doFilter="setFilter"></email-filter>
            <email-list :emails="emailsToShow" @select-email="selectEmail"></email-list>
            <email-details :selected-email="selectedEmail" @delete-email="deleteEmail" ></email-details>
            <email-status :emails="emailsToShow"></email-status>
            <email-compose @send-email="sendEmail" ></email-compose>
        </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null,
            filterBy: null
        }
    },
    created() {
        emailService.loadEmails()
            .then(emails => {
                this.emails = emails;
                if (this.emails) this.selectedEmail = this.emails[0];
                console.log(this.emails);
                
            });
    },
    mounted() {
        eventBus.$on(DELETE_EMAIL, emailId => {
            this.deleteEmail(emailId);
        })
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email;
        },
        deleteEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => {
                    this.selectedEmail = this.emails[0];
                    if (this.selectedEmail) this.$router.push(`/email/${this.selectedEmail.id}`);
                    else this.$router.push(`/email`);
                })
                .catch(err => console.error(err))
        },
        setFilter(filter) {
            this.filterBy = filter;
        },
        sendEmail(email) {
            emailService.sendEmail(email);
        }
    },
    watch: {
        '$route.params.emailId': function () {
            emailService.getEmailById(this.$route.params.emailId)
                .then(email => this.selectedEmail = email);
        }
    },
    computed: {
        emailsToShow() {
            console.log('toshow');
            
            if (!this.filterBy) return this.emails;
            let emailsFiltered;

            // Filtering
            if (this.filterBy.emailStatus !== '') {
                if (this.filterBy.emailStatus === 'read') {
                    emailsFiltered = this.emails.filter(email => email.isRead);
                } else {
                    emailsFiltered = this.emails.filter(email => !email.isRead);
                }
            } else emailsFiltered = this.emails;

            emailsFiltered = emailsFiltered.filter(email =>
                (email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase()) ||
                    email.body.toLowerCase().includes(this.filterBy.txt.toLowerCase()) ||
                    email.senderName.toLowerCase().includes(this.filterBy.txt.toLowerCase()) ||
                    email.senderMail.toLowerCase().includes(this.filterBy.txt.toLowerCase()))
            )

            // Sorting
            switch (this.filterBy.sortBy) {
                case 'date':
                    emailsFiltered = emailsFiltered.sort((a, b) => {
                        return a.sentAt - b.sentAt;
                    });
                    break;
                case 'subject':
                    emailsFiltered = emailsFiltered.sort((a, b) => {
                        if (a.subject < b.subject) return -1;
                        if (a.subject > b.subject) return 1;
                        return 0;
                    });
                    break;
            }

            if (this.filterBy.sortIsAsc) emailsFiltered.reverse();
            return emailsFiltered;
        }
    },
}