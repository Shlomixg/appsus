export default {
    props: ['selected-email'],
    template: `
        <section class="email-details" v-if="selectedEmail">
            <button class="btn" @click="$emit('delete-email', selectedEmail.id)">Delete</button>
            <h1>
                subject: {{selectedEmail.subject}}
            </h1>
        </section>`,
    data() {
        return {

        }
    },
    created() {
        console.log(this.selectedEmail);
    },
}