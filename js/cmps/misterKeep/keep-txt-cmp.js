export default {
  name: 'keep-txt',
  props: ['data'],
  template: `
        <section class="keep-txt">
           <div contenteditable="true">
               {{data}}
           </div> 
        </section>
    `
};
