import TodoList from './todo-list-cmp.js';

export default {
  name: 'todo-app',
  props: ['data', 'id'],

  template: `
        <section class="todo-app">
            <todo-list :todos="data"></todo-list>
        </section>
    `,

  components: {
    TodoList
  }
};
