import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class FormMixins extends Vue {

  isFormMixins: string = '';
  /**
   * 表单ID
   * @type {number}
   */
  formId: number = 0;

  onShow() {
    this.formId = 0;
    if (this.getQuert('id')) {
      this.formId = Number(this.getQuert('id'));
    }
    console.log('==FormMixinsonShow:' + this.$options.name)
  }


  getQuert(key) {
    return this.$root.$mp && this.$root.$mp.query && this.$root.$mp.query[key];
  }

}
