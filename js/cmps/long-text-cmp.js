'use strict';

export default {
    props: ['txt', 'length'],
    template: `
        <span class="long-text">
            <p>
                {{description}}
                <span v-if="txt.length > size" @click="displayFullTxt = !displayFullTxt" class="read-more">
                    {{(displayFullTxt)? 'Read Less' : 'Read More'}}
                </span>
            </p>
        </span>`,
    computed: {
        description() {
            if (this.displayFullTxt) return this.txt;
            return this.txt.slice(0, (this.size -3)).trim() + '...';
        }
    },
    data() {
        return {
            displayFullTxt: false,
            size: this.length || 100
        }
    }
};