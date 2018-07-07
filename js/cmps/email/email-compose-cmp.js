import emailService from '../../services/email-service.js';

export default {
    props: [],
    template: `
        <section class="email-compose">
            <form>
                <label for="to">To</label>
                <input type="text" id="to" v-model="newEmail.to" disabled />
                <label for="subject">Subject:</label>
                <input type="text" id="subject" v-model="newEmail.subject" />
                <textarea id="body" v-model="newEmail.body" />
                <button class="btn" @click.prevent="sendEmail" >Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            newEmail: emailService.createEmail()
        }
    },
    methods: {
        sendEmail() {
            this.$emit('send-email', this.newEmail);
            this.newEmail = emailService.createEmail();
        }
    }
}