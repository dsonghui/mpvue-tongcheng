import {Vue, Component} from "vue-property-decorator";

const debug = require('debug')('LifeCycle:');
@Component({})
export default class PageMixins extends Vue {
  isPageMixins: string = '';


  // get PageName() {
  //   return  (this.$options && this.$options.name ? this.$options.name : '()') + ':'
  // }
  //
  // onLoad() {
  //   debug(this.PageName + 'onLoad')
  // }
  //
  // onLaunch() {
  //   debug(this.PageName + 'onLaunch')
  // }
  //
  // onShow() {
  //   debug(this.PageName + 'onShow')
  // }
  //
  // onReady() {
  //   debug(this.PageName + 'onReady')
  // }
  //
  // onHide() {
  //   debug(this.PageName + 'onHide')
  // }
  //
  // onUnload() {
  //   debug(this.PageName + 'onHide')
  // }
  //
  //
  // beforeCreate() {
  //   debug(this.PageName + 'beforeCreate')
  // }
  //
  // created() {
  //   debug(this.PageName + 'created')
  // }
  //
  // beforeMount() {
  //   debug(this.PageName + 'beforeMount')
  // }
  //
  // beforeUpdate() {
  //   debug(this.PageName + 'beforeUpdate')
  // }
  //
  // updated() {
  //   debug(this.PageName + 'updated')
  // }
  //
  // activated() {
  //   debug(this.PageName + 'activated')
  // }
  //
  // deactivated() {
  //   debug(this.PageName + 'deactivated')
  // }
  //
  // beforeDestroy() {
  //   debug(this.PageName + 'beforeDestroy')
  // }
  //
  // destroyed() {
  //   debug(this.PageName + 'destroyed')
  // }
  //
  // mounted() {
  //   debug(this.PageName + 'mounted')
  // }
}
