export default {
  name: 'todo-item',
  props: ['todo'],
  template: `
        <section class="todo-item">
            <i class="far fa-circle"></i>
            <span class="txt">    
                {{todo.txt}}
            </span>
        </section>
    `
};
