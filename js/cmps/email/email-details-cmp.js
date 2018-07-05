export default {
    props: ['selected-email'],
    template: `
        <section class="email-details" v-if="selectedEmail">
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