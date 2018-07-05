export default {
  name: 'keep-img',
  props: ['data'],
  template: `
          <section class="keep-img">
             <img :src="data"> 
          </section>
      `
};
