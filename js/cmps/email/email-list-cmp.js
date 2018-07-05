import emailPreview from './email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails" @click="selectEmail(email)">
                    <email-preview :email="email" ></email-preview>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        selectEmail(email) {
            this.$emit('select-email', email);
        }
    }
}