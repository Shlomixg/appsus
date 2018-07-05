import emailList from '../cmps/email/email-list-cmp.js';
import emaiiPreview from '../cmps/email/email-preview-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailCompose from '../cmps/email/email-compose-cmp.js';

export default  {
    components: {
        emailList,
        emaiiPreview,
        emailDetails,
        emailStatus,
        emailCompose,
    },
    template: `
        <section class="app-email container">
            <email-filter></email-filter>
            <email-list></email-list>
            <email-details></email-details>
            <email-status></email-status>
            <email-compose></email-compose>
        </section>
    `,
    data() {
        return {

        }
    }
}