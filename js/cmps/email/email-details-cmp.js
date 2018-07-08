export default {
    props: ['selected-email'],
    template: `
        <section class="email-details" v-if="selectedEmail">
            <section class="email-controls flex align-items-center space-around">
                <i class="fas fa-arrow-left" @click="returnToList"></i>
                <i class="far fa-trash-alt" title="Delete Email" @click="$emit('delete-email', selectedEmail.id)"></i>
                <i :class="marking" :title="markingTitle" @click="markEmail"></i>
                <i class="fas fa-reply" @click="replay"></i>
            </section>
            <section class="email-header flex column">
                <h1 class="email-subject">{{selectedEmail.subject}}</h1>
                <div class="email-data flex space-between">
                    <span class="email-sender flex column">
                        <span>
                            <span >
                                <span class="light-weight">From:</span>
                                <span class="email-sender-name">{{selectedEmail.senderName}}</span>
                            </span>
                            <span class="email-sender-mail"><{{selectedEmail.senderMail}}></span>
                        </span>
                        <span class="email-addressee">To: {{selectedEmail.to}}</span>
                        </span>
                    </span>
                    <span class="email-date">
                        {{sentTime}}
                    </span>
                </div>
            </section>
            <article class="email-body">
                <p>{{selectedEmail.body}}</p>
            </article>
            
        </section>
    `,
    data() {
        return {

        }
    },
    computed: {
        sentTime() {
            return moment(this.selectedEmail.sentAt).format('DD/MM/YYYY, HH:mm:ss')
        },
        marking() {
            if (this.selectedEmail.isRead) return 'far fa-envelope';
            else return 'far fa-envelope-open';
        },
        markingTitle() {
            if (this.selectedEmail.isRead) return 'Mark as unread';
            else return 'Mark as read';
        }
    },
    methods: {
        markEmail() {
            this.selectedEmail.isRead = !this.selectedEmail.isRead;
        },
        replay() {
            console.log('Bonus - later');
        },
        returnToList() {
            this.$router.push(`/email`);
            this.$emit('return');
        }
    }
}
