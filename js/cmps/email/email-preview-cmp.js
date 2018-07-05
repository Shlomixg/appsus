export default {
    props: ['email'],
    template: `
        <section class="email-preview" >
            <div>
                {{email.subject}}
                <p>{{email.body}}</p>
            </div>
        </section>`,
    data() {
        return {

        }
    },
    methods: {
    }
}