import { eventBus, DELETE_EMAIL } from '../../services/event-bus-service.js';

export default {
  props: ['email'],
  template: `
        <section class="email-preview" >
            <div>
                <button class="btn" @click.stop="deleteEmail" >Delete</button>
                ID: {{email.id}}
                <h3>{{email.subject}}</h3>
                <p>{{email.body}}</p>
            </div>
        </section>`,
  data() {
    return {};
  },
  methods: {
    deleteEmail() {
      eventBus.$emit(DELETE_EMAIL, this.email.id);
    }
  }
};
