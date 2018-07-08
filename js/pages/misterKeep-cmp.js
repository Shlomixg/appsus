import { getKeeps, newKeep, deleteKeep } from '../services/keep-service.js';
import KeepList from '../cmps/misterKeep/keep-list-cmp.js';
import eventBus, { DELETE_KEEP } from '../services/event-bus-service.js';

export default {
  name: 'mister-keep',
  template: `
        <section class="mister-keep container" :class="{grid: isGrid}">
          <div class="controls">
            <input type="search" v-model="keepFilter" placeholder="Search...">
            <i class="fas fa-grip-horizontal" :class="{active: isGrid}" @click="isGrid = true"></i>
            <i class="fas fa-align-justify" :class="{active: !isGrid}" @click="isGrid = false"></i>
            <button class="btn" @click="addNewKeep">New Keep</button>
          </div>
          <div class="wrapper" v-if="keeps">
            <keep-list :keeps="keepsToShow" :isGrid="isGrid"></keep-list>    
          </div>
          <router-view :key="$route.fullPath"></router-view>
        </section>
    `,
  data() {
    return {
      keeps: null,
      isGrid: true,
      keepFilter: ''
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
  computed: {
    keepsToShow() {
      this.keeps.sort(keep1 => {
        return !keep1.isPinned;
      });

      if (this.keepFilter.length < 3) return this.keeps;
      return this.keeps.filter(keep => {
        let keepStr = JSON.stringify(keep).toLowerCase();
        return keepStr.includes(this.keepFilter);
      });
    }
  },
  components: {
    KeepList
  }
};
