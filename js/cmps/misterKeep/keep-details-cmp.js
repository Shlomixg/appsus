import {
  getKeepById,
  saveKeep,
  craeteEmptyItem,
  deleteItem,
  deleteEmptyItems
} from '../../services/keep-service.js';
import eventBus, { DELETE_KEEP } from '../../services/event-bus-service.js';
import KeepImg from './keep-img-cmp.js';
import KeepTxt from './keep-txt-cmp.js';
import KeepAudio from './keep-audio-cmp.js';
import keepTodo from './keep-todo-cmp.js';
import VueModal from '../vue-modal/vue-modal-cmp.js';

export default {
  name: 'keep-details',
  template: `
              <vue-modal class="keep-details" v-if="keep" >
                    <div class="header" slot="header">
                        <h3 contenteditable="true" ref="elTitle" v-html="keep.title" @blur="onTitleChange()"></h3>
                        <a class="btn btn-close" @click="$router.push({ path: '/keep' })" >Close</a>
                    </div>
                  
                    <article class="cmps-wrapper" slot="body" ref="elDetailsBody" :class="keep.backgroundColor">

                        <component class="keep-cmp" v-for="cmp in keep.cmps" :key="cmp.id" :is="cmp.type" :data="cmp.data" :id="cmp.id" @data-changed="onDataChange"
                            @delete-item="onDeleteItem"></component>

                    </article>


                    <div class="keep-controls flex align-items-center space-around" slot="footer">
                        <i class="far fa-image" title="New Image Item" @click="newItem('keep-img')"></i>
                        <i class="far fa-map" title="New Map item"></i>
                        <i class="fas fa-microphone" title="New Audio item" @click="newItem('keep-audio')"></i>
                        <i class="far fa-list-alt" title="New Todo list" @click="newItem('keep-todo')"></i>
                        <i class="far fa-file-alt" title="New Text item" @click="newItem('keep-txt')"></i>
                        <i class="far fa-trash-alt" title="Delete Keep" @click="deleteKeep"></i>
                        <i class="fas fa-thumbtack" title="Pin Keep" @click="togglePin" :class="{pinned: keep.isPinned}"></i>
                        <i class="fas fa-palette" @click="changeBg = !changeBg" title="Change Background">

                            <div class="color-controls" :class="{hidden: !changeBg}">
                                <div class="color bg-white" @click.stop="changeBackground('bg-white')"></div>
                                <div class="color bg-green" @click.stop="changeBackground('bg-green')"></div>
                                <div class="color bg-light-green" @click.stop="changeBackground('bg-light-green')"></div>
                                <div class="color bg-light-red" @click.stop="changeBackground('bg-light-red')"></div>
                                <div class="color bg-red" @click.stop="changeBackground('bg-red')"></div>
                            </div>

                        </i>
                    </div>
          </vue-modal>
    `,
  data() {
    return {
      keep: null,
      changeBg: false
    };
  },
  methods: {
    onDataChange(newData) {
      // find cmp by id
      let cmp = this.keep.cmps.find(({ id }) => id === newData.id);
      // update data
      cmp.data = newData.data;
      // save
      saveKeep(this.keep, this.keep.id);
    },
    onTitleChange() {
      this.keep.title = this.$refs.elTitle.innerText;
      saveKeep(this.keep, this.keep.id);
    },
    newItem(itemType) {
      let item = craeteEmptyItem(itemType);
      this.keep.cmps.push(item);
      saveKeep(this.keep, this.keep.id);

      let h = this.$refs.elDetailsBody.scrollHeight;
      this.$refs.elDetailsBody.scrollTo({
        top: h,
        behavior: 'smooth'
      });
    },
    togglePin() {
      this.keep.isPinned = !this.keep.isPinned;
      saveKeep(this.keep, this.keep.id);
    },
    changeBackground(bg) {
      this.keep.backgroundColor = bg;
      this.changeBg = false;
      saveKeep(this.keep, this.keep.id);
    },
    deleteKeep() {
      eventBus.$emit(DELETE_KEEP, this.keep.id);
      this.$router.push({ path: '/keep' });
    },
    onDeleteItem(cmpId) {
      deleteItem(this.keep.id, cmpId);
    }
  },
  created() {
    getKeepById(this.$route.params.keepId).then(keep => {
      this.keep = keep;
    });
  },
  beforeDestroy() {
    deleteEmptyItems(this.keep.id);
  },
  components: {
    KeepImg,
    KeepTxt,
    KeepAudio,
    keepTodo,
    VueModal
  }
};
