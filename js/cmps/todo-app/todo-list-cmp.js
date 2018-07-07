import TodoItem from './toto-item-cmp.js';
export default {
  name: 'todo-list',
  props: ['todos'],
  template: `
        <section class="todo-list">
            <ul>
                <li v-for="todo in todos" :key="todo.id">
                    <todo-item :todo="todo"></todo-item>
                </li>
            </ul>

        </section>
    `,

  components: {
    TodoItem
  }
};
