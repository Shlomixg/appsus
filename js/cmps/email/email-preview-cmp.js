import { eventBus, DELETE_EMAIL } from '../../services/event-bus-service.js';

export default {
    props: ['email'],
    template: `
        <section :class="tobold" 
                class="email-preview flex align-items-center" 
                @mouseover="showControls = true" 
                @mouseleave="showControls = false">
            <span class="email-sender">{{email.senderName}}</span>
            <span class="email-content">
                {{email.subject}}<span class="email-body"> - {{email.body}}</span>
            </span>
            <span v-show="!showControls">{{sentTime}}</span>
            <span v-show="showControls" class="email-preview-controls flex align-items-center">
                <i class="far fa-trash-alt" title="Delete Email" @click.stop.prevent="deleteEmail"></i>
                <i :class="marking" :title="markingTitle" @click.stop="markEmail"></i>
                <i class="fas fa-reply" title="Replay" @click.stop="replay"></i>
            </span>
        </section>
    `,
    data() {
        return {
            showControls: false
        }
    },
    computed: {
        sentTime() {
            return moment(this.email.sentAt).format('DD/MM/YYYY')
        },
        marking() {
            if (this.email.isRead) return 'far fa-envelope';
            else return 'far fa-envelope-open';
        },
        markingTitle() {
            if (this.email.isRead) return 'Mark as unread';
            else return 'Mark as read';
        },
        tobold() {
            if (!this.email.isRead) return 'bold-weight';
            else return 'light-weight';
        }
    },
    methods: {
        deleteEmail() {
            eventBus.$emit(DELETE_EMAIL, this.email.id);
        },
        markEmail() {
            this.email.isRead = !this.email.isRead;
        },
        replay() {
            console.log('Bonus - later');
        }
    }
};
