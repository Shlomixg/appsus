import emailService from '../services/email-service.js';

import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailCompose from '../cmps/email/email-compose-cmp.js';
import emailFilter from '../cmps/email/email-filter-cmp.js';

export default  {
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
            <email-details></email-details>
            <email-status></email-status>
            <email-compose></email-compose>
        </section>
    `,
    data() {
        return {
            emails: null,
        }
    },
    created() {
        emailService.createEmails()
            .then(emails => this.emails = emails);
    },
    methods: {
        selectEmail(email) {
            console.log('email', email);
        }
    }
}