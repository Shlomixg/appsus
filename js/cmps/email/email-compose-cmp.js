import emailService from '../../services/email-service.js';
import { eventBus, REPLY_EMAIL } from '../../services/event-bus-service.js';

export default {
    comopenets: {
    },
    props: ['showModal'],
    template: `
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <section class="modal-container email-compose ">
                        <div class="modal-header flex space-between align-items-center">
                            New Message
                            <i class="fas fa-times" @click="$emit('toggle-modal')" ></i>
                        </div>
                        <article class="modal-body">
                            <span class="flex column">
                                <input ref="to" type="text" id="to" v-model="newEmail.to" disabled />
                                <input ref="subject" type="text" id="subject" v-model="newEmail.subject" placeholder="Subject" />
                                <textarea ref="content" v-model="newEmail.body" placeholder="Content" />
                            </span>
                        </article>
                        <div class="modal-footer">
                            <button class="btn" @click="sendEmail">Send</button>
                        </div>
                    </section>
                </div>
            </div>
        </transition>
    `,
    data() {
        return {
            newEmail: emailService.createEmail(),
            subject: this.$refs.subject,
            content: this.$refs.content
        }
    },
    mounted() {
        eventBus.$on(REPLY_EMAIL, emailId => {
            this.setReplyValues(emailId);
        });
    },
    methods: {
        sendEmail() {
            this.$emit('send-email', this.newEmail);
            this.newEmail = emailService.createEmail();
        },
        setReplyValues(emailId) {
            var self = this;
            emailService.getEmailById(emailId)
                .then(email => {
                    self.newEmail.subject = `RE: ${email.subject}`;
                    self.newEmail.body = `Quote: "${email.body}" \n`;
                });
        }
    }

}