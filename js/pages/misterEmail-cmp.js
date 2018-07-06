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
            <email-filter></email-filter>
            <email-list :emails="emails" @select-email="selectEmail"></email-list>
            <email-details :selected-email="selectedEmail" @delete-email="deleteEmail" ></email-details>
            <email-status></email-status>
            <email-compose></email-compose>
        </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null
        }
    },
    created() {
        emailService.createEmails()
            .then(emails => {
                this.emails = emails;
                if (this.emails) this.selectedEmail = this.emails[0];
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
    },
    watch: {
        '$route.params.emailId': function () {
            emailService.getEmailById(this.$route.params.emailId)
                .then(email => this.selectedEmail = email);
        }
    }
}