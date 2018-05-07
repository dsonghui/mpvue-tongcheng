import { Vue, Component } from "vue-property-decorator";
import { Env } from "services/support/Env";

@Component({})
export default class PageMixins extends Vue {
  isPageMixins: string = '';
  onShow() {
    console.log('==PageMixinsonShow:' + this.$options.name)
  }

  mounted() {
    console.log(Env.getInstance());
  }
}
