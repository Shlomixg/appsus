import emailPreview from './email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails">
                    <email-preview :email="email" @click="test"></email-preview>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        test() {
            console.log('email');
        }
    }
}