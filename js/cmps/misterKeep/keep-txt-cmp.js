export default {
  name: 'keep-txt',
  props: ['data', 'id'],
  template: `
        <section class="keep-txt">
           <div contenteditable="true">
               {{data}}
           </div> 
        </section>
    `
};
