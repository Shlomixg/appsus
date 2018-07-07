import emailPreview from './email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
        <ul class="clean-list email-list">
            <router-link tag="li" 
                            v-for="(email, idx) in emails"
                            :key="email.id"
                            :to="'/email/' + email.id"
                            @click="$emit('select-email', email)" >
                <email-preview :email="email" ></email-preview>
            </router-link>
        </ul>
    `,
  data() {
    return {};
  },
  methods: {}
};
