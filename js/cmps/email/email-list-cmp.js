import emailPreview from './email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="clean-list">
                <router-link tag="li" 
                             v-for="(email, idx) in emails"
                             :key="email.id"
                             :to="'/email/' + email.id"
                             @click="$emit('select-email', email)" >
                    <email-preview :email="email" ></email-preview>
                </router-link>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        
    }
}