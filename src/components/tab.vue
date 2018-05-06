<template>
  <div class="zan-tab">
    <block v-if="isScroll">
      <scroll-view :class="SCROLL_CLASS" scroll-x="true" :style="SCROLL_STYLE">
        <div v-for="item in TABS" :key="item.id" :class="item.TABCLASS" @tap="changeTab(item.id)">
          <div class="zan-tab__title">{{ item.title }}</div>
        </div>
      </scroll-view>
    </block>
    <block v-else>
      <div :class="FIXED_CLASS">
      <div v-for="item in TABS" :key="item.id" :class="item.TABCLASS" @tap="changeTab(item.id)">
          <div class="zan-tab__title">{{ item.title }}</div>
        </div>
      </div>
    </block>
  </div>
</template>



<script>
  export default {
    name: "m-tab",
    data(){
        return {
            myvalue:0
        }
    },
    props: {
      isFixed: {
        type: Boolean,
        default: false
      },
      heigth: {
        type: Number
      },
      isScroll: {
        type: Boolean,
        default: false
      },
      tabs: {
        type: Array,
        default: () => {
          return [];
        }
      },
      value:{default:'1'}
    },
    computed: {
      SCROLL_CLASS() {
        return (
          "zan-tab__bd zan-tab__bd--scroll" +
          (this.fixed ? " zan-tab__bd--fixed" : "")
        );
      },
      SCROLL_STYLE() {
        return "height:" + (this.height ? height + "px" : "auto");
      },
      FIXED_CLASS() {
        return "zan-tab__bd" + (this.isFixed ? " zan-tab__bd--fixed" : "");
      },
      TABS(){
          let vm =this;
          return vm.tabs.map(i=>{
              return {
                  id:i.id,
                  title:i.title,
                  TABCLASS:'zan-tab__item'+(i.id==vm.myvalue?' zan-tab__item--selected':'')
              }
          })
      }
    },
    mounted(){
        this.myvalue=this.value;
    },
    methods:{
        changeTab(id){
            this.myvalue=id;
        }
    },
    watch:{
        'myvalue':function(){
            this.$emit('input',this.myvalue);
        },
        'value':function(){
            this.myvalue=this.value;
        }
    }
  };

</script>
