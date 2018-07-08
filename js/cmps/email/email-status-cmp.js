import bProggress from '../../../lib/bootstrap-vue/src/components/progress/progress.js';

Vue.component('b-progress', bProggress);

export default {
    components: {
        bProggress
    },
    props: ['emails'],
    template: `
        <section class="email-status" v-show="counter || max">
            <b-progress :value="counter" :max="emailsCount" show-progress animated></b-progress>
        </section>`,
    computed: {
        counter() {
            if (!this.emails) return;
            let counter = 0;
            this.emails.forEach(email => {
                if (email.isRead) counter++;
            });
            return counter;
        },
        emailsCount() {
            if (!this.emails) return;        
            return this.emails.length;
        }
    }
}