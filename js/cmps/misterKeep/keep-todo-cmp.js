import { makeId } from '../../services/utils-service.js';
import KeepEdit from './keep-edit-cmp.js';

export default {
  name: 'keep-todo',
  props: ['data', 'id', 'preview'],
  template: `
        <section class="keep-todo">
          <keep-edit v-if="!preview" :deleteItem="deleteItem"></keep-edit>  
            <ul class="todo-list item">
                <li v-for="(todo, idx) in todos" :key="todo.id" class="todo-item">
                    
                    <div class="txt">    
                        <i class="far" 
                            :class="todo.isDone ? 'fa-check-circle' : 'fa-circle'"
                            @click="toggleComplete(todo.id)"></i>    
                        <span contenteditable="true" ref="elTodo" @blur="onTodoChange(todo.id, idx)">{{todo.txt}}</span>
                    </div>
                    <i class="far fa-trash-alt" v-if="!preview" @click="deleteTodo(todo.id)"></i>
                </li>
                <li class="todo-item">
                    <div class="new-todo" @click="newTodo">
                        <i class="fas fa-plus" title="New Item"></i>
                        New Item
                    </div>
                </li>                
            </ul>

        </section>
    `,

  data() {
    let todos = JSON.parse(JSON.stringify(this.data));
    return {
      todos
    };
  },
  methods: {
    toggleComplete(todoId) {
      let todo = this.todos.find(todo => todo.id === todoId);
      todo.isDone = !todo.isDone;
      this.$emit('data-changed', { id: this.id, data: this.todos });
    },
    deleteTodo(todoId) {
      let idx = this.todos.findIndex(todo => todo.id === todoId);
      this.todos.splice(idx, 1);
      this.$emit('data-changed', { id: this.id, data: this.todos });
    },
    onTodoChange(todoId, idx) {
      let todo = this.todos.find(todo => todo.id === todoId);
      todo.txt = this.$refs.elTodo[idx].innerText;
      this.$emit('data-changed', { id: this.id, data: this.todos });
    },
    newTodo() {
      let todo = {
        id: makeId(),
        txt: 'What needs to be done',
        isDone: false
      };

      this.todos.push(todo);
      this.$emit('data-changed', { id: this.id, data: this.todos });
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    }
  },
  components: {
    KeepEdit
  }
};
