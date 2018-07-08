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
        emailFilter,
    },
    template: `
        <section class="email-app container" >
            
            <section class="email-list-wrapper" v-if="!selectedEmail">
                <button class="btn btn-email-compose" @click="showModal = true">
                    <i class="fas fa-plus"></i>
                </button>
                <email-filter @doFilter="setFilter"
                                :unread-count="unreadCount"
                                :emails-count="emailsCount">
                </email-filter>
                <email-list :emails="emailsToShow" @select-email="selectEmail"></email-list>
                <email-status :emails="emailsToShow"></email-status>
            </section>

            <email-details v-if="selectedEmail" 
                            :selected-email="selectedEmail"
                            :mark-read="selectedEmail.isRead = true"
                            @delete-email="deleteEmail"
                            @return="deselectEmail" >
            </email-details>
            
            <email-compose v-if="showModal" 
                            :showModal="showModal"
                            @toggle-modal="toggleModal"  
                            @send-email="sendEmail" >
            </email-compose>

        </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null,
            filterBy: null,
            showModal: false,
            newEmail: emailService.createEmail()
        }
    },
    created() {
        emailService.loadEmails()
            .then(emails => {
                this.emails = emails;
                console.log('load emails:', this.emails);
            });
    },
    mounted() {
        eventBus.$on(DELETE_EMAIL, emailId => {
            this.deleteEmail(emailId);
        })
    },
    destroyed() {
        eventBus.$off(DELETE_EMAIL);
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email;
        },
        deselectEmail() {
            this.selectedEmail = null;
        },
        deleteEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => {
                    this.$router.push(`/email`);
                })
                .catch(err => console.error(err))
        },
        setFilter(filter) {
            this.filterBy = filter;
        },
        sendEmail(email) {
            this.toggleModal();
            emailService.sendEmail(email)
        },
        toggleModal() {
            this.showModal = !this.showModal;
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
            if (!this.filterBy) return this.emails;
            console.log('Emails To Show');
            
            // Filtering
            var emailsFiltered = emailService.filterEmails(this.emails, emailsFiltered, this.filterBy);            
            // Sorting
            emailService.sortEmails(emailsFiltered, this.filterBy);
            
            return emailsFiltered;
        },
        emailsCount() {
            if (!this.emailsToShow) return 0;
            return this.emailsToShow.length;        
        },
        unreadCount() {
            if (!this.emailsToShow) return 0;
            let counter = 0;
            this.emailsToShow.forEach(email => {
                if (!email.isRead) counter++;
            });
            return counter;
        },
    },
}