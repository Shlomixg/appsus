import emailService from '../../services/email-service.js';

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
                                <input type="text" id="to" v-model="newEmail.to" disabled />
                                <input type="text" id="subject" v-model="newEmail.subject" placeholder="Subject" />
                                <textarea v-model="newEmail.body" placeholder="Content" />
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