import { getKeeps, newKeep, deleteKeep } from '../services/keep-service.js';
import KeepList from '../cmps/misterKeep/keep-list-cmp.js';
import eventBus, { DELETE_KEEP } from '../services/event-bus-service.js';

export default {
  name: 'mister-keep',
  template: `
        <section class="mister-keep container" :class="{grid: isGrid}">
          <div class="controls">
            <i class="fas fa-grip-horizontal" :class="{active: isGrid}" @click="isGrid = true"></i>
            <i class="fas fa-align-justify" :class="{active: !isGrid}" @click="isGrid = false"></i>
            <button class="btn" @click="addNewKeep">New Keep</button>
          </div>
          <div class="wrapper" v-if="keeps">
            <keep-list :keeps="keeps"></keep-list>    
          </div>
          <router-view :key="$route.fullPath"></router-view>
        </section>
    `,
  data() {
    return {
      keeps: null,
      isGrid: true
    };
  },
  created() {
    getKeeps().then(keeps => {
      this.keeps = keeps;
    });
    eventBus.$on(DELETE_KEEP, this.deleteKeep);
  },
  methods: {
    addNewKeep() {
      newKeep().then(keepId => {
        this.$router.push({ path: `/keep/${keepId}/details` });
      });
    },
    deleteKeep(keepId) {
      deleteKeep(keepId);
    }
  },
  components: {
    KeepList
  }
};
