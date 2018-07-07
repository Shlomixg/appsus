export default {
  name: 'keep-todo',
  props: ['data', 'id'],
  template: `
        <section class="keep-todo">
            <ul class="todo-list">
                <li v-for="todo in data" :key="todo.id" class="todo-item">
                    
                    <span class="txt">    
                        <i class="far" 
                            :class="todo.isDone ? 'fa-check-circle' : 'fa-circle'"
                            @click="toggleComplete(todo.id)"></i>    
                        {{todo.txt}}
                    </span>
                    <i class="far fa-trash-alt" @click="deleteTodo(todo.id)"></i>
                </li>                
            </ul>

        </section>
    `,
  methods: {
    toggleComplete(todoId) {
      let todos = JSON.parse(JSON.stringify(this.data));

      let todo = todos.find(todo => todo.id === todoId);
      todo.isDone = !todo.isDone;
      this.$emit('data-changed', { id: this.id, data: todos });
    },
    deleteTodo(todoId) {
      let todos = JSON.parse(JSON.stringify(this.data));
      let idx = todos.findIndex(todo => todo.id === todoId);
      todos.splice(idx, 1);
      this.$emit('data-changed', { id: this.id, data: todos });
    }
  }
};
