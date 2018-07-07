export default {
    props: ['selected-email'],
    template: `
        <section class="email-details" v-if="selectedEmail">
            <button class="btn" @click="$emit('delete-email', selectedEmail.id)">Delete</button>
            <h1>
                subject: {{selectedEmail.subject}}
            </h1>
            <h4>Time: {{sentTime}}</h4>
            <p>{{selectedEmail.body}}</p>
        </section>`,
    data() {
        return {

        }
    },
    computed: {
        sentTime() {
            return moment(this.selectedEmail.sentAt).format('HH:mm:ss, DD/MM/YYYY')
        }
    },
    created() {
        console.log(this.selectedEmail);
    },
}